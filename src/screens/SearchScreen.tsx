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
import Colors from '../constants/Colors';
import DiscoveryNavigation from './DiscoverWorkshopsScreen';
import SearchNavigation from '../components/SearchNavigation';

interface ISearchScreenProps {
  allWorkshops: WorkshopSession;
  dispatch: Dispatch;
}

class SearchScreen extends React.Component<ISearchScreenProps> {

  constructor(props: ISearchScreenProps) {
    super(props);
  }

  // noinspection JSUnusedGlobalSymbols
  static navigationOptions = {
    headerTitle: <SearchNavigation />,
    headerStyle: { borderWidth: 0, borderBottom: 0, margin: 0 }
  };

  render(): any {

    if (true) {
      return (
          <View style={styles.container}>
            <Text style={styles.infoText} >{t('type to start search')}</Text>
          </View>
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
  currentEvent: global.currentEvent,
  currentLanguage: global.currentLanguage
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  dispatch
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchScreen);

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
  infoText: {
    fontSize: 16,
    color: Colors.black
  }
});
