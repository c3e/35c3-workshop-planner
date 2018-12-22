import * as React from 'react';
import { FlatList, ScrollView, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-elements';
import { Dispatch } from 'redux';
import { ApplicationState } from '../store';
import { connect } from 'react-redux';
import t from '../i18n/Translator';
import OfflineNotification from '../components/OfflineNotification';
import WorkshopFavorite from '../dataobjects/WorkshopFavorite';
import WorkshopFavoriteListItem from '../components/WorkshopFavoriteListItem';

interface IYourWorkshopScreenProps {
  dispatch: Dispatch;
  favorites: WorkshopFavorite[];
  navigation: any;
}

class YourWorkshopsScreen extends React.Component<IYourWorkshopScreenProps> {

  // noinspection JSUnusedGlobalSymbols
  static navigationOptions = {
    title: t('Your workshops')
  };

  private keyExtractor = (item: any, index: number): string => `${index}`;

  render(): any {
    if (this.props.favorites.length === 0) {
      return (
          <View style={styles.container}>
            <ScrollView style={styles.container} contentContainerStyle={styles.noContentContainer}>
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

    const orderedFavorites = this.props.favorites.sort((a, b) =>
      a.workshopEvent.startTimeObject.diff(b.workshopEvent.startTimeObject)
    );

    return (
        <FlatList
            keyExtractor={this.keyExtractor}
            data={orderedFavorites}
            renderItem={({ item }: {item: WorkshopFavorite}): any => {
              return (<WorkshopFavoriteListItem
                  favorite={item}
                  dispatch={this.props.dispatch}
                  navigation={this.props.navigation} />);
            }}
        />
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
  noContentContainer: {
    paddingTop: 30
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20
  },
  noBookmarksLabel: {
    textAlign: 'center'
  }
});
