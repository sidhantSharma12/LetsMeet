import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class App extends React.Component {
   constructor(props) {
    super(props);
    this.state = {showText: ''};
  }
  componentWillMount() {
    return fetch('http://127.0.0.1:5000/Authenticate')
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(typeof responseJson);
        this.setState({showText : responseJson})
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>{this.state.showText}</Text>
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
  },
});
