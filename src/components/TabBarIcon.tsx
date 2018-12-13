import React from 'react';
import Colors from '../constants/Colors';
import { Ionicons, MaterialCommunityIcons, Entypo } from '@expo/vector-icons';

interface ITabBarIconProps {
  name: string;
  type?: string;
  focused: boolean;
}

export default class TabBarIcon extends React.Component<ITabBarIconProps, {}> {
  render(): any {
    let iconType = this.props.type === '' || this.props.type === undefined ?
        'material-community' :
        this.props.type;

    if (iconType === 'Ionicons') {
      return (
          <Ionicons
              name={this.props.name}
              size={26}
              color={this.props.focused ? Colors.tabIconSelected : Colors.tabIconDefault}
              style={{ marginBottom: -3 }}
          />
      );
    }

    if (iconType === 'Entypo') {
      return (<Entypo
          name={this.props.name}
          size={26}
          color={this.props.focused ? Colors.tabIconSelected : Colors.tabIconDefault}
          style={{ marginBottom: -3 }}
      />);
    }

    if (iconType === 'MaterialCommunity') {
      return (
          <MaterialCommunityIcons
              name={this.props.name}
              size={26}
              color={this.props.focused ? Colors.tabIconSelected : Colors.tabIconDefault}
              style={{ marginBottom: -3 }}
          />
      );
    }

    return (
        <MaterialCommunityIcons
            name={this.props.name}
            size={26}
            color={this.props.focused ? Colors.tabIconSelected : Colors.tabIconDefault}
            style={{ marginBottom: -3 }}
        />
    );
  }
}
