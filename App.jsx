import Geolocation from '@react-native-community/geolocation';
import React, { useState } from 'react';
import {
  Linking,
  PermissionsAndroid,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const App = () => {

  // https://www.youtube.com/watch?v=q2S8mmqA0u0

  const [currentLocation, setCurrentLocation] = useState(null)

  const Permission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Cool App Location Permission',
          message:
            'Cool Location App needs access to your location.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the Location');
        getCurrenLocation()
      } else {
        console.log('Location permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const getCurrenLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        setCurrentLocation({ latitude, longitude })
        console.log(latitude, longitude)
      },
      error => alert('Error', error.message),
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    )
  }

  const openMaps = () => {
    const { latitude, longitude } = currentLocation
    if (latitude, longitude) {
      const url = `https://www.google.com.mx/maps/search/?api=1&query=${latitude},${longitude}`
      Linking.openURL(url)
    }
    else {
      alert('location not available')
    }
  }
  return (
    <View>
      <Text>Get Coords</Text>
      <View style={{
        backgroundColor: ' white',
        padding: 10,
        margin: 10,
        alignItems: 'center'
      }}>
        <Text>Latitude: {currentLocation ? currentLocation.latitude : 'Loading...'}</Text>
        <Text>Longitude: {currentLocation ? currentLocation.longitude : 'Loading...'}</Text>
      </View>
      
      {currentLocation ? (
        <>
          <TouchableOpacity onPress={openMaps}>
            <View style={{
              backgroundColor: 'red',
              padding: 10,
              alignItems: 'center',
              margin: 10
            }}>
              <Text>Open Maps</Text>
            </View>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <TouchableOpacity onPress={Permission}>
            <View style={{
              backgroundColor: 'green',
              padding: 10,
              alignItems: 'center',
              margin: 10
            }}>
              <Text>Get Location</Text>
            </View>
          </TouchableOpacity>
        </>
      )
      }
    </View>
  )
}

export default App