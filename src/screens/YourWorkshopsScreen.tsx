import React from 'react';
import { Image, ScrollView, StyleSheet, ToastAndroid, TouchableOpacity, View, Platform } from 'react-native';
import { Text } from 'react-native-elements';
import GetAllSessions from '../apicalls/GetAllSessions';
import { Dispatch } from 'redux';
import LOGGER from '../utils/Logger';
import { ApplicationState } from '../store';
import { connect } from 'react-redux';
import t from '../i18n/Translator';
import OfflineNotification from '../components/OfflineNotification';

interface IYourWorkshopScreenProps {
  dispatch: Dispatch;
}

class YourWorkshopsScreen extends React.Component<IYourWorkshopScreenProps> {

  // noinspection JSUnusedGlobalSymbols
  static navigationOptions = {
    title: t('Your workshops')
  };

  render(): any {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <View style={styles.welcomeContainer}>
            <Image
              source={require('../assets/images/robot-dev.png')}
              style={styles.welcomeImage}
            />
          </View>

          <View style={styles.helpContainer}>
            <TouchableOpacity onPress={() => {
              new GetAllSessions(this.props.dispatch).getSessions().then((sessions) => {
                if (Platform.OS === 'android') {
                  ToastAndroid.show(`Loaded ${sessions.length} Workshop Sessions`, ToastAndroid.LONG); 
                }
              }).catch((e) => {
                LOGGER.error(`Failed to load sessions. Error: ${e}`);
                if (Platform.OS === 'android') {
                  ToastAndroid.show('Nope nope, nope,   nope', ToastAndroid.LONG);
                }
              });
            }} style={styles.helpLink}>
              <Text style={styles.helpLinkText}>Help, it didn’t automatically reload!</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

        <View style={OfflineNotification.CONTAINER_STYLE}>
          <OfflineNotification />
        </View>
      </View>
    );
  }
}

const mapStateToProps = ({ global }: ApplicationState) => ({
  workshops: global.workshops
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  dispatch
});

export default connect(mapStateToProps, mapDispatchToProps)(YourWorkshopsScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 5
  },
  contentContainer: {
    paddingTop: 30
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10
  },
  homeScreenFilename: {
    marginVertical: 7
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center'
  },
  helpLink: {
    paddingVertical: 15
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7'
  }
});
