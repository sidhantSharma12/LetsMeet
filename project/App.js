import React from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation';
import MapView from 'react-native-maps';
import AllContactsScreen from './components/AllContactsScreen.js';
import HomeScreen from './components/Homescreen.js';
import RecentChatsScreen from './components/RecentChatsScreen.js';
import ChatScreen from './components/Chatscreen.js';


const SimpleApp = StackNavigator({
  Home: { screen: HomeScreen },
  Chat: { screen: ChatScreen }
});

export default class App extends React.Component {

  render() {
    return (
      /**/
      <SimpleApp />
    );
  }
}
