import { Component } from 'react';
import { Image } from 'react-native';

export default class LoadingSpinner extends Component<{}, {}> {
  render(): any {
    return (<Image source={require('../assets/images/loading.gif')} />);
  }
}
