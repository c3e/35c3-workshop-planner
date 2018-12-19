import { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import * as React from 'react';// tslint:disable-line no-duplicate-imports

class Cell extends Component<any> {

  render(): any {
    let cellWithMultipleContent = false;
    const { data, width, height, flex, style, textStyle, ...props } = this.props;

    if (width <= 0) {
      return (<View />);
    }

    let textDom = React.isValidElement(data) ? data :
        <Text style={[textStyle, styles.text]} {...props}>{data}</Text>;
    if (Array.isArray(data)) {
      const result: any = [];
      cellWithMultipleContent = data.length > 1;
      data.forEach(d => {
        if (d.hasOwnProperty('workshopId') && d.hasOwnProperty('title') &&
            d.hasOwnProperty('event') && d.hasOwnProperty('key')) {
          result.push(
              <TouchableOpacity
                  style={[styles.cellTouchArea, { width: (width / data.length) - 5 }, { height: (height - 2) }]}
                  key={d.key}
                  onPress={() => {
                    this.props.onClickCell(d.workshopId, d.event);
                  }}>
                <View style={cellWithMultipleContent ? styles.cellMultipleTouchArea : styles.cellTouchArea}>
                  <Text style={[textStyle, styles.text]}>{d.title}</Text>
                </View>
              </TouchableOpacity>
          );
        }
      });
      textDom = result;
    }

    let borderWidth;
    let borderColor;
    if (this.props.borderStyle && this.props.borderStyle.borderWidth !== undefined) {
      borderWidth = this.props.borderStyle.borderWidth;
    } else {
      borderWidth = 1;
    }
    if (this.props.borderStyle && this.props.borderStyle.borderColor) {
      borderColor = this.props.borderStyle.borderColor;
    } else {
      borderColor = '#000';
    }

    return (
      <View style={[
        {
          borderTopWidth: borderWidth,
          borderRightWidth: borderWidth,
          borderColor: borderColor
        },
        width && { width: width },
        height && { height: height },
        flex && { flex: flex },
        !width && !flex && !height && !style && { flex: 1 },
        style,
        cellWithMultipleContent ? styles.cellMultiple : styles.cellSingle
      ]}>
        {textDom}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  cellMultiple: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'stretch'
  },
  cellSingle: {
    justifyContent: 'center'
  },
  text: {
    backgroundColor: 'transparent'
  },
  cellTouchArea: {
    borderWidth: 0,
    flex: 1,
    justifyContent: 'center',
    height: '100%'
  },
  cellMultipleTouchArea: {
    height: '100%',
    flex: 1,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#686868',
    backgroundColor: '#a8a8a8',
    borderRadius: 5,
    paddingHorizontal: 2,
    paddingVertical: 2,
    marginHorizontal: 2,
    marginVertical: 1
  }
});

export default Cell;
