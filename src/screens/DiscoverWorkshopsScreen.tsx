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
    const locations: Location[] = this.getLocations(this.props.rooms);

    return (
        <View style={styles.container}>
          <SessionTable locations={locations} workshops={this.props.workshops}/>
          {/* Go ahead and delete ExpoLinksView and replace it with your
           * content, we just wanted to provide you with some helpful links */}
          <View style={OfflineNotification.CONTAINER_STYLE}>
            <OfflineNotification/>
          </View>
        </View>
    );
  }

  private getLocations(rooms: string[]): Location[] {
    const result: Location[] = [];
    rooms.forEach(r => {
      result.push(new Location(r));
    });
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
