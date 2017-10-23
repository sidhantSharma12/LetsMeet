import React from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation';

class RecentChatsScreen extends React.Component {
  render() {
    return <Text>List of recent chats</Text>
  }
}

class AllContactsScreen extends React.Component {
  render() {
    return <Text>List of all contacts</Text>
  }
}

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Wellccome'
  };

  constructor(props) {
    super(props);
    this.state = {showText: '', text:''};
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

  login(){
    console.log('hi') 
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <TextInput
          style={{height: 40}}
          placeholder="Type here to translate!"
          onChangeText={(text) => this.setState({text})}
        />
         <Text style={{padding: 10, fontSize: 42}}>
          {this.state.text.split(' ').map((word) => word && '🍕').join(' ')}
        </Text>
        <Text>{this.state.showText}</Text>
        <Button onPress={this.login} title="Login" color="#841584"/>
        <Button onPress={this.signup} title="Signup" color="#841584"/>
        <Button onPress={() => navigate('Chat', { user: 'Lucyyy' })} title="Chat with Lucy"/>
      </View>
    );
  }
}
const MainScreenNavigator = TabNavigator({
  Recent: { screen: RecentChatsScreen },
  All: { screen: AllContactsScreen },
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
