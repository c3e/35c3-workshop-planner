import * as React from 'react';
import { YellowBox } from 'react-native';
import { AppLoading, Font } from 'expo';
import AppNavigator from './src/navigation/AppNavigator';
import LOGGER from './src/utils/Logger';
import { ApplicationState, defaultApplicationState, rootReducer } from './src/store';
import { createStore, Store } from 'redux';
import { Provider } from 'react-redux';

// @ts-ignore
import SpaceMonoRegular from './src/assets/fonts/SpaceMono-Regular.ttf';
import { loadWorkshopData } from './src/actions/Load';

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

  private readonly globalStore: Store<ApplicationState>;

  constructor(props: any) {
    super(props);
    this.globalStore = configureStore(defaultApplicationState);
  }

  state: Readonly<AppState> = {
    fontLoaded: false
  };

  async componentWillMount(): Promise<void> {
    try {
      loadWorkshopData(this.globalStore.dispatch);
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

  _handleLoadingError = (error: any) => {
    LOGGER.error(`Error on Loading the app. Reason: ${error}`);
  }
}
