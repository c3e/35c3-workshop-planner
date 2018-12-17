import * as React from 'react';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import YourWorkshopsScreen from '../screens/YourWorkshopsScreen';
import DiscoverWorkshopsScreen from '../screens/DiscoverWorkshopsScreen';
import SettingsScreen from '../screens/SettingsScreen';
import t from '../i18n/Translator';
import WorkshopDetailsScreen from '../screens/WorkshopDetailsScreen';

const YourWorkshopStack = createStackNavigator({
  YourWorkshopsScreen,
  WorkshopDetailsScreen
});

// noinspection JSUnusedGlobalSymbols
YourWorkshopStack.navigationOptions = {
  tabBarLabel: t('Your list'),
  tabBarIcon: ({ focused }: any) => (
      // @ts-ignore
    <TabBarIcon focused={focused} type={'Entypo'} name={'bookmarks'} />
  )
};

const DiscoverWorkshopsStack = createStackNavigator({
  DiscoverWorkshopsScreen,
  WorkshopDetailsScreen
});

// noinspection JSUnusedGlobalSymbols
DiscoverWorkshopsStack.navigationOptions = {
  tabBarLabel: t('Discover'),
  tabBarIcon: ({ focused }: any) => (
      // @ts-ignore
    <TabBarIcon focused={focused} type={'MaterialCommunity'}
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
  tabBarIcon: ({ focused }: any) => (
      // @ts-ignore
    <TabBarIcon focused={focused} type={'Ionicons'} name={'md-options'} />
  )
};

export default createBottomTabNavigator({
  YourWorkshopStack,
  DiscoverWorkshopsStack,
  SettingsStack
});
