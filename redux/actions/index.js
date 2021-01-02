import { USER_STATE_CHANGE } from '../constants/index';
// make a call to fetch the user, save the user, fetch posts
import firebase from 'firebase';

export function fetchUser() {
  return (dispatch) => {
    firebase
      // make a call to firestore
      .firestore()
      .collection('users')
      // use the currentUser ID
      .doc(firebase.auth().currentUser.uid)
      .get()
      // we get a snapshot back
      .then((snapshot) => {
        if (snapshot.exists) {
          // dispatch means 'send to the reducer, a call'
          console.log(snapshot.data());
          dispatch({ type: USER_STATE_CHANGE, currentUser: snapshot.data });
        } else {
          console.log('NO USER - does not exist.');
        }
      });
  };
}

// the reducer will handle
