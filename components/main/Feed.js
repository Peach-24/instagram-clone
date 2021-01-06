import React from "react";
import { StyleSheet, View, Text } from "react-native";

export default function Feed() {
  return (
    <View style={styles.container}>
      <Text>IMAGE FEED</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40,
  },
});
