import { Entypo, Foundation, MaterialCommunityIcons } from '@expo/vector-icons';
import Colors from '../constants/Colors';
import * as React from 'react';
import { StyleSheet, View } from 'react-native';

const styles = StyleSheet.create({
  sessionTypeIcon: {
  },
  iconContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'}
});

export const GetIconBySessionType = (sessionType: string, size: number = 58) => {
  switch (sessionType) {
    case 'Hands-On':
      return (
          <View style={styles.iconContainer}>
            <Foundation name={'social-skillshare'} size={size + 6} color={Colors.workshopDetailsSessionType}
                        style={styles.sessionTypeIcon}/>
          </View>
      );
    case 'Talk':
      return (
          <View style={styles.iconContainer}>
            <MaterialCommunityIcons name={'presentation'} size={size} color={Colors.workshopDetailsSessionType}
                                    style={styles.sessionTypeIcon}/>
          </View>
      );
    case 'Outside':
      return (
          <View style={styles.iconContainer}>
            <Foundation name={'map'} size={size} color={Colors.workshopDetailsSessionType}
                        style={styles.sessionTypeIcon}/>
          </View>
      );
    case 'Discussion':
      return (
          <View style={styles.iconContainer}>
            <Entypo name={'chat'} size={size} color={Colors.workshopDetailsSessionType}
                    style={styles.sessionTypeIcon}/>
          </View>
      );
    case 'Game':
      return (
          <View style={styles.iconContainer}>
            <Entypo name={'game-controller'} size={size} color={Colors.workshopDetailsSessionType}
                    style={styles.sessionTypeIcon}/>
          </View>
      );
    case 'Meeting':
      return (
          <View style={styles.iconContainer}>
            <Entypo name={'users'} size={size} color={Colors.workshopDetailsSessionType}
                    style={styles.sessionTypeIcon}/>
          </View>
      );
    default:
      // 'Workshop', 'Other', ''
      return (
          <View style={styles.iconContainer}>
            <Entypo name={'tools'} size={size} color={Colors.workshopDetailsSessionType}
                    style={styles.sessionTypeIcon}/>
          </View>
      );
  }
};
