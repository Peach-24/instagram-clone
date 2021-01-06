// make a call to fetch the user, save the user, fetch posts
import * as firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";

import {
  USER_STATE_CHANGE,
  USER_POSTS_STATE_CHANGE,
  USER_FOLLOWING_STATE_CHANGE,
  USERS_DATA_STATE_CHANGE,
  USERS_POSTS_STATE_CHANGE,
} from "../constants/index";

export function fetchUser() {
  return (dispatch) => {
    firebase
      // make a call to firestore
      .firestore()
      .collection("users")
      // use the currentUser ID
      .doc(firebase.auth().currentUser.uid)
      .get()
      // we get a snapshot back
      .then((snapshot) => {
        if (snapshot.exists) {
          // dispatch means 'send to the reducer, a call'
          dispatch({ type: USER_STATE_CHANGE, currentUser: snapshot.data() });
        } else {
          console.log("User does not exist.");
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
      .collection("posts")
      .doc(firebase.auth().currentUser.uid)
      .collection("userPosts")
      .orderBy("creation", "asc")
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
      .collection("following")
      .doc(firebase.auth().currentUser.uid)
      .collection("userFollowing")
      .onSnapshot((snapshot) => {
        let following = snapshot.docs.map((doc) => {
          const id = doc.id;
          return id;
        });
        dispatch({ type: USER_FOLLOWING_STATE_CHANGE, following });
        // A loop to go through each of the users that the user is following, and calling the fetchUsersData
        for (let i = 0; i < following.length; i++) {
          // to call a method in the actions, we use a dispatch
          console.log(following[i]);
          dispatch(fetchUsersData(following[i]));
        }
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
        .collection("users")
        .doc(uid)
        .get()
        .then((snapshot) => {
          if (snapshot.exists) {
            let user = snapshot.data();
            user.uid = snapshot.id;

            // you can have multiple dispatches
            dispatch({ type: USERS_DATA_STATE_CHANGE, user });
            dispatch(fetchUsersFollowingPosts(user.uid));
          } else {
            console.log("User does not exist.");
          }
        });
    }
  };
}

// Responsible for getting all of the users that the user is following, and their posts
// The below is async, but we must make sure that we maintain the same passed uid, rather than it changing each time.
// const uid = snapshot.query.EP.path.segments[1] - this will hold the uid of the user
export function fetchUsersFollowingPosts(uid) {
  console.log(uid);
  return (dispatch, getState) => {
    firebase
      .firestore()
      .collection("posts")
      .doc(uid)
      .collection("userPosts")
      .orderBy("creation", "asc")
      .get()
      .then((snapshot) => {
        // map over the return value of the request, and format it.
        console.log(snapshot.query.Ff.path.segments[1]);
        const uid = snapshot.query.Ff.path.segments[1];

        // const user... below will get us the user in the user array, using the uid
        const user = getState().usersState.users.find((el) => el.uid === uid);

        let posts = snapshot.docs.map((doc) => {
          const data = doc.data();
          const id = doc.id;
          return { id, ...data, user };
        });
        console.log(posts);
        dispatch({ type: USERS_POSTS_STATE_CHANGE, posts, uid });
        console.log(getState());
      });
  };
}
