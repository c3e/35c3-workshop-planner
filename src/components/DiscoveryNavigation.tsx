import * as React from 'react'; // tslint:disable-line no-duplicate-imports
import { StyleSheet, View } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { ApplicationState } from '../store';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import t from '../i18n/Translator';
import { DAY_FILTER_OPTIONS, VALID_DATES } from '../store/global/types';
import { selectedDateChanged, selectedTimeFilterChanged } from '../store/global/actions';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Colors from '../constants/Colors';

interface IDiscoveryNavigationProps {
  selectedDate: string;
  dispatch: Dispatch;
  selectedTimeFilter: string;
  navigation: any;
}

interface IDiscoveryNavigationState {
  counter: number;
  selectedDate: string;
  selectedTimeFilter: string;
}

class DiscoveryNavigation extends React.Component<IDiscoveryNavigationProps, IDiscoveryNavigationState> {

  constructor(props: any) {
    super(props);
    this.state = {
      counter: 0,
      selectedDate: this.props.selectedDate,
      selectedTimeFilter: this.props.selectedTimeFilter
    };
  }

  render(): any {
    return (
        <View style={styles.headerContainer}>
          <View style={styles.dayPickerContainer}>
            <RNPickerSelect
                placeholder={{
                  label: t('Select a day'),
                  value: t('Day 1'),
                  color: '#9EA0A4'
                }}
                items={VALID_DATES}
                onValueChange={(value) => {
                  this.setState({
                    selectedDate: value
                  });
                  this.props.dispatch(selectedDateChanged(value));
                }}
                onUpArrow={() => {
                  // this.inputRefs.name.focus();
                }}
                onDownArrow={() => {
                  // this.inputRefs.picker2.togglePicker();
                }}
                style={{ styles }}
                value={this.state.selectedDate}
                ref={(el) => {
                  // this.inputRefs.picker = el;
                }}
                useNativeAndroidPickerStyle={true}
            />
          </View>
          <View style={styles.timeFilterContainer}>
            <RNPickerSelect
                placeholder={{
                  label: t('Select time filter'),
                  value: t('Hole Day'),
                  color: '#9EA0A4'
                }}
                items={DAY_FILTER_OPTIONS}
                onValueChange={(value) => {
                  this.setState({
                    selectedTimeFilter: value
                  });
                  this.props.dispatch(selectedTimeFilterChanged(value));
                }}
                onUpArrow={() => {
                  // this.inputRefs.name.focus();
                }}
                onDownArrow={() => {
                  // this.inputRefs.picker2.togglePicker();
                }}
                style={{ styles }}
                value={this.state.selectedTimeFilter}
                ref={(el) => {
                  // this.inputRefs.picker = el;
                }}
                useNativeAndroidPickerStyle={true}
            />
          </View>
          <View style={styles.searchIconContainer}>
            <MaterialCommunityIcons
                name={'database-search'} size={30} color={Colors.black}
                onPress={() => this.props.navigation.navigate('SearchScreen')}
            />
          </View>
        </View>
    );
  }
}

const mapStateToProps = ({ global }: ApplicationState) => ({
  selectedDate: global.selectedDate,
  selectedTimeFilter: global.selectedTimeFilter
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  dispatch
});

export default connect(mapStateToProps, mapDispatchToProps)(DiscoveryNavigation);

const styles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    fontWeight: 'bold',
    paddingTop: 3,
    paddingHorizontal: 10,
    paddingBottom: 0,
    borderWidth: 0,
    backgroundColor: 'white',
    color: 'black',
    height: 30,
    maxHeight: 30,
    width: '100%'
  },
  inputAndroid: {
    fontSize: 16,
    fontWeight: 'bold',
    paddingTop: 3,
    paddingHorizontal: 10,
    paddingBottom: 0,
    borderWidth: 0,
    backgroundColor: 'white',
    color: 'black',
    height: 30,
    maxHeight: 30,
    width: '100%'
  },
  headerContainer: {
    width: '100%',
    height: 44,
    borderWidth: 0,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  dayPickerContainer: {
    width: '33%',
    height: 44,
    borderWidth: 0
  },
  timeFilterContainer: {
    width: '40%',
    height: 44,
    borderWidth: 0
  },
  searchIconContainer: {
    width: 32,
    height: 32,
    alignSelf: 'center',
    marginRight: 5
  }
});
