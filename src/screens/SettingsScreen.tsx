import * as React from 'react'; // tslint:disable-line no-duplicate-imports
import ConfigView from '../components/ConfigView';
import { ApplicationState } from '../store';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { AvailableLanguages } from '../i18n/AvailableLanguages';
import t from '../i18n/Translator';

interface ISettingsScreenProps {
  lastApiUpdate: number;
  updateApiFrequency: number;
  dispatch: Dispatch;
  currentLanguage: AvailableLanguages;
}

class SettingsScreen extends React.Component<ISettingsScreenProps> {
  // noinspection JSUnusedGlobalSymbols
  static navigationOptions = {
    title: t('Settings')
  };

  render(): any {
    /* Go ahead and delete ExpoConfigView and replace it with your
     * content, we just wanted to give you a quick view of your config */
    return <ConfigView lastApiUpdate={this.props.lastApiUpdate}
                       updateApiFrequency={this.props.updateApiFrequency}
                       dispatch={this.props.dispatch}
                       currentLanguage={this.props.currentLanguage}
    />;
  }
}

const mapStateToProps = ({ global }: ApplicationState) => ({
  lastApiUpdate: global.lastApiUpdate,
  updateApiFrequency: global.updateApiFrequency,
  currentLanguage: global.currentLanguage
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  dispatch
});

export default connect(mapStateToProps, mapDispatchToProps)(SettingsScreen);
