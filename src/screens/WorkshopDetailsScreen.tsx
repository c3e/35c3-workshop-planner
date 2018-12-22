import * as React from 'react'; // tslint:disable-line no-duplicate-imports
import { SectionList, StyleSheet, Text, View } from 'react-native';
import OfflineNotification from '../components/OfflineNotification';
import t from '../i18n/Translator';
import { connect } from 'react-redux';
import { ApplicationState } from '../store';
import { Dispatch } from 'redux';
import WorkshopSession from '../dataobjects/WorkshopSession';
import LOGGER from '../utils/Logger';
import WorkshopEvent from '../dataobjects/WorkshopEvent';
import AddToFavoriteButton from '../components/AddToFavoriteButton';
import { GetIconBySessionType } from '../helper/IconSwitch';

interface IWorkshopDetailsScreenProps {
  currentWorkshop: WorkshopSession | null;
  currentEvent: WorkshopEvent | null;
  dispatch: Dispatch;
}

class WorkshopDetailsScreen extends React.Component<IWorkshopDetailsScreenProps> {

  constructor(props: IWorkshopDetailsScreenProps) {
    super(props);
  }

  // noinspection JSUnusedGlobalSymbols
  static navigationOptions = {
    title: t('Workshop Details'),
    headerRight: (<AddToFavoriteButton />)
  };

  render(): any {

    if (this.props.currentWorkshop === null || this.props.currentEvent === null) {
      return (
          <View style={styles.container}>
            <Text style={styles.errorText} >{t('No workshop selected')}</Text>
          </View>
      );
    }

    const workshop = this.props.currentWorkshop;
    const event = this.props.currentEvent;

    const sections = [
      { data: [{ value: workshop.description }], title: t('Description') },
      { data: [{ value: workshop.organizedBy }], title: t('Orga') },
      { data: [{ value: workshop.orgaContact }], title: t('Orga Contact') },
      { data: [{ value: event.location }], title: t('Location') },
      { data: [{ value: `${event.startTime} - ${t('duration')}: ${event.duration}${t('min.')}` }], title: t('Starttime') },
      { data: [{ value: workshop.tags.join(', ') }], title: t('Tags') },
      { data: [{ value: workshop.keywords.join(', ') }], title: t('Keywords') },
      { data: [{ value: workshop.website }], title: t('Website') },
      { data: [{ value: workshop.language }], title: t('Language') },
      { data: [{ value: workshop.sessionType }], title: 'Session Type' },
      { data: [{ value: workshop.forKids }], title: 'For Kids' },
      { data: [{ value: workshop.timestamp }], title: 'Last Update' },
      { data: [{ value: workshop.description }], title: 'Description - long' }
    ];

    const eventData: any[] = [];
    workshop.workshopEvents.forEach((event) => {
      eventData.push({ value: `${event.startTime} @ ${event.location}` });
    });
    sections.push({ data: eventData, title: 'Additional Event' });

    LOGGER.debug(this.props.currentWorkshop);

    return (
        <View style={styles.container}>
          <SectionList
              style={styles.container}
              ListHeaderComponent={() => ListHeader(this.props.currentWorkshop)}
              renderItem={this._renderItem}
              renderSectionHeader={this._renderSectionHeader}
              stickySectionHeadersEnabled={true}
              keyExtractor={(item, index) => Number(index).toString()}
              sections={sections}
          />
          <View style={OfflineNotification.CONTAINER_STYLE}>
            <OfflineNotification />
          </View>
        </View>
    );
  }

  _renderSectionHeader = ({ section }: any) => {
    return <SectionHeader title={section.title} />;
  }

  _renderItem = ({ item }: any) => {
    if (item.type === 'color') {
      return (
          <SectionContent>
            {item.value && <Color value={item.value} />}
          </SectionContent>
      );
    } else {
      return (
          <SectionContent>
            <Text style={styles.sectionContentText}>
              {item.value}
            </Text>
          </SectionContent>
      );
    }
  }
}

const ListHeader = (workshop: WorkshopSession | null) => {
  if (workshop === null) return (<Text style={styles.descriptionText}>{t('Error')}</Text>);

  return (
      <View style={styles.titleContainer}>
        <View style={styles.titleIconContainer}>
          {GetIconBySessionType(workshop.sessionType)}
        </View>

        <View style={styles.titleTextContainer}>
          <Text style={styles.nameText}>
            {workshop.getPrintTitle()}
          </Text>

          <Text style={styles.slugText}>
            {`${t('by ')}${workshop.organizedBy ? workshop.organizedBy : t('unknown')}`}
          </Text>
        </View>
      </View>
  );
};

const SectionHeader = ({ title }: any) => {
  return (
      <View style={styles.sectionHeaderContainer}>
        <Text style={styles.sectionHeaderText}>
          {title}
        </Text>
      </View>
  );
};

const SectionContent = (props: any) => {
  return (
      <View style={styles.sectionContentContainer}>
        {props.children}
      </View>
  );
};

const Color = ({ value }: any) => {
  if (!value) {
    return <View />;
  } else {
    return (
        <View style={styles.colorContainer}>
          <View style={[styles.colorPreview, { backgroundColor: value }]} />
          <View style={styles.colorTextContainer}>
            <Text style={styles.sectionContentText}>
              {value}
            </Text>
          </View>
        </View>
    );
  }
};

const mapStateToProps = ({ global }: ApplicationState) => ({
  currentWorkshop: global.currentWorkshop,
  currentEvent: global.currentEvent
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  dispatch
});

export default connect(mapStateToProps, mapDispatchToProps)(WorkshopDetailsScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff'
  },
  titleContainer: {
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 10,
    paddingRight: 10,
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    width: '100%'
  },
  titleIconContainer: {
    padding: 0,
    maxWidth: '25%',
    marginRight: 10,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  titleTextContainer: {
    padding: 0,
    maxWidth: '80%',
    alignSelf: 'center'
  },
  sectionHeaderContainer: {
    backgroundColor: '#fbfbfb',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#ededed'
  },
  sectionHeaderText: {
    fontSize: 14
  },
  sectionContentContainer: {
    paddingTop: 8,
    paddingBottom: 12,
    paddingHorizontal: 15
  },
  sectionContentText: {
    color: '#808080',
    fontSize: 14
  },
  nameText: {
    fontWeight: '600',
    fontSize: 18
  },
  slugText: {
    color: '#a39f9f',
    fontSize: 14,
    backgroundColor: 'transparent'
  },
  descriptionText: {
    fontSize: 14,
    marginTop: 6,
    color: '#4d4d4d',
    width: 'auto',
    maxWidth: '100%'
  },
  colorContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  colorPreview: {
    width: 17,
    height: 17,
    borderRadius: 2,
    marginRight: 6,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#ccc'
  },
  colorTextContainer: {
    flex: 1
  },
  errorText: {

  }
});
