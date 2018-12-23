import * as React from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text } from 'react-native-elements';
import { Dispatch } from 'redux';
import { ApplicationState } from '../store';
import { connect } from 'react-redux';
import t from '../i18n/Translator';
import OfflineNotification from '../components/OfflineNotification';
import WorkshopFavorite from '../dataobjects/WorkshopFavorite';
import WorkshopFavoriteListItem from '../components/WorkshopFavoriteListItem';
// @ts-ignore
import SwipeList from 'react-native-smooth-swipe-list';
import { Entypo, MaterialCommunityIcons } from '@expo/vector-icons';
import Colors from '../constants/Colors';
import { workshopFavoriteRemoved } from '../store/global/actions';
import addFavoriteToCalender, { SimpleCalendar } from '../actions/AddFavoriteToCalender';
import LOGGER from '../utils/Logger';

interface IYourWorkshopsScreenProps {
  dispatch: Dispatch;
  favorites: WorkshopFavorite[];
  navigation: any;
}

class YourWorkshopsScreen extends React.Component<IYourWorkshopsScreenProps> {

  private swipeList: any;

  constructor(props: IYourWorkshopsScreenProps) {
    super(props);
  }

  // noinspection JSUnusedGlobalSymbols
  static navigationOptions = {
    title: t('Your workshops')
  };

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

    const data: any[] = [];
    orderedFavorites.map((fav: WorkshopFavorite) => {
      const obj = {
        id: fav.workshopEvent.guid + Math.random(),
        rowView: (<WorkshopFavoriteListItem
            favorite={fav}
            dispatch={this.props.dispatch}
            navigation={this.props.navigation} />),
        leftSubView: (
            <TouchableOpacity onPress={() => {
              addFavoriteToCalender()
                  .then((calendars) => {
                    this.props.navigation.navigate(
                        'SelectCalendarScreen',
                        { calendars: calendars, fav: fav });
                  })
                  .catch((error) => LOGGER.error(error));
            }}>
              <View style={[styles.iconContainer, styles.leftContainerIcon]}>
                <MaterialCommunityIcons name={'calendar-clock'} size={32} color={Colors.textWhite}/>
              </View>
            </TouchableOpacity>
        ),
        rightSubView: (
            <TouchableOpacity onPress={() => this.props.dispatch(workshopFavoriteRemoved(fav))}>
              <View style={[styles.iconContainer, styles.rightIconContainer]}>
                <Entypo name={'trash'} size={32} color={Colors.black}/>
              </View>
            </TouchableOpacity>
        ),
        leftSubViewOptions: {
          closeOnPress: false
        }
      };
      data.push(obj);
    });

    return (
        <View>
          <SwipeList
              ref={(component: any) => this.swipeList = component}
              rowData={data}
          />
        </View>
    );
  }
}

const mapStateToProps = ({ global }: ApplicationState) => ({
  favorites: global.favorites,
  currentLanguage: global.currentLanguage
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
  },
  rowBack: {
    alignItems: 'center',
    backgroundColor: '#DDD',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15
  },
  iconContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  leftContainerIcon: {
    justifyContent: 'flex-start',
    paddingLeft: 200,
    paddingRight: 20,
    backgroundColor: Colors.addToCalendar
  },
  rightIconContainer: {
    justifyContent: 'flex-end',
    paddingRight: 200,
    paddingLeft: 20,
    backgroundColor: Colors.removeFromFavorite
  }
});
