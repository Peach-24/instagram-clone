import React, { Component } from 'react';
import { View, Button, TextInput } from 'react-native';

export class Register extends Component {
  // need a constructor because this component needs to be initialised
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      name: '',
    };

    // binding 'this' to onSignUp f
    this.onSignUp = this.onSignUp.bind(this);
  }

  onSignUp() {
    // must bind the onSignUp function to the 'this' variable
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

        <Button onPress={() => this.onSignUp()} title="Sign Up" />
      </View>
    );
  }
}

export default Register;
