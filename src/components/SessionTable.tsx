import React, { Component } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Table, TableWrapper, Row } from 'react-native-table-component';
import WorkshopSession from '../dataobjects/WorkshopSession';
import LoadingSpinner from './LoadingSpinner';
import Location from '../dataobjects/Location';

interface ISessionTableProps {
  locations: Location[];
  workshops: WorkshopSession[];
}

interface ISessionTableState {}

export default class SessionTable extends Component<ISessionTableProps, ISessionTableState> {
  constructor(props) {
    super(props);
  }

  render(): any {
    const tableData = [];
    for (let i = 0; i < 30; i += 1) {
      const rowData = [];
      for (let j = 0; j < 9; j += 1) {
        rowData.push(`${i}${j}`);
      }
      tableData.push(rowData);
    }

    const widthArray = Array
        .apply(null, { length: this.props.locations.length + 1 })
        .map(() => { return 100; }, Number);

    if (this.props.locations.length <= 0 || this.props.workshops.length <= 0) {
      return (<View style={styles.loadingSpinnerContainer}><LoadingSpinner /></View>);
    }

    const header = [];
    this.props.locations.map((l) => header.push(l.getPrintName()));

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
