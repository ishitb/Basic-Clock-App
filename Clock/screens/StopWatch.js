import React, { Component } from 'react'
import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    TouchableOpacity,
  } from "react-native";
import {MaterialCommunityIcons} from '@expo/vector-icons'
import Colors from "../constants/Colors"

class StopWatch extends Component {

    constructor(props){
        super(props)
    }

    state = {
        min: 10,
        sec: 0,
        mili: 0
    }

    reset = () => {
        this.setState({
            min: 0,
            sec: 0,
            mili: 0
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={{ flexDirection: "row" }}>
                    <Text style={{ ...styles.watch, color: Colors.accentThree }}>
                        {
                            this.state.min
                        }
                    </Text>
                    <Text style={{ ...styles.watch, color: Colors.accentTwo }}>
                        {
                            this.state.sec
                        }
                    </Text>
                    <Text style={{ ...styles.watch, color: Colors.accentOne }}>
                        {
                            this.state.mili
                        }
                    </Text>
                </View>
                <TouchableOpacity
                    onPress={this.reset} 
                    style = {{ position: "absolute", left: 15, top: 42 }}        
                >
                    <MaterialCommunityIcons 
                        name='restart'
                        size={40}
                        color='rgb( 200, 100, 50 )'
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    // onPress={this.reset} 
                    style = {{ position: "absolute", right: 15, top: 42 }}        
                >
                    <MaterialCommunityIcons 
                        name='play'
                        size={40}
                        color='rgb( 50, 200, 50 )'
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    // onPress={this.reset} 
                    style = {{ position: "absolute", left: 65, top: 42 }}        
                >
                    <MaterialCommunityIcons 
                        name='stop'
                        size={40}
                        color='rgb( 200, 20, 50 )'
                    />
                </TouchableOpacity>
            </View>
        )
    }
}

var styles = StyleSheet.create({
    container: {
        paddingTop: 25,
        justifyContent: "center",
        alignItems: "center",
        height: 100,
    },
    watch: {
        marginHorizontal: 5,
        fontSize: 25
    }
})

export default StopWatch;