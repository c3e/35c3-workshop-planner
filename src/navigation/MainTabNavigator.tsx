import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import YourWorkshopsScreen from '../screens/YourWorkshopsScreen';
import DiscoverWorkshopsScreen from '../screens/DiscoverWorkshopsScreen';
import SettingsScreen from '../screens/SettingsScreen';
import t from '../i18n/Translator';

const YourWorkshopStack = createStackNavigator({
  YourWorkshopsScreen
});

// noinspection JSUnusedGlobalSymbols
YourWorkshopStack.navigationOptions = {
  tabBarLabel: t('Your list'),
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      type={'Entypo'}
      name={'bookmarks'}
    />
  )
};

const DiscoverWorkshopsStack = createStackNavigator({
  DiscoverWorkshopsScreen
});

// noinspection JSUnusedGlobalSymbols
DiscoverWorkshopsStack.navigationOptions = {
  tabBarLabel: t('Discover'),
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      type={'MaterialCommunity'}
      name={`feature-search${focused ? '-outline' : ''}` }
    />
  )
};

const SettingsStack = createStackNavigator({
  Settings: SettingsScreen
});

// noinspection JSUnusedGlobalSymbols
SettingsStack.navigationOptions = {
  tabBarLabel: t('Settings'),
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      type={'Ionicons'}
      name={'md-options'}
    />
  )
};

export default createBottomTabNavigator({
  YourWorkshopStack,
  DiscoverWorkshopsStack,
  SettingsStack
});
