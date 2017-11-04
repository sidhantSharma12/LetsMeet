import React from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation';

export default class Location extends React.Component {
  static navigationOptions = {
    title: 'Enter a Location'
  };
  render() {
    return (
      <View><Text> Hii </Text></View>
    );
  }
}

module.exports=Location;