import React from 'react';
import { YellowBox } from 'react-native';
import { AppLoading, Font } from 'expo';
import { Ionicons } from '@expo/vector-icons';
import AppNavigator from './src/navigation/AppNavigator';

// @ts-ignore
import SpaceMonoRegular from './src/assets/fonts/SpaceMono-Regular.ttf';
import LOGGER from './src/utils/Logger';
import { ApplicationState, defaultApplicationState, rootReducer } from './store';
import { createStore, Store } from 'redux';
import { Provider } from 'react-redux';

// disable debugger warning
YellowBox.ignoreWarnings(['Remote debugger']);

function configureStore(
    initialState: ApplicationState
): Store<ApplicationState> {
  return createStore(
      rootReducer,
      initialState
  );
}

interface AppState {
  fontLoaded: boolean;
}

// noinspection JSUnusedGlobalSymbols
export default class App extends React.Component<{}, AppState> {

  public static OFFLINE_DEBUG = false;
  private readonly globalStore: Store<ApplicationState>;

  constructor(props: any) {
    super(props);
    this.globalStore = configureStore(defaultApplicationState);
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
          <Provider store={this.globalStore}>
            <AppNavigator />
          </Provider>
      );
    }
  }

  _handleLoadingError = error => {
    LOGGER.error(`Error on Loading the app. Reason: ${error}`);
  }
}
