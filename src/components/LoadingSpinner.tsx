import React from 'react';
import { Image } from 'react-native';

export default class LoadingSpinner extends React.Component<{}, {}> {
  render(): any {
    return (<Image source={require('../assets/images/loading.gif')} />);
  }
}
