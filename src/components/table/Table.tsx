import { Component } from 'react';
import { View, ViewPropTypes } from 'react-native';
import * as React from 'react'; // tslint:disable-line no-duplicate-imports

class Table extends Component<any> {
  static propTypes = {
    style: ViewPropTypes.style,
    borderStyle: ViewPropTypes.style
  };

  _renderChildren(props: any): any[] {
    return React.Children.map(props.children, child => {
      // @ts-ignore
      if (props.borderStyle && child.type.displayName !== 'ScrollView') {
        return React.cloneElement(child, {
          borderStyle: props.borderStyle
        });
      } else {
        return React.cloneElement(child);
      }
    });
  }

  render(): any {
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
        this.props.style,
        {
          borderLeftWidth: borderWidth,
          borderBottomWidth: borderWidth,
          borderColor: borderColor
        }
      ]}>
        {this._renderChildren(this.props)}
      </View>
    );
  }
}

interface ITableWrapper {
  style: any;
}

class TableWrapper extends Component<ITableWrapper> {
  static propTypes = {
    style: ViewPropTypes.style
  };

  _renderChildren(props: any): any[] {
    return React.Children.map(props.children, child => {
      if (props.borderStyle) {
        return React.cloneElement(child, {
          borderStyle: props.borderStyle
        });
      } else {
        return React.cloneElement(child);
      }
    });
  }

  render(): any {
    const { style } = this.props;
    return (
      <View style={style}>
        {this._renderChildren(this.props)}
      </View>
    );
  }
}

export { Table, TableWrapper };
