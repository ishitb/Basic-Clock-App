import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ProgressBarAndroid
} from "react-native";
import ProgressCircle from "react-native-progress-circle";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { weatherConditions } from "../assets/WeatherConditions"

class Clock extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    time: {
      hours: null,
      minutes: null,
      seconds: null,
      day: null,
      date: null,
      month: null
    },
    temp: 22.6,
    title: "Haze"
  };

  _UNSAFEcomponentWillMount() {
    this.getCurrentTime();
  }

  getCurrentTime = () => {
    let d = new Date()
    let hours = d.getHours().toString();
    let minutes = d.getMinutes().toString();
    let seconds = d.getSeconds().toString();
    let days = [
      "Mon", "Tue", "Wed", "Thur", "Fri", "Sat", "Sun"
    ]
    let day = days[ d.getDay() - 1 ];
    let date = d.getDate()
    let months = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"
    ]
    let month = months[ d.getMonth() - 1 ]

    hours = this.zeroBefore(hours);
    minutes = this.zeroBefore(minutes);
    seconds = this.zeroBefore(seconds);

    this.setState({
      time: {
        hours: hours,
        minutes: minutes,
        seconds: seconds,
        day: day,
        date: date,
        month: month
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

    fetch("http://api.openweathermap.org/data/2.5/weather?q=Delhi&appid=7eedb3a32628b60604c0828a9b5645c5").then(res => {
      // handle success
      // console.log(response.data.name);
      var response = res.json();
      console.clear()
      console.log(response);
      this.setState({
        temp: response.main.temp,
        title: response.weather[0].main
      });
    })
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
                  : 1
              }
              radius={175}
              borderWidth={10}
              color={Colors.accentOne}
              shadowColor={Colors.textColor}
              bgColor={Colors.darkBg}
            />
          </View>
          <View style={{ position: "absolute" }}>
            <ProgressCircle
              percent={
                this.state.time.minutes != 0
                  ? (this.state.time.minutes / 60) * 100
                  : 1
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
                  ? this.state.time.hours > 12
                    ? ((this.state.time.hours - 12) / 12) * 100
                    : (this.state.time.hours / 12) * 100
                  : 2
              }
              radius={135}
              borderWidth={10}
              color={Colors.accentThree}
              shadowColor={Colors.textColor}
              bgColor={Colors.darkBg}
            />
          </View>
          <View style={{ ...styles.digital, flexDirection: "row", justifyContent: "space-evenly", width: 230, backgroundColor: Colors.darkBg }}>
            <View style={styles.weather}>
              <View style={{ marginRight: 10 }}>
                <MaterialCommunityIcons
                  size={32}
                  name={weatherConditions[this.state.title].icon}
                  color={weatherConditions[this.state.title].color}
                />
              </View>
              <Text style={styles.weatherText}>
              {
                this.state.temp
              }°C
              </Text>
            </View>
            <View style={{ alignItems: "center", justifyContent: 'flex-end' }}>
              <Text style={{ ...styles.digital, color: Colors.accentThree}}>
                {this.state.time.hours}
              </Text>
              <Text style={{ ...styles.digitalText, alignSelf: "flex-end" }} >
                { this.state.time.date }                       
              </Text>
            </View>
            <View style={styles.breakVertical} />
            <View style={{ alignItems: "center", justifyContent: 'flex-end' }}>
              <Text style={{ ...styles.digital, color: Colors.accentTwo }}>
                {this.state.time.minutes}
              </Text>
              <Text style={styles.digitalText} >
                { this.state.time.month }
              </Text>
            </View>
            <View style={styles.breakVertical} />
            <View style={{ alignItems: "center", justifyContent: 'flex-end' }}>
              <Text style={{ ...styles.digital, color: Colors.accentOne }}>
                {this.state.time.seconds}
              </Text>
              <Text style={{ ...styles.digitalText, alignSelf: "flex-start" }} >
                { this.state.time.day }
              </Text>
            </View>
          </View>

        </View>
        <View style={styles.breakBottom}>
          <Text
            style={{ ...styles.digital, textAlign: "center", fontSize: 23 }}
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
    fontSize: 55,
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
  breakVertical: {
    width: 1,
    height: 100,
    backgroundColor: Colors.textColor
  },
  digitalText: {
    color: Colors.textColor,
    fontSize: 20
  },
  weather: {
    alignItems: "center",
    position: "absolute",
    bottom: -50,
    width: 220,
    flexDirection: "row",
    justifyContent: "center"
  },
  weatherText: {
    color: Colors.textColor,
    textAlign: "center",
    fontSize: 20,
  }
});

export default Clock;
