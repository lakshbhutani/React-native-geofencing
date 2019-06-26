/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import {PermissionsAndroid} from 'react-native';
import RNSimpleNativeGeofencing from 'react-native-simple-native-geofencing';


const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {
  
requestLocationPermission = async() => {
    try {
      const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            'title': 'Location permission',
            'message': 'Needed obviously'
          }
      )
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("Granted Permission")
        this.startMonitoring()
      } else {
        console.log("Denied Permission")
      }
    } catch (err) {
      console.warn(err)
    }
}

componentWillMount() {
    //see above
    if(Platform.OS === 'android'){
        this.requestLocationPermission();       
    }
}

componentDidMount(){
    //set up Notifications
     RNSimpleNativeGeofencing.initNotification(
        {
          channel: {
            title: "Message Channel Title",
            description: "Message Channel Description"
          },
          start: {
            notify: true,
            title: "Start Tracking",
            description: "You are now tracked"
          },
          stop: {
            notify: true,
            title: "Stopped Tracking",
            description: "You are not tracked any longer"
          },
          enter: {
            notify: true,
            title: "Attention",
            //[value] will be replaced ob geofences' value attribute
            description: "You entered a [value] Zone"
          },
          exit: {
            notify: true,
            title: "Left Zone",
            description: "You left a [value] Zone"
          }
        }
     );
     console.log('Inside did mount')
    //  this.startMonitoring()
}

fail(){
    console.log("Fail to start geofencing")
}

startMonitoring(){
  console.log("Hello")
    let geofences = [
      {
        key: "geoNum1",
        latitude: 28.508030,
        longitude: 77.060143,
        radius: 10000,
        value: "yellow"
      },
      // {
      //   key: "geoNum2",
      //   latitude: 28.508676,
      //   longitude: 77.0923532,
      //   radius: 100,
      //   value: "green"
      // },
      // {
      //   key: "geoNum3",
      //   latitude: 47.423,
      //   longitude: -122.084,
      //   radius: 150,
      //   value: "red"
      // }
    ];
    RNSimpleNativeGeofencing.addGeofences(geofences, 10000, this.fail);
}

stopMonitoring(){
    RNSimpleNativeGeofencing.removeAllGeofences();
}

render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to React Native!</Text>
        <Text style={styles.instructions}>To get started, edit App.js</Text>
        <Text style={styles.instructions}>{instructions}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
