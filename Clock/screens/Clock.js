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
      seconds: null,
      day: null
    }
  };

  weekday = num => {
    var day = "Monday";
    switch (num) {
      case 1:
        day = "Monday";
        break;
      case 2:
        day = "Tuesday";
        break;
      case 3:
        day = "Wednesday";
        break;
      case 4:
        day = "Thursday";
        break;
      case 5:
        day = "Friday";
        break;
      case 6:
        day = "Saturday";
        break;
      case 7:
        day = "Sunday";
        break;
    }
    return day
  };

  _UNSAFEcomponentWillMount() {
    this.getCurrentTime();
  }

  getCurrentTime = () => {
    let hours = new Date().getHours().toString();
    let minutes = new Date().getMinutes().toString();
    let seconds = new Date().getSeconds().toString();
    let day = this.weekday(new Date().getDay());

    hours = this.zeroBefore(hours);
    minutes = this.zeroBefore(minutes);
    seconds = this.zeroBefore(seconds);

    this.setState({
      time: {
        hours: hours,
        minutes: minutes,
        seconds: seconds,
        day: day
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
        <View style={styles.breakTop} />
        <View style={styles.temp}>
          <View style={{ position: "absolute" }}>
            <ProgressCircle
              percent={
                this.state.time.seconds != 0
                  ? (this.state.time.seconds / 60) * 100
                  : 0.1
              }
              radius={155}
              borderWidth={20}
              color={Colors.accentOne}
              shadowColor={Colors.textColor}
              bgColor={Colors.darkBg}
            />
          </View>
          {/* <View style={{ position: "absolute" }}>
            <ProgressCircle
              percent={
                this.state.time.minutes != 0
                  ? (this.state.time.minutes / 60) * 100
                  : 0.1
              }
              radius={155}
              borderWidth={10}
              color={Colors.accentTwo}
              shadowColor={Colors.textColor}
              bgColor={Colors.darkBg}
            />
          </View>
          <View style={{ position: "absolute" }}>
            <ProgressCircle
              percent={
                this.state.time.hours != 0
                  ? (this.state.time.hours / 24) * 100
                  : 0.1
              }
              radius={135}
              borderWidth={10}
              color={Colors.accentThree}
              shadowColor={Colors.textColor}
              bgColor={Colors.darkBg}
            />
          </View> */}
          <Text style={styles.digital}>
            {this.state.time.hours}:{this.state.time.minutes}:
            {this.state.time.seconds}
          </Text>
          <View style={styles.break} />
          <Text style={styles.digital}>{this.state.time.day}</Text>
        </View>
        <View style={styles.breakBottom}>
          <Text
            style={{ ...styles.digital, textAlign: "center", fontSize: 20 }}
          >
            Basic Clock App
          </Text>
        </View>
      </View>
    );
  }
}

import Colors from "../constants/Colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.darkBg,
    alignItems: "center",
    justifyContent: "center",
    width: Dimensions.get("window").width
  },
  digital: {
    fontSize: 35,
    color: Colors.textColor,
    letterSpacing: 6,
    textTransform: "uppercase"
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
  breakBottom: {
    position: "absolute",
    width: Dimensions.get("window").width,
    backgroundColor: Colors.lightBg,
    height: 100,
    bottom: 0,
    borderTopWidth: 1,
    justifyContent: "center"
  },
  breakTop: {
    position: "absolute",
    width: Dimensions.get("window").width,
    backgroundColor: Colors.lightBg,
    height: 100,
    top: 0,
    borderBottomWidth: 1
  },
  break: {
    width: 200,
    height: 3,
    backgroundColor: Colors.accentOne,
    marginVertical: 15,
    borderWidth: 1,
    borderColor: Colors.textColor
  }
});

export default Clock;
