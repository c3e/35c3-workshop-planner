import React from 'react';
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

interface IDiscoverWorkshopsScreenProps {
  workshops: WorkshopSession[];
  dispatcher: Dispatch;
  rooms: string[];
}

interface IDiscoverWorkshopsScreenState {
}

class DiscoverWorkshopsScreen
    extends React.Component<IDiscoverWorkshopsScreenProps, IDiscoverWorkshopsScreenState> {

  constructor(props) {
    super(props);
  }

  // noinspection JSUnusedGlobalSymbols
  static navigationOptions = {
    headerTitle: <DiscoveryNavigation />
  };

  render(): any {
    const locations = this.getLocations(this.props.rooms);
    const date = '2017-12-27';

    return (
        <View style={styles.container}>
          <SessionTable date={date} locations={locations} workshops={this.props.workshops}/>
          {/* Go ahead and delete ExpoLinksView and replace it with your
           * content, we just wanted to provide you with some helpful links */}
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
    allRooms.forEach((l) => {
      result.set(l.name, l);
    });
    console.log(result);
    return result;
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
