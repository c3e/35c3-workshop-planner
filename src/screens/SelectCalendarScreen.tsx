import { Component, ReactNode } from 'react';
import { FlatList, ScrollView, StyleSheet, View } from 'react-native';
import { ListItem } from 'react-native-elements';
import * as React from 'react'; // tslint:disable-line no-duplicate-imports
import { SimpleCalendar } from '../actions/AddFavoriteToCalender';
import t from '../i18n/Translator';
import WorkshopFavorite from '../dataobjects/WorkshopFavorite';
import { Calendar } from 'expo';
// @ts-ignore
import { Localization } from 'expo-localization';
import LOGGER from '../utils/Logger';

interface ISelectCalendarScreenProps {
  calendars: SimpleCalendar[];
  navigation: any;
}

export default class SelectCalendarScreen extends Component<ISelectCalendarScreenProps> {

  static navigationOptions = {
    title: t('Choose a calendar for event')
  };

  render(): ReactNode {
    const calendars: SimpleCalendar[] = this.props.navigation.state.params.calendars;
    const fav: WorkshopFavorite = this.props.navigation.state.params.fav;
    return (
        <View>
          <ScrollView style={styles.modalScrollView}>
            <FlatList
                keyExtractor={(cal) => `calendars-for-add-${cal.id}${Math.random()}`}
                data={calendars}
                renderItem={({ item }: {item: SimpleCalendar}) => (
                  <ListItem
                    title={item.title}
                    leftIcon={{ name: 'calendar', type: 'material-community' }}
                    onPress={async () => {
                      const details = {
                        title: fav.workshopSession.title,
                        startDate: fav.workshopEvent.startTimeObject.subtract(1, 'hours').toDate(),
                        endDate: fav.workshopEvent.endTimeObject.subtract(1, 'hours').toDate(),
                        allDay: false,
                        location: fav.workshopEvent.location,
                        timeZone: Localization.timezone
                      };
                      Calendar.createEventAsync(item.id, details).then(() => {
                        alert(t('Calendar entry added successfully'));
                        this.props.navigation.goBack();
                      }).catch((error) => {
                        alert(t('Error on creating your calendar entry'));
                        LOGGER.error(`Error on creating your calendar entry. Reason: ${error}`);
                      });
                    }}
                  />)
                }
            />
          </ScrollView>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 5
  },
  modal: {
    backgroundColor: 'rgba(30, 36, 38, 0.8)',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalScrollView: {
    height: '100%',
    padding: 5,
    width: '100%'
  }
});
