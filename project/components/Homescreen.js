import React from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation';

class HomeScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {showText: '', text:''};
  }


  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <Button onPress={() => navigate('Map', { user: 'Lucyyy' })} title="Find locations"/>
        <Button onPress={() => navigate('Location')} title="Enter Locations" color="#841584"/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});

module.exports=HomeScreen;

