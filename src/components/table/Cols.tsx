import { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import Cell from './Cell';
import * as React from 'react'; // tslint:disable-line no-duplicate-imports

class Col extends Component<any> {

  render(): any {
    const { data, style, width, heightArr, flex, textStyle, borderStyle, ...props } = this.props;

    return (
      data ?
      <View style={[
        width ? { width: width } : { flex: 1 },
        flex && { flex: flex },
        style
      ]}>
        {
          data.map((item: any, i: number) => {
            const height = heightArr && heightArr[i];
            return <Cell key={i} data={item} width={width} height={height} textStyle={textStyle} borderStyle={borderStyle} {...props}/>;
          })
        }
      </View>
      : null
    );
  }
}

class Cols extends Component<any> {

  render(): any {
    const { data, style, widthArr, heightArr, flexArr, textStyle, borderStyle, ...props } = this.props;
    let widthNum = 0;
    if (widthArr) {
      for (let i = 0; i < widthArr.length; i++) {
        widthNum += widthArr[i];
      }
    }

    return (
      data ?
          // @ts-ignore
      <View style={[styles.cols, widthNum && { width: widthNum }]}>
        {
          data.map((item: any, i: number) => {
            const flex = flexArr && flexArr[i];
            const width = widthArr && widthArr[i];
            return <Col key={i} data={item} width={width} heightArr={heightArr} flex={flex} style={style} textStyle={textStyle} borderStyle={borderStyle} {...props}/>;
          })
        }
      </View>
      : null
    );
  }
}

const styles = StyleSheet.create({
  cols: {
    flexDirection: 'row'
  }
});

export { Col, Cols };
