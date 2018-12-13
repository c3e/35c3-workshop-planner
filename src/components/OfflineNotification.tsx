import { Text } from 'react-native-elements';
import { NetInfo, Platform, StyleSheet, View } from 'react-native';
import React from 'react';
import Colors from '../constants/Colors';
import t from '../i18n/Translator';
import LOGGER from '../utils/Logger';

interface IOfflineNotificationProps {
}

interface IOfflineNotificationState {
  isOnline: boolean;
}

const styles = StyleSheet.create({
  notification: {
    flex: 1,
    width: '100%',
    backgroundColor: Colors.offlineRedBackground,
    padding: 2,
    textAlign: 'center'
  },
  parentContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3
      },
      android: {
        elevation: 20
      }
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 0
  }
});

export default class OfflineNotification extends
    React.Component<IOfflineNotificationProps, IOfflineNotificationState> {
  static CONTAINER_STYLE = styles.parentContainer;

  constructor(props) {
    super(props);
    this.state = { isOnline: true };

    NetInfo.getConnectionInfo().then((connectionInfo) => {
      LOGGER.info(`Initial Network state: , type: ${connectionInfo.type}, effectiveType: ${connectionInfo.effectiveType}`);
    });

    NetInfo.isConnected.addEventListener(
        'connectionChange',
        (connected) => { this.handleConnectivityChange(connected); }
    );
  }

  private handleConnectivityChange(isConnected: boolean): void {
    LOGGER.info(`Network change, status of connection: ${isConnected ? 'online' : 'offline'}`);
    this.setState({ isOnline: isConnected });
  }

  render(): any {
    return (
        <Text style={{ ...styles.notification, display: this.state.isOnline ? 'none' : 'flex' }}>{t('App is offline')}</Text>
    );
  }
}
