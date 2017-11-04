import React from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation';
import HomeScreen from './components/Homescreen.js';
import ChatScreen from './components/Chatscreen.js';
import Location from './components/Location.js';

const SimpleApp = StackNavigator({
  Home: { screen: HomeScreen },
  Chat: { screen: ChatScreen },
  Location: {screen: Location}
});

export default class App extends React.Component {
  render() {
    return (
      <SimpleApp/>
    );
  }
}
