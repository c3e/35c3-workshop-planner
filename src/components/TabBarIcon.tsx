import React from 'react';
import { Ionicons } from '@expo/vector-icons';

import Colors from '../constants/Colors';

interface ITabBarIconProps {
  name: string;
  focused: boolean;
}

export default class TabBarIcon extends React.Component<ITabBarIconProps, {}> {
  render(): any {
    return (
      <Ionicons
        name={this.props.name}
        size={26}
        style={{ marginBottom: -3 }}
        color={this.props.focused ? Colors.tabIconSelected : Colors.tabIconDefault}
      />
    );
  }
}
