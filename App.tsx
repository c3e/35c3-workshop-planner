import React from 'react';
import YourWorkshopsScreen from './src/screens/YourWorkshopsScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import DiscoverWorkshopsScreen from './src/screens/DiscoverWorkshopsScreen';
import { createStackNavigator, NavigationContainer } from 'react-navigation';
import { Platform, StatusBar, StyleSheet, View, YellowBox } from 'react-native';
import { AppLoading, Font } from 'expo';
import { Ionicons } from '@expo/vector-icons';
import AppNavigator from './src/navigation/AppNavigator';

// @ts-ignore
import SpaceMonoRegular from './src/assets/fonts/SpaceMono-Regular.ttf';
import LOGGER from './src/utils/Logger';

// noinspection JSUnusedLocalSymbols
const RootStack: NavigationContainer =
    createStackNavigator({
      YourWorkshops: {
        screen: YourWorkshopsScreen
      },
      DiscoverWorkshops: {
        screen: DiscoverWorkshopsScreen
      },
      Settings: {
        screen: SettingsScreen
      }
    }, {
      initialRouteName: 'YourWorkshops'
      // headerMode: 'none',
    });

// disable debugger warning
YellowBox.ignoreWarnings(['Remote debugger']);

interface AppState {
  fontLoaded: boolean;
}

// noinspection JSUnusedGlobalSymbols
export default class App extends React.Component<{}, AppState> {

  public static OFFLINE_DEBUG = false;

  constructor(props: any) {
    super(props);
  }

  state: Readonly<AppState> = {
    fontLoaded: false
  };

  async componentWillMount(): void {
    try {
      await Font.loadAsync({
        'space-mono': SpaceMonoRegular
      });
    } catch (error) {
      LOGGER.error(`error loading icon fonts: ${error}`);
    }

    this.setState({ fontLoaded: true });
  }

  render(): any {
    if (!this.state.fontLoaded) {
      return (
        <AppLoading
          onError={this._handleLoadingError}
        />
      );
    } else {
      return (
        <View style={styles.container}>
          {Platform.OS === 'ios' && <StatusBar barStyle='default' />}
          <AppNavigator />
        </View>
      );
    }
  }

  _handleLoadingError = error => {
    LOGGER.error(`Error on Loading the app. Reason: ${error}`);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
});
