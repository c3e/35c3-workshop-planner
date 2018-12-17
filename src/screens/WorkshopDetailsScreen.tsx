import * as React from 'react'; // tslint:disable-line no-duplicate-imports
import { Constants } from 'expo';
import { Image, SectionList, StyleSheet, Text, View } from 'react-native';
import OfflineNotification from '../components/OfflineNotification';
import t from '../i18n/Translator';
import { connect } from 'react-redux';
import { ApplicationState } from '../store';
import { Dispatch } from 'redux';
import WorkshopSession from '../dataobjects/WorkshopSession';

interface IWorkshopDetailsScreenProps {
  currentWorkshop: WorkshopSession | null;
  dispatch: Dispatch;
}

class WorkshopDetailsScreen extends React.Component<IWorkshopDetailsScreenProps> {

  constructor(props: IWorkshopDetailsScreenProps) {
    super(props);
  }

  // noinspection JSUnusedGlobalSymbols
  static navigationOptions = {
    title: t('Workshop Details')
  };

  render(): any {
    const { manifest } = Constants;
    const sections = [
      { data: [{ value: manifest.sdkVersion }], title: 'sdkVersion' },
      { data: [{ value: manifest.privacy }], title: 'privacy' },
      { data: [{ value: manifest.version }], title: 'version' },
      { data: [{ value: manifest.orientation }], title: 'orientation' },
      { data: [{ value: manifest.primaryColor, type: 'color' }], title: 'primaryColor' },
      { data: [{ value: manifest.splash && manifest.splash.image }], title: 'splash.image' },
      {
        data: [{ value: manifest.splash && manifest.splash.backgroundColor, type: 'color' }],
        title: 'splash.backgroundColor'
      },
      {
        data: [{ value: manifest.splash && manifest.splash.resizeMode }],
        title: 'splash.resizeMode'
      },
      {
        data: [{ value: manifest.ios && manifest.ios.supportsTablet ? 'true' : 'false' } ],
        title: 'ios.supportsTablet'
      }
    ];

    if (this.props.currentWorkshop === null) {
      return (
          <View style={styles.container}>
            <Text style={styles.errorText} >{t('No workshop selected')}</Text>
          </View>
      );
    }

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
  const { manifest } = Constants;

  return (
      <View style={styles.titleContainer}>
        <View style={styles.titleIconContainer}>
          <AppIconPreview iconUrl={manifest.iconUrl} />
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

const AppIconPreview = ({ iconUrl }: any) => {
  return (
      <Image
          source={{ uri: iconUrl }}
          style={{ width: 64, height: 64 }}
          resizeMode='cover'
      />
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
  currentWorkshop: global.currentWorkshop
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
    paddingHorizontal: 15,
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 5,
    paddingRight: 5,
    flex: 1,
    alignItems: 'flex-start',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    width: '100%'
  },
  titleIconContainer: {
    padding: 2,
    maxWidth: '20%',
    marginRight: 15,
    paddingRight: 15,
    alignSelf: 'center'
  },
  titleTextContainer: {
    padding: 0,
    maxWidth: '80%'
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
