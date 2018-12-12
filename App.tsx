import React from 'react';
import HomeScreen from './src/screens/HomeScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import LinksScreen from './src/screens/LinksScreen';
import { createStackNavigator, NavigationContainer } from 'react-navigation';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
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
        screen: HomeScreen
      },
      DiscoverWorkshops: {
        screen: LinksScreen
      },
      Settings: {
        screen: SettingsScreen
      }
    }, {
      initialRouteName: 'YourWorkshops'
      // headerMode: 'none',
    });

interface AppState {
  fontLoaded: boolean;
}

// noinspection JSUnusedGlobalSymbols
export default class App extends React.Component<{}, AppState> {

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
