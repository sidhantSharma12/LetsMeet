import React from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation';
import HomeScreen from './components/Homescreen.js';
import Location from './components/Location.js';
import Maps from './components/Map.js';

const SimpleApp = StackNavigator({
  Home: { screen: HomeScreen },
  Location: {screen: Location},
  Map: {screen: Maps}
});

export default class App extends React.Component {
  render() {
    return (
      <SimpleApp/>
    );
  }
}
