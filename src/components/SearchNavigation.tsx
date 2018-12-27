import * as React from 'react'; // tslint:disable-line no-duplicate-imports
import { StyleSheet, View } from 'react-native';
import { ApplicationState } from '../store';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { SearchBar } from 'react-native-elements';

interface ISearchNavigationProps {
  searchFilter: string;
  dispatch: Dispatch;
  navigation:
}

interface ISearchNavigationState {}

class SearchNavigation extends React.Component<ISearchNavigationProps, ISearchNavigationState> {

  constructor(props: any) {
    super(props);
  }

  render(): any {
    return (
        <View style={styles.headerContainer}>
          <View style={styles.searchContainer}>
            <SearchBar
                onChangeText={(text) => { console.log(text); }}
                onClear={() => { console.log('clear'); }}
                placeholder='Type Here...' />
          </View>
        </View>
    );
  }
}

const mapStateToProps = ({ global }: ApplicationState) => ({
  searchFilter: global.selectedTimeFilter
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  dispatch
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchNavigation);

const styles = StyleSheet.create({
  headerContainer: {
    width: '100%',
    height: 44,
    borderWidth: 0,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  searchContainer: {
    width: 32,
    height: 32,
    alignSelf: 'center'
  }
});
