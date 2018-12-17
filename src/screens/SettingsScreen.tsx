import * as React from 'react'; // tslint:disable-line no-duplicate-imports
import ConfigView from '../components/ConfigView';

export default class SettingsScreen extends React.Component {

  // noinspection JSUnusedGlobalSymbols
  static navigationOptions = {
    title: 'Settings'
  };

  render(): any {
    /* Go ahead and delete ExpoConfigView and replace it with your
     * content, we just wanted to give you a quick view of your config */
    return <ConfigView />;
  }
}
