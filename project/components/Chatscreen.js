import React from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation';
import RecentChatsScreen from './RecentChatsScreen.js';
import AllContactsScreen from './AllContactsScreen.js'

const MainScreenNavigator = TabNavigator({
  Recent: { screen: RecentChatsScreen },
  All: { screen: AllContactsScreen },
});

class ChatScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
   // title: `Chat with ${navigation.state.params.user}`,
  });
  render() {
    return (
      <MainScreenNavigator/>
    );
  }
}

module.exports = ChatScreen;