import React from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation';
import MapView from 'react-native-maps';

class RecentChatsScreen extends React.Component {
  render() {
    return <Text>List of recent chats</Text>
  }
}

class AllContactsScreen extends React.Component {
  render() {
    return (
          <View style={styles.container}> 
            <MapView
              initialRegion={{
                latitude: 37.78825,
                longitude: -122.4324,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
              style={styles.map}>
                <MapView.Marker 
                  coordinate={{
                    latitude: 37.78825,
                    longitude: -122.4324
                  }}
                >
                  <View style={styles.radius}>
                    <View style={styles.marker}/>
                  </View>
                </MapView.Marker>

            </MapView>
          </View>
          );
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
  map: {
    left:0,
    right:0,
    top:0,
    bottom:0,
    position:'absolute'
  },
  radius:{
    height:50,
    width:50,
    borderRadius:50/2,
    overflow:'hidden',
    backgroundColor: 'rgba(0,122,255, 0.1)',
    borderWidth: 1,
    borderColor:'rgba(0,122,255, 0.3)',
    alignItems:'center',
    justifyContent: 'center'
  },
  marker:{
    height:20,
    width:20,
    borderWidth:3,
    borderColor:'white',
    borderRadius:20/2,
    overflow:'hidden',
    backgroundColor:'#007AFF'
  }
});
