import { Component } from 'react'; //
import { StyleSheet, View, ScrollView } from 'react-native';
import { Table, Row } from '../components/table/TableComponent';
import WorkshopSession from '../dataobjects/WorkshopSession';
import LoadingSpinner from './LoadingSpinner';
import Location from '../dataobjects/Location';
import t from '../i18n/Translator';
import { Moment } from 'moment';
import * as React from 'react'; // tslint:disable-line no-duplicate-imports
import WorkshopEvent from '../dataobjects/WorkshopEvent';

interface ISessionTableProps {
  locations: Map<string, Location>;
  workshops: WorkshopSession[];
  date: Moment;
  startTime: number; // hours after midnight
  length: number; // in hours
  events: WorkshopEvent[];
}

interface ISessionTableState {}

export default class SessionTable extends Component<ISessionTableProps, ISessionTableState> {
  constructor(props: any) {
    super(props);
  }

  render(): any {
    const locations: Location[] = Array.from<Location>(this.props.locations.values());
    const tableData = this.buildTableData(locations);

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
                            firstColumnStyle={styles.verticalHeader}
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

  private buildTableData(locations: Location[]): any[] {
    const tableData = [];
    for (let i = this.props.startTime * 4; i < 4 * (this.props.startTime + this.props.length); i += 1) {
      const rowData = [];
      for (let j = 0; j < locations.length; j += 1) {
        const min = (i % 4) * 15;
        const hour = Math.floor(i / 4);
        const newDay = Math.floor(hour / 24) >= 1;

        if (j === 0) {
          const timeSlot = `${newDay ? 'n ' : ''}${Math.floor(hour % 24)}:${min === 0 ? '00' : min}`;
          rowData.push(timeSlot);
        } else {
          const eventsInThisTimeSlotAndLocation = this.props.events.filter((event) => {
            return locations[j].containsLocation(event.location) &&
                event.startTimeObject.hour() === hour &&
                event.startTimeObject.minute() >= min &&
                event.startTimeObject.minute() < min + 15;
          });
          if (eventsInThisTimeSlotAndLocation.length === 0) {
            rowData.push('');
          } else {
            rowData.push(eventsInThisTimeSlotAndLocation[0].workshopId);
          }
        }

      }
      tableData.push(rowData);
    }
    return tableData;
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
  verticalHeader: {
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
  },
  head: { flex: 1, backgroundColor: '#c8e1ff' },
  title: { flex: 2, backgroundColor: '#f6f8fa' },
  titleText: { marginRight: 6, textAlign: 'right' }
});
