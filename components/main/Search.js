import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
} from 'react-native';

import firebase from 'firebase';
import { useLinkProps } from '@react-navigation/native';
require('firebase/firestore');

// use the useState hook to store the data of the users, starts as an empty array
export default function Search({ navigation }) {
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
      <TextInput
        placeholder={'Search...'}
        onChangeText={(search) => fetchUsers(search)}
      />
      <FlatList
        numColumns={1}
        horizontal={false}
        data={users}
        // renderItem renders out each and every item
        renderItem={({ item }) => (
          <TouchableOpacity
            // upon clicking the touchable opacity, we'll use react navigation to go to a page, and pass the id to it as well
            onPress={() => navigation.navigate('Profile', { uid: item.id })}
          >
            <Text>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
