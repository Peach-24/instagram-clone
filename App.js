import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { View, Text } from 'react-native';

import * as firebase from 'firebase';
// The below should be in an environment folder / Variable elsewhere
const firebaseConfig = {
  apiKey: 'AIzaSyAEnwVZyR2f2zFo9My23LiSB-wEG_QSyyE',
  authDomain: 'instagram-9709c.firebaseapp.com',
  projectId: 'instagram-9709c',
  storageBucket: 'instagram-9709c.appspot.com',
  messagingSenderId: '311735429758',
  appId: '1:311735429758:web:6ba1b06251abcae2e3062f',
  measurementId: 'G-3MVD1B8XX9',
};

// Below IF checks that we are not running any fb instance atm (avoids crashing)
if (firebase.apps.length === 0) {
  // initializes fb
  firebase.initializeApp(firebaseConfig);
}

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LandingScreen from './components/auth/Landing';
import RegisterScreen from './components/auth/Register';

const Stack = createStackNavigator();

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        this.setState({ loggedIn: false, loading: false });
      } else {
        this.setState({ loggedIn: true, loading: false });
      }
    });
  }

  render() {
    const { loggedIn, loading } = this.state;
    if (loading) {
      return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <Text>Loading...</Text>
        </View>
      );
    }
    if (!loggedIn) {
      return (
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Landing">
            <Stack.Screen
              name="Landing"
              component={LandingScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen name="Register" component={RegisterScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      );
    }
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <Text>User is logged in</Text>
      </View>
    );
  }
}

export default App;
