import React, { Component } from 'react';
import { View, Text } from 'react-native';

// below will allow us to connect to reduc
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchUser } from '../redux/actions/index';

export class Main extends Component {
  componentDidMount() {
    // below will set off the chain reactions of the redux cycle
    // ultimately updating the state
    this.props.fetchUser();
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <Text>User is logged in</Text>
      </View>
    );
  }
}

// we must call some functions to bind our component to redux and the fetchUser function
// pass through an object containing all of the functions we want to access, and the dispatch variable
const mapDispatchProps = (dispatch) =>
  bindActionCreators({ fetchUser }, dispatch);

export default connect(null, mapDispatchProps)(Main);
