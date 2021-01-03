import React, { useState } from 'react';
import { View, TextInput, Image, Button } from 'react-native';

import firebase from 'firebase';
require('firebase/firestore');
require('firebase/firebase-storage');

// Access the saved image from the props >>>>> console.log(props.route.params.image);

export default function Save(props, { navigation }) {
  const [caption, setCaption] = useState('');

  // must be async await, responsible for fetching the image and getting the data
  const uploadImage = async () => {
    const uri = props.route.params.image;
    // add random endpoint (childPath) using Math.random - NOTE: 36 is the 'base' of the string
    const childPath = `post/${
      firebase.auth().currentUser.uid
    }/${Math.random().toString(36)}`;

    console.log('ChildPath -> ', childPath);

    const res = await fetch(uri);
    // set a blob, responsible for uploading the image. Create a blob of the uri, which it will pass to firestore
    const blob = await res.blob();
    // by setting a task, you can track upload progress
    // decide where to upload it and file structure inside .child()

    // saving to FB storage
    const task = firebase.storage().ref().child(childPath).put(blob);

    // The below functions help us keep track of the upload progress
    const taskProgress = (snapshot) => {
      console.log(`transferred: ${snapshot.bytesTransferred}`);
    };
    // upon completion, we'll retrieve the download URL, and then save to firestore
    const taskCompleted = () => {
      task.snapshot.ref.getDownloadURL().then((snapshot) => {
        console.log(snapshot);
        savePostData(snapshot);
      });
    };
    // error handling
    const taskError = (snapshot) => {
      console.log(snapshot);
    };

    // we must put the above three functions together. taskCompleted must be at the end!
    task.on('state_changed', taskProgress, taskError, taskCompleted);
  };

  // handle uploading the image
  // NOTE: using server-side firebase function to create a timestamp
  const savePostData = (downloadURL) => {
    firebase
      .firestore()
      .collection('posts')
      .doc(firebase.auth().currentUser.uid)
      .collection('userPosts')
      .add({
        downloadURL,
        caption,
        creation: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then(function () {
        // the below means that it will go to the beginning route of our navigator in App
        props.navigation.popToTop();
      });
  };

  return (
    <View style={{ flex: 1 }}>
      <Image source={{ url: props.route.params.image }} />
      <TextInput
        placeholder="Write a caption..."
        onChangeText={(caption) => setCaption(caption)}
      />

      <Button title="Save" onPress={() => uploadImage()} />
    </View>
  );
}
