import { StyleSheet, View } from 'react-native';
import OfflineNotification from '../components/OfflineNotification';
import SessionTable from '../components/SessionTable';
import { ApplicationState } from '../store';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import WorkshopSession from '../dataobjects/WorkshopSession';
import Colors from '../constants/Colors';
import DiscoveryNavigation from '../components/DiscoveryNavigation';
import Location from '../dataobjects/Location';
import WorkshopEvent from '../dataobjects/WorkshopEvent';
import LOGGER from '../utils/Logger';
import { parseZone } from 'moment';
import * as React from 'react'; // tslint:disable-line no-duplicate-imports

interface IDiscoverWorkshopsScreenProps {
  workshops: WorkshopSession[];
  dispatcher: Dispatch;
  rooms: string[];
}

interface IDiscoverWorkshopsScreenState {
}

class DiscoverWorkshopsScreen
    extends React.Component<IDiscoverWorkshopsScreenProps, IDiscoverWorkshopsScreenState> {

  constructor(props: IDiscoverWorkshopsScreenProps) {
    super(props);
  }

  // noinspection JSUnusedGlobalSymbols
  static navigationOptions = {
    headerTitle: <DiscoveryNavigation />
  };

  render(): any {
    const locations = this.getLocations(this.props.rooms);
    const year = 2017;
    const month = 12;
    const date = 27;
    const startHour = 8;
    const lengthInHour = 18;
    const lengthInMilli = lengthInHour * 60 * 60 * 1000; // in milliseconds
    const startObject = parseZone(`${year}/${month}/${date} ${startHour}:00`, 'YYYY/MM/DD H:mm');
    const events: WorkshopEvent[] = [];
    const workshopMap = new Map<number, WorkshopSession>();
    this.props.workshops.forEach((w) => {
      workshopMap.set(w.pageid, w);
      events.push(...w.workshopEvents);
    });
    LOGGER.info(`found ${events.length} events`);
    // filter events with invalid date
    let filteredEvents = events
        .filter((e) => {
          if (e.startTimeObject == null) {
            return false;
          }
          const duration = e.startTimeObject.diff(startObject);
          return duration >= 0 && duration <= lengthInMilli;
        });
    LOGGER.info(`found ${filteredEvents.length} filtered events`);

    return (
        <View style={styles.container}>
          <SessionTable date={startObject} startTime={startHour} length={lengthInHour}
                        locations={locations} workshops={workshopMap} events={filteredEvents}/>
          <View style={OfflineNotification.CONTAINER_STYLE}>
            <OfflineNotification/>
          </View>
        </View>
    );
  }

  private getLocations(rooms: string[]): Map<string, Location> {
    // const result = new Map<string, Location>();
    const assemblies = new Location('Assembly');
    const officialRooms: Location[] = [];
    const others = new Location('others');

    rooms.forEach(r => {
      const location: Location = new Location(r);
      if (r.indexOf('Assembly:') > -1) {
        assemblies.subLocations.push(location);
      } else if (r.indexOf('Room:') > -1) {
        officialRooms.push(location);
      } else {
        others.subLocations.push(location);
      }
    });
    const allRooms = [...officialRooms, assemblies, others];
    const result = new Map<string, Location>();
    const sortedRooms = allRooms.sort((a, b) => {
      const rankingA = DiscoverWorkshopsScreen.getRankingOfRoom(a);
      const rankingB = DiscoverWorkshopsScreen.getRankingOfRoom(b);
      if (rankingA !== 0 || rankingB !== 0) {
        // prio some locations
        return (rankingA < rankingB) ? -1 : (rankingA > rankingB) ? 1 : 0;
      }
      const roomA = a.getPrintName().toUpperCase();
      const roomB = b.getPrintName().toUpperCase();
      return (roomA < roomB) ? -1 : (roomA > roomB) ? 1 : 0;
    });
    sortedRooms.forEach((l) => {
      result.set(l.name, l);
    });
    console.log(result);

    return result;
  }

  private static getRankingOfRoom(l: Location): number {
    if (l.getPrintName().indexOf('Lecture room') > -1) {
      return -10000;
    }

    if (l.getPrintName().indexOf('Seminar room') > -1) {
      return -1000;
    }

    if (l.getPrintName().indexOf('Chaos West Stage') > -1) {
      return -100;
    }

    if (l.getPrintName().indexOf('other') > -1) {
      return 10;
    }

    return 0;
  }
}

const mapStateToProps = ({ global }: ApplicationState) => ({
  workshops: global.workshops,
  rooms: global.rooms
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  dispatch
});

export default connect(mapStateToProps, mapDispatchToProps)(DiscoverWorkshopsScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
    margin: 0,
    width: '100%',
    backgroundColor: Colors.backgroundBlack,
    flexDirection: 'column'
  }
});
