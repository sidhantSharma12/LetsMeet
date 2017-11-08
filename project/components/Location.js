import React from 'react';
import { StyleSheet, Text, View, TextInput, Button} from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation';

export default class Location extends React.Component {
  static navigationOptions = {
    title: 'Enter a Location'
  };

  constructor(props) {
    super(props);
    this.state = {location: '', name:'', description:''};
  }

  submit(){
    const { navigate } = this.props.navigation;

  	fetch('http://127.0.0.1:5000/getcord', {
		method: 'POST',
		headers: {
		    'Accept': 'application/json',
		    'Content-Type': 'application/json',
		},
	    body: JSON.stringify({
		address: this.state.location
		})
	})
	.then((response) => response.json())
    .then((responseJson) => {
        fetch('http://127.0.0.1:5000/storeloc', {
    			method: 'POST',
    			headers: {
    			    'Accept': 'application/json',
    			    'Content-Type': 'application/json',
    			},
    		    body: JSON.stringify({
    				lat: responseJson.lat,
    				long: responseJson.lng,
    				name: this.state.name,
            description : this.state.description
    			}) 
        })  
        .then((responseJson) => {
          navigate('Map', { user: 'Lucyyy' });
        })  
     })
  }

  render() {
    return (
      <View>
      	<TextInput
          style={{height: 40}}
          placeholder="Address"
          onChangeText={(text) => this.setState({location : text})}
        />
        <TextInput
          style={{height: 40}}
          placeholder="Name of the place"
          onChangeText={(text) => this.setState({name : text})}
        />
        <TextInput
          style={{height: 40}}
          placeholder="Description of the place"
          onChangeText={(text) => this.setState({description : text})}
        />
        <Button title="Submit" onPress={this.submit.bind(this)}/> 
      </View>
    );
  }
}

module.exports=Location;