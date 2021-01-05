// make a call to fetch the user, save the user, fetch posts
import * as firebase from 'firebase';
import 'firebase/auth';
import 'firebase/firestore';

import {
  USER_STATE_CHANGE,
  USER_POSTS_STATE_CHANGE,
  USER_FOLLOWING_STATE_CHANGE,
  USERS_DATA_STATE_CHANGE
} from '../constants/index';

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
          dispatch({ type: USER_STATE_CHANGE, currentUser: snapshot.data() });
        } else {
          console.log('User does not exist.');
        }
      });
  };
}

// Below, we fetch all of the user's posts
// We can order the posts by creation_timestamp using a query WHILST making the request to firestore

export function fetchUserPosts() {
  return (dispatch) => {
    firebase
      .firestore()
      .collection('posts')
      .doc(firebase.auth().currentUser.uid)
      .collection('userPosts')
      .orderBy('creation', 'asc')
      .get()
      .then((snapshot) => {
        // map over the return value of the request, and format it.
        let posts = snapshot.docs.map((doc) => {
          const data = doc.data();
          const id = doc.id;
          return { id, ...data };
        });
        dispatch({ type: USER_POSTS_STATE_CHANGE, posts });
      });
  };
}

// fetching the user's following
// onSnapshot triggers function everything something changes in the database, automatically
export function fetchUserFollowing() {
  return (dispatch) => {
    firebase
      .firestore()
      .collection('following')
      .doc(firebase.auth().currentUser.uid)
      .collection('userFollowing')
      .onSnapshot((snapshot) => {
        let following = snapshot.docs.map((doc) => {
          const id = doc.id;
          return id;
        });
        dispatch({ type: USER_FOLLOWING_STATE_CHANGE, following });
      });
  };
}

// In the below, we use getState to get hold of the redux store
// this function checks whether a uid (passed) exists within the users array in the users reducer
// if not found, it means the user doesn't exist within the array, so we can do a query to the db to fetch it
export function fetchUsersData(uid) {
  return (dispatch, getState) => {
    const found = getState().usersState.users.some((el) => el.uid === uid);

    if (!found) {
      firebase
      .firestore()
      .collection('users')
      .doc(uid)
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          let user = snapshot.data();
          user.uid = snapshot.id;

          dispatch({ type: USERS_DATA_STATE_CHANGE, user });
        } else {
          console.log('User does not exist.');
        }
    }
  };
}
