import React from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation';
import Filter from './Filter.js';
import Maps from './Map.js'

const MainScreenNavigator = TabNavigator({
  Map: { screen: Maps },
  Filter: { screen: Filter }
});

class ChatScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: `Chat with ${navigation.state.params.user}`,
  });
  render() {
    return (
      <MainScreenNavigator/>
    );
  }
}

module.exports = ChatScreen;