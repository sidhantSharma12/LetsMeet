import React, { Component } from 'react';
import { AppRegistry, FlatList, StyleSheet, Text, View } from 'react-native';

export default class FlatListBasics extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: ''
    }
  }

  componentDidMount() {
    return fetch('http://127.0.0.1:5000')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          dataSource: responseJson.movies
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }
  render() {
    return (
      <View style={styles.container}>
      <Text> myname</Text>
        <Text>{this.state.dataSource}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   paddingTop: 22
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
})

