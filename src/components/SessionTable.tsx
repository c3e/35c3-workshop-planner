import { Component } from 'react'; //
import { StyleSheet, View, ScrollView } from 'react-native';
import { Table, TableWrapper, Row } from 'react-native-table-component';
import WorkshopSession from '../dataobjects/WorkshopSession';
import LoadingSpinner from './LoadingSpinner';
import Location from '../dataobjects/Location';
import t from '../i18n/Translator';
import { Moment } from 'moment';
import * as React from 'react'; // tslint:disable-line no-duplicate-imports

interface ISessionTableProps {
  locations: Map<string, Location>;
  workshops: WorkshopSession[];
  date: Moment;
  startTime?: number; // quarters after midnight
  length?: number; // in hours
}

interface ISessionTableState {
  startTime: number; // quarters after midnight
  length: number; // in hours
}

export default class SessionTable extends Component<ISessionTableProps, ISessionTableState> {
  constructor(props: any) {
    super(props);
    this.state = {
      startTime: props.startTime !== undefined ? props.startTime : 0,
      length: props.length !== undefined ? props.length : 28
    };
  }

  render(): any {
    const tableData = [];

    console.log(this.state.startTime);
    console.log(this.state.length);

    for (let i = this.state.startTime; i < 4 * (this.state.length); i += 1) {
      const rowData = [];
      for (let j = 0; j < 9; j += 1) {
        if (j === 0) {
          const min = (i % 4) * 15;
          const hour = Math.floor(i / 4);
          const newDay = Math.floor(hour / 24) >= 1;

          rowData.push(`${newDay ? 'n ' : ''}${Math.floor(hour % 24)}:${min === 0 ? '00' : min}`);
        } else {
          rowData.push(`${i}${j}`);
        }
      }
      tableData.push(rowData);
    }
    const locations: Location[] = Array.from<Location>(this.props.locations.values());
    const widthArray = Array
        .apply(null, { length: locations.length + 1 })
        .map(() => { return 100; }, Number);

    if (locations.length <= 0 || this.props.workshops.length <= 0) {
      return (<View style={styles.loadingSpinnerContainer}><LoadingSpinner /></View>);
    }

    const header = [t('Time')];
    locations.map((l) => header.push(l.getPrintName()));

    return (
        <View style={styles.container}>
          <ScrollView horizontal={true}>
            <View>
              <Table borderStyle={{ borderColor: '#C1C0B9' }}>
                <Row data={header} widthArr={widthArray} style={styles.header}
                     textStyle={styles.text}/>
              </Table>
              <ScrollView style={styles.dataWrapper}>
                <Table borderStyle={{ borderColor: '#C1C0B9' }}>
                  {
                    tableData.map((rowData, index) => (
                        <Row
                            key={index}
                            data={rowData}
                            widthArr={widthArray}
                            style={[styles.row, index % 2 && { backgroundColor: '#F7F6E7' }]}
                            textStyle={styles.text}
                        />
                    ))
                  }
                </Table>
              </ScrollView>
            </View>
          </ScrollView>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
    backgroundColor: '#fff'
  },
  loadingSpinnerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  header: {
    height: 50,
    backgroundColor: '#537791'
  },
  text: {
    textAlign: 'center',
    fontWeight: '100'
  },
  dataWrapper: {
    marginTop: -1
  },
  row: {
    height: 40,
    backgroundColor: '#E7E6E1'
  }
});
