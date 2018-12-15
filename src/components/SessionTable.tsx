import React, { Component } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Table, TableWrapper, Row } from 'react-native-table-component';
import WorkshopSession from '../dataobjects/WorkshopSession';

interface ISessionTableProps {
  rooms: string[];
  workshops: WorkshopSession[];
}

interface ISessionTableState {
  widthArr: number[];
}

export default class SessionTable extends Component<ISessionTableProps, ISessionTableState> {
  constructor(props) {
    super(props);
    this.state = {
      widthArr: [40, 60, 80, 100, 120, 140, 160, 180, 200]
    };
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

    return (
        <View style={styles.container}>
          <ScrollView horizontal={true}>
            <View>
              <Table borderStyle={{ borderColor: '#C1C0B9' }}>
                <Row data={this.props.rooms} widthArr={this.state.widthArr} style={styles.header}
                     textStyle={styles.text}/>
              </Table>
              <ScrollView style={styles.dataWrapper}>
                <Table borderStyle={{ borderColor: '#C1C0B9' }}>
                  {
                    tableData.map((rowData, index) => (
                        <Row
                            key={index}
                            data={rowData}
                            widthArr={this.state.widthArr}
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
    padding: 16,
    paddingTop: 30,
    backgroundColor: '#fff'
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
