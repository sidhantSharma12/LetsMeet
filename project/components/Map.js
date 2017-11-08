import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, Slider} from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation';
import MapView from 'react-native-maps';
import geolib from "geolib";

class Maps extends React.Component {

  constructor(props) {
    super(props);
    this.state = {slider:10, acceptedValues:[], data:[], location:{}};
  }

  componentWillMount(){
      fetch('http://127.0.0.1:5000/getallloc')
      .then((dataJson) => dataJson.json())
      .then((data) => {
        
        fetch('https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyDjK27JwFmy1ppJYdgzmbKwHlaUgNuSUzM',{
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
          body: JSON.stringify({})
      })
      .then((locationJson) => locationJson.json())
      .then((locationJs) => {
        var acceptedValue =[];
        data.map(function(item, i){
          var distance = geolib.getDistance(
            {latitude: locationJs.location.lat, longitude:  locationJs.location.lng},
            {latitude: item[0], longitude:item[1]}
          );
          if(distance <= (this.state.slider*1000)){
            acceptedValue.push(item);
          }
        }, this);  
      
        this.setState({acceptedValues: acceptedValue, data: data, location:locationJs.location}); //lat and lng
      });
     });    
  }

  changeSlider(value){
    var acceptedValue =[];
        this.state.data.map(function(item, i){
          var distance = geolib.getDistance(
            {latitude: this.state.location.lat, longitude:  this.state.location.lng},
            {latitude: item[0], longitude:item[1]}
          );
          if(distance <= (value*1000)){
            acceptedValue.push(item);
          }
        }, this); 
        this.setState({acceptedValues: acceptedValue, slider: value});
  }
  render() {
    return (
          <View style={styles.container}> 
          <MapView 
                    initialRegion={{
                    latitude: 43.683266,
                    longitude: -79.568492,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                    }} 
                    style={styles.map}>
           {(() => { 
               return this.state.acceptedValues.map(function(item, i){
                 return (
                      <MapView.Marker 
                        key={i}
                        coordinate={{
                        latitude: item[0],
                        longitude: item[1]
                        }}
                        title={item[2]}
                        description={item[3]}
                         >

                      </MapView.Marker>
                    );
               });
             })()}
            <Slider value={10} minimumValue={1} maximumValue={50} onValueChange={this.changeSlider.bind(this)}/>
              <Text>Value: {this.state.slider}</Text>
            </MapView>
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
  map: {
    left:0,
    right:0,
    top:0,
    bottom:0,
    position:'absolute'
  }
});

module.exports = Maps;