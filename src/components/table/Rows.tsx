import { Component } from 'react';
import { View, ViewPropTypes, Text, StyleSheet } from 'react-native';
import Cell from './Cell';
import * as React from 'react'; // tslint:disable-line no-duplicate-imports

class Row extends Component<any> {

  static propTypes = {
    style: ViewPropTypes.style,
    // @ts-ignore
    textStyle: Text.propTypes.style
  };

  render(): any {
    const { data, style, widthArr, height, flexArr, textStyle, borderStyle, firstColumnStyle, ...props } = this.props;
    let widthNum = 0;
    if (widthArr) {
      for (let i = 0; i < widthArr.length; i++) {
        widthNum += widthArr[i];
      }
    }

    return (
      data ?
      <View style={[
        height && { height: height },
        widthNum && { width: widthNum },
        styles.row,
        style
      ]}>
        {
          data.map((item: any, i: number) => {
            const flex = flexArr && flexArr[i];
            const width = widthArr && widthArr[i];
            const style = (i === 0) ? firstColumnStyle : {};
            return <Cell key={i} data={item} width={width} height={height} flex={flex} style={style} textStyle={textStyle} borderStyle={borderStyle} {...props}/>;
          })
        }
      </View>
      : null
    );
  }
}

class Rows extends Component<any> {

  render(): any {
    const { data, style, widthArr, heightArr, flexArr, textStyle, borderStyle, ...props } = this.props;
    let flexNum = 0;
    let widthNum = 0;
    if (flexArr) {
      for (let i = 0; i < flexArr.length; i++) {
        flexNum += flexArr[i];
      }
    }
    if (widthArr) {
      for (let i = 0; i < widthArr.length; i++) {
        widthNum += widthArr[i];
      }
    }

    return (
      data ?
          // @ts-ignore
      <View style={[
        flexNum && { flex: flexNum },
        widthNum && { width: widthNum }
      ]}>
        {
          data.map((item: any, i: number) => {
            const height = heightArr && heightArr[i];
            return <Row key={i} data={item} widthArr={widthArr} height={height} flexArr={flexArr} style={style} textStyle={textStyle} borderStyle={borderStyle} {...props}/>;
          })
        }
      </View>
      : null
    );
  }
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    overflow: 'hidden'
  }
});

export { Row, Rows };
