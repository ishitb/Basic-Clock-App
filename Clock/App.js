import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Colors from "./constants/Colors"
import Clock from "./screens/Clock"

export default function App() {
  return (
    <View style={styles.container}>
      <Clock />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.darkBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
