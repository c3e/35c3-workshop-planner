import * as React from 'react'; // tslint:disable-line no-duplicate-imports
import { Image, SectionList, StyleSheet, Text, View } from 'react-native';
import { Constants } from 'expo';
import OfflineNotification from './OfflineNotification';
import t from '../i18n/Translator';
import { parseZone } from 'moment';
// @ts-ignore
import TimerMixin from 'react-timer-mixin';
import { ButtonGroup } from 'react-native-elements';
import { Dispatch } from 'redux';
import { AvailableLanguages } from '../i18n/AvailableLanguages';
import { languageChanged } from '../store/global/actions';

interface IConfigViewProps {
  lastApiUpdate: number;
  updateApiFrequency: number;
  dispatch: Dispatch;
  currentLanguage: AvailableLanguages;
}

interface IConfigViewState {
  lastUpdate: string;
}

export default class ConfigView extends React.Component<IConfigViewProps, IConfigViewState> {

  constructor(props: IConfigViewProps) {
    super(props);
    this.state = {
      lastUpdate: parseZone(this.props.lastApiUpdate, 'x').fromNow()
    };
  }

  private updateTime(): void {
    this.setState({
      lastUpdate: parseZone(this.props.lastApiUpdate, 'x').fromNow()
    });
    TimerMixin.setTimeout(() => this.updateTime(), 5000);
  }

  componentDidMount(): void {
    TimerMixin.setTimeout(() => {
      this.updateTime();
    }, 5000);
  }

  render(): any {
    const sections = [
      { data: [{ value: this.state.lastUpdate }], title: t('Last Update') },
      {
        data: [{ value: `${t('every')} ${this.props.updateApiFrequency / 60000} ${t('minutes')}` }],
        title: t('Workshops update Frequency')
      },
      { data: [{ value: 'Van Fanel' }], title: t('Author') },
      { data: [{ value: 'vanfanel@quantentunnel.de' }], title: t('Contact - email') },
      { data: [{ value: 'DECT: 8263' }], title: t('Contact - phone') },
      { data: [{ value: [], type: 'language' }], title: t('Change Language') }
    ];

    return (
        <View style={styles.container}>
          <SectionList
              style={styles.container}
              renderItem={this._renderItem}
              renderSectionHeader={this._renderSectionHeader}
              stickySectionHeadersEnabled={true}
              keyExtractor={(item, index) => Number(index).toString()}
              ListHeaderComponent={ListHeader}
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
    if (item.type === 'language') {

      const component1 = () => (<Text>{t('Englisch')}</Text>);
      const component2 = () => (<Text>{t('German')}</Text>);
      const buttons = [{ element: component1 }, { element: component2 }];

      let selectedIndex = 0;
      if (this.props.currentLanguage === 0) {
        selectedIndex = 0;
      }
      if (this.props.currentLanguage === 1) {
        selectedIndex = 1;
      }

      return (
          <SectionContent>
              <ButtonGroup
                  onPress={(selectedIndex) => {
                    if (selectedIndex === 0) {
                      this.props.dispatch(languageChanged(AvailableLanguages.en));
                    }
                    if (selectedIndex === 1) {
                      this.props.dispatch(languageChanged(AvailableLanguages.de));
                    }
                  }}
                  selectedIndex={selectedIndex}
                  buttons={buttons}
                  containerStyle={styles.chooseLanguageContainer} />
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

const ListHeader = () => {
  const { manifest } = Constants;

  return (
      <View style={styles.titleContainer}>
        <View style={styles.titleIconContainer}>
          <AppIconPreview iconUrl={manifest.iconUrl} />
        </View>

        <View style={styles.titleTextContainer}>
          <Text style={styles.nameText} numberOfLines={1}>
            {manifest.name}
          </Text>

          <Text style={styles.slugText}>
            {manifest.slug}
          </Text>

          <Text style={styles.descriptionText}>
            {manifest.description}
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
  chooseLanguageContainer: {
    height: 20
  }
});
