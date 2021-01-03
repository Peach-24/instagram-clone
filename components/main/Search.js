import React, { useState } from 'react';
import { View, Text, TextInput, FlatList } from 'react-native';

import firebase from 'firebase';
require('firebase/firestore');

// use the useState hook to store the data of the users, starts as an empty array
export default function Search() {
  const [users, setUsers] = useState([]);

  const fetchUsers = (search) => {
    // useful search firestore function
    firebase
      .firestore()
      .collection('users')
      .where('name', '>=', search)
      .get()
      .then((snapshot) => {
        let users = snapshot.docs.map((doc) => {
          const data = doc.data();
          const id = doc.id;
          return { id, ...data };
        });
        setUsers(users);
      });
  };

  return (
    <View>
      <Text></Text>
    </View>
  );
}
