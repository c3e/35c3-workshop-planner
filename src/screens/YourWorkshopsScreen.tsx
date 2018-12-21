import * as React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-elements';
import { Dispatch } from 'redux';
import { ApplicationState } from '../store';
import { connect } from 'react-redux';
import t from '../i18n/Translator';
import OfflineNotification from '../components/OfflineNotification';
import WorkshopFavorite from '../dataobjects/WorkshopFavorite';

interface IYourWorkshopScreenProps {
  dispatch: Dispatch;
  favorites: WorkshopFavorite[];
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
            <Text style={styles.noBookmarksLabel} h4>{t('No workshops bookmarked yet')}</Text>
            <Text>You have: {this.props.favorites.length}</Text>
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
  favorites: global.favorites
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
  },
  noBookmarksLabel: {
    textAlign: 'center'
  }
});
