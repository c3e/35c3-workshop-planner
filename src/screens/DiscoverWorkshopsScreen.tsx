import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import OfflineNotification from '../components/OfflineNotification';
import { Text } from 'react-native-elements';

export default class DiscoverWorkshopsScreen extends React.Component {

  // noinspection JSUnusedGlobalSymbols
  static navigationOptions = {
    header: null
  };

  render(): any {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.container}>
          <Text style={{ width: '100%' }}>Hello world my friend</Text>
        </View>
        {/* Go ahead and delete ExpoLinksView and replace it with your
           * content, we just wanted to provide you with some helpful links */}
        <View style={OfflineNotification.CONTAINER_STYLE}>
          <OfflineNotification />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
    flexDirection: 'column'
  }
});
