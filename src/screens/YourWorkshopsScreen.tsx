import * as React from 'react';
import { FlatList, ScrollView, StyleSheet, View } from 'react-native';
import { ListItem, Text } from 'react-native-elements';
import { Dispatch } from 'redux';
import { ApplicationState } from '../store';
import { connect } from 'react-redux';
import t from '../i18n/Translator';
import OfflineNotification from '../components/OfflineNotification';
import WorkshopFavorite from '../dataobjects/WorkshopFavorite';
import Colors from '../constants/Colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { GetIconBySessionType } from '../helper/IconSwitch';

interface IYourWorkshopScreenProps {
  dispatch: Dispatch;
  favorites: WorkshopFavorite[];
}

class YourWorkshopsScreen extends React.Component<IYourWorkshopScreenProps> {

  // noinspection JSUnusedGlobalSymbols
  static navigationOptions = {
    title: t('Your workshops')
  };

  private keyExtractor = (item: any, index: number): string => `${index}`;

  private renderItem = ({ item }: {item: WorkshopFavorite}): any => {
    const workshop = item.workshopSession;
    const event = item.workshopEvent;
    const startTime = event.startTimeObject.format('HH:mm');
    const day = this.getEventDayByDate(event.startTimeObject.format('YYYY/MM/DD'));

    return (
        <ListItem
            containerStyle={styles.listItemContainer}
            title={(<Text style={styles.title}>{workshop.getPrintTitle()}</Text>)}
            contentContainerStyle={styles.contentContainer}
            subtitle={`${startTime} ${day}`}
            leftIcon={(
                <View style={styles.leftIconContainer}>
                  {GetIconBySessionType(item.workshopSession.sessionType, 32)}
                </View>
              )}
            rightElement={(
                <View style={styles.clockContainer}>
                  <View style={styles.clockInnerContainer}>
                    <MaterialCommunityIcons name={'progress-clock'} size={24}
                                            color={Colors.black} style={styles.clock}
                    />
                    <Text style={styles.clockText}>{`${event.duration} ${t('min')}`}</Text>
                  </View>
                </View>
            )}
        />
    );
  }

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

    return (
        <FlatList
            keyExtractor={this.keyExtractor}
            data={this.props.favorites}
            renderItem={this.renderItem}
        />
    );
  }

  private getEventDayByDate(date: string): string {
    if (date === '2018/12/27') return t('Day 1');
    if (date === '2018/12/28') return t('Day 2');
    if (date === '2018/12/29') return t('Day 3');
    if (date === '2018/12/30') return t('Day 4');
    return date;
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
  contentContainer: {
    width: '100%'
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
  },
  listItemContainer: {
    margin: 0, paddingVertical: 5, flex: 1,
    flexDirection: 'row', justifyContent: 'center', alignItems: 'center'
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
  clock: {
  },
  clockText: {
    fontSize: 12,
    textAlign: 'center'
  }
});
