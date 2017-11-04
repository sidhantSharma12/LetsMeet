import React from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation';
import MapView from 'react-native-maps';

class Maps extends React.Component {

  constructor(props) {
    super(props);
    this.state = {data: {}};
  }

  componentWillMount(){
      fetch('http://127.0.0.1:5000/getallloc')
      .then((response) => response.json())
      .then((responseJson) => {
       console.log(responseJson);
        this.setState({data: responseJson})
     })
  }
  render() {
    return (
          <View style={styles.container}> 
           {(() => { 
                data = this.state.data;
               for(var i=0; i<data.length; i++){
             return (<MapView
              initialRegion={{
                latitude: data[i][0],
                longitude: data[i][1],
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
              style={styles.map}>
                <MapView.Marker 
                  coordinate={{
                    latitude: data[i][0],
                    longitude: data[i][1]
                  }}
                >
                  <View style={styles.radius}>
                    <View style={styles.marker}/>
                  </View>
                </MapView.Marker>

               </MapView>);

               }
             })()}
            
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

module.exports = Maps;