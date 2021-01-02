import { StatusBar } from 'expo-status-bar';
import React from 'react';
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

export default function App() {
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
