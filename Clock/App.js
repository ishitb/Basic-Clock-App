import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import Colors from "./constants/Colors";
import Clock from "./screens/Clock";
import * as Font from "expo-font";

export default class App extends Component {
  
  componentDidMount() {
    Font.loadAsync({
      "righteous": require("./assets/Righteous-Regular.ttf")
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Clock />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.darkBg,
    alignItems: "center",
    justifyContent: "center"
  }
});
