import { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as React from 'react'; // tslint:disable-line no-duplicate-imports

class Cell extends Component<any> {

  render(): any {
    const { data, width, height, flex, style, textStyle, ...props } = this.props;
    const textDom = React.isValidElement(data) ? data : (
        <Text style={[textStyle, styles.text]} {...props}>{data}</Text>
      );
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
        styles.cell,
        width && { width: width },
        height && { height: height },
        flex && { flex: flex },
        !width && !flex && !height && !style && { flex: 1 },
        style
      ]}>
        {textDom}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  cell: {
    justifyContent: 'center'
  },
  text: {
    backgroundColor: 'transparent'
  }
});

export default Cell;
