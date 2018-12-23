// @ts-ignore
import moment, { Moment } from 'moment';
import { ListItem, Text } from 'react-native-elements';
import { currentWorkshopSelected } from '../store/global/actions';
import { StyleSheet, View } from 'react-native';
import { GetIconBySessionType } from '../helper/IconSwitch';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Colors from '../constants/Colors';
import { Component } from 'react';
import * as React from 'react'; // tslint:disable-line no-duplicate-imports
import t from '../i18n/Translator';
import WorkshopFavorite from '../dataobjects/WorkshopFavorite';
import { Dispatch } from 'redux';
import * as Animatable from 'react-native-animatable';

interface IWorkshopFavoriteListItemProps {
  favorite: WorkshopFavorite;
  dispatch: Dispatch;
  navigation: any;
}

export default class WorkshopFavoriteListItem extends Component<IWorkshopFavoriteListItemProps, {}> {

  public constructor(props: any) {
    super(props);
  }

  private getEventDayByDate(date: string): string {
    if (date === '2018/12/27') return t('Day 1');
    if (date === '2018/12/28') return t('Day 2');
    if (date === '2018/12/29') return t('Day 3');
    if (date === '2018/12/30') return t('Day 4');
    return date;
  }

  public render(): any {
    const workshop = this.props.favorite.workshopSession;
    const event = this.props.favorite.workshopEvent;
    const startTime = event.startTimeObject.format('HH:mm');
    const day = this.getEventDayByDate(event.startTimeObject.format('YYYY/MM/DD'));
    const now: Moment = moment();

    if (__DEV__) {
      now.add(4, 'days').subtract(0, 'hours'); // Add for debuging
    }
    now.add(1, 'hours'); // We are in germany... the saved times are utc...

    const workshopRunning = now.isBetween(event.startTimeObject, event.endTimeObject);
    const isInPast = now.isAfter(event.endTimeObject);

    const blink = {
      0: {
        opacity: 1,
        scale: 1
      },
      0.5: {
        opacity: 0,
        scale: 0.999
      },
      1: {
        opacity: 1,
        scale: 1
      }
    };

    return (
        <ListItem
            containerStyle={isInPast ? [styles.listItemContainer, styles.isInPastBackground] : styles.listItemContainer}
            onPress={() => {
              this.props.dispatch(currentWorkshopSelected(workshop, event));
              this.props.navigation.navigate('WorkshopDetailsScreen');
            }}
            title={
              workshopRunning ? (
                  <Animatable.View
                      // @ts-ignore
                      animation={blink}
                      useNativeDriver={true}
                      iterationCount={'infinite'}
                      iterationDelay={1000}
                      duration={3000}>
                    <Text style={styles.title}>{workshop.getPrintTitle()}</Text>
                  </Animatable.View>
              ) : (
                <Text style={isInPast ? [styles.title, styles.isInPastText] : styles.title}>
                  {workshop.getPrintTitle()}
                </Text>
              )
            }

            contentContainerStyle={styles.contentContainer}
            subtitle={`${startTime} ${day}`}
            leftIcon={(
                <View style={styles.leftIconContainer}>
                  {GetIconBySessionType(this.props.favorite.workshopSession.sessionType, 32)}
                </View>
            )}
            rightElement={(
                <View style={styles.clockContainer}>
                  <View style={styles.clockInnerContainer}>
                    <MaterialCommunityIcons name={'progress-clock'} size={24}
                                            color={isInPast ? Colors.eventOverTextColor : Colors.black} style={styles.clock}
                    />
                    <Text style={isInPast ? [styles.clockText, styles.isInPastText] : styles.clockText }>{`${event.duration} ${t('min')}`}</Text>
                  </View>
                </View>
            )}
        />
    );
  }
}

const styles = StyleSheet.create({

  contentContainer: {
    width: '100%'
  },
  listItemContainer: {
    margin: 0, paddingVertical: 5, flex: 1, minHeight: 74,
    flexDirection: 'row', justifyContent: 'center', alignItems: 'center',
    borderBottomWidth: 0.5, borderStyle: 'dotted', borderBottomColor: Colors.listItemBottomBorderColor
  },
  isInPastBackground: {
    backgroundColor: Colors.eventOverBackgroundColor
  },
  isInPastText: {
    color: Colors.eventOverTextColor
  },
  title: {
    fontSize: 16, fontWeight: 'bold', textAlign: 'left'
  },
  leftIconContainer: {
    minWidth: 50
  },
  clockContainer: {
    minWidth: 46,
    width: 48
  },
  clockInnerContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  clock: {},
  clockText: {
    fontSize: 12,
    textAlign: 'center'
  }
});
