import * as React from 'react'; // tslint:disable-line no-duplicate-imports
import { StyleSheet, View } from 'react-native';
import RNPickerSelect, { Item } from 'react-native-picker-select';
import { ApplicationState } from '../store';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import t from '../i18n/Translator';
import { VALID_DATES } from '../store/global/types';
import { selectedDateChanged } from '../store/global/actions';

interface IDiscoveryNavigationProps {
  selectedDate: string;
  dispatch: Dispatch;
}

interface IDiscoveryNavigationState {
  counter: number;
  selectedDate: string;
}

class DiscoveryNavigation extends React.Component<IDiscoveryNavigationProps, IDiscoveryNavigationState> {

  constructor(props: any) {
    super(props);
    this.state = {
      counter: 0,
      selectedDate: this.props.selectedDate
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
                  console.log(value);
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
            />
          </View>
        </View>
    );
  }
}

const mapStateToProps = ({ global }: ApplicationState) => ({
  selectedDate: global.selectedDate
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
    height: 42,
    borderWidth: 0
  },
  dayPickerContainer: {
    width: '33%',
    height: 42,
    borderWidth: 0
  }
});
