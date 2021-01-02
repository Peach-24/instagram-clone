import React, { Component } from 'react';
import { View, Button, TextInput } from 'react-native';
import firebase from 'firebase';

export class Login extends Component {
  // need a constructor because this component needs to be initialised
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
    };

    // binding 'this' to onSignUp f
    this.onSignUp = this.onSignUp.bind(this);
  }

  onSignUp() {
    // must bind the onSignUp function to the 'this' variable
    const { email, password } = this.state;
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <View>
        <TextInput
          placeholder="name"
          // function below is called whenever the user makes a change in the input
          onChangeText={(name) => {
            this.setState({ name });
          }}
        />
        <TextInput
          placeholder="email"
          onChangeText={(email) => {
            this.setState({ email });
          }}
        />
        <TextInput
          placeholder="password"
          secureTextEntry={true}
          onChangeText={(password) => {
            this.setState({ password });
          }}
        />

        <Button onPress={() => this.onSignUp()} title="Sign In" />
      </View>
    );
  }
}

export default Login;
