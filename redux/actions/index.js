// make a call to fetch the user, save the user, fetch posts
import * as firebase from 'firebase';
import 'firebase/auth';
import 'firebase/firestore';

import { USER_STATE_CHANGE, USER_POSTS_STATE_CHANGE } from '../constants/index';

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
          console.log('NO USER - does not exist.');
        }
      });
  };
}

// Below, we fetch all of the user's posts
export function fetchUserPosts() {
  return (dispatch) => {
    firebase
      // make a call to firestore
      .firestore()
      // work way down the db structure path
      .collection('posts')
      // use the currentUser ID
      .doc(firebase.auth().currentUser.uid)
      .collection('userPosts')
      .orderBy('creation', 'asc')
      .get()
      // we get a snapshot back
      .then((snapshot) => {
        // map over the return value of the request, and format it.
        let posts = snapshot.docs.map((doc) => {
          const data = doc.data();
          const id = doc.id;
          return { id, ...data };
        });
        console.log(posts);
        dispatch({ type: USER_POSTS_STATE_CHANGE, posts });
      });
  };
}

// We can order the posts by creation_timestamp using a query WHILST making the request to firestore
