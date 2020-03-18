import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ProgressBarAndroid
} from "react-native";
import ProgressCircle from "react-native-progress-circle";

class Clock extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    time: {
      hours: null,
      minutes: null,
      seconds: null
    }
  };

  _UNSAFEcomponentWillMount() {
    this.getCurrentTime();
  }

  getCurrentTime = () => {
    let hours = new Date().getHours().toString();
    let minutes = new Date().getMinutes().toString();
    let seconds = new Date().getSeconds().toString();

    hours = this.zeroBefore(hours);
    minutes = this.zeroBefore(minutes);
    seconds = this.zeroBefore(seconds);

    this.setState({
      time: {
        hours: hours,
        minutes: minutes,
        seconds: seconds
      }
    });
  };

  zeroBefore = instance => {
    if (parseInt(instance) < 10) return "0" + instance;
    else return instance;
  };

  componentWillUnmount() {
    clearInterval(this.currentTime);
  }

  componentDidMount() {
    this.currentTime = setInterval(() => {
      this.getCurrentTime();
    }, 1000);
  }

  render() {
    return (
      <View style={styles.container}>
      </View>
    );
  }
}

import Colors from "../constants/Colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.accentOne,
    alignItems: "center",
    justifyContent: "center",
    width: Dimensions.get("window").width
  },
  digital: {
    fontSize: 40,
    color: Colors.textColor,
    letterSpacing: 8,
    position: "absolute"
  },
  temp: {
    borderWidth: 1,
    borderRadius: 1000,
    borderColor: Colors.textColor,
    justifyContent: "center",
    alignItems: "center",
    width: 400,
    height: 400
  },
  seconds: {
    position: "absolute"
  }
});

export default Clock;
