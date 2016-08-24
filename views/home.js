/**
 * Author: Moses Adekunle Esan
 * Date: 8/2/16.
 * Project: React Native Authentication Views
 */

import React, { Component } from 'react';

import {
    Text, Platform,
    View, Dimensions,
    TextInput,TouchableHighlight,
    LayoutAnimation, UIManager,
    Alert, StatusBar
} from 'react-native';


import {Actions } from 'react-native-router-flux';
import LoginModel from '../model/login-model.js';


var {width: windowWidth, height:windowHeight} = Dimensions.get('window');
var NAVBAR_HEIGHT = (Platform.OS === 'ios') ? 64 : 54;


export default class Home extends Component {

    componentWillReceiveProps(newProps) {
        if (Platform.OS === "ios") StatusBar.setBarStyle('light-content', true);
        if (newProps.reload) {
            LoginModel.checkTokenExist(function(exist){
                if (!exist) Actions.login(); //Open Login Page
            });
        }
    }

    componentDidMount() {
        var _this = this;
        if (Platform.OS === "ios") StatusBar.setBarStyle('light-content', true);
        UIManager.setLayoutAnimationEnabledExperimental &&   UIManager.setLayoutAnimationEnabledExperimental(true);
        LoginModel.checkTokenExist(function(exist){
            if (!exist) Actions.login(); //Open Login Page
        });
    }

    render() {

        return (
            <View style={{position: "relative", marginTop: NAVBAR_HEIGHT, flex:1}}>
                <View style={[styles.loginContainer]}>
                    <View style={[styles.login, {justifyContent: "center", marginTop: 0}]}>
                        <View style={[]}>

                            <TouchableHighlight onPress={Actions.logout}
                                                underlayColor={"rgba(129, 29, 55, .8)"}
                                                style={[styles.logInButton, {width: windowWidth - 50, borderRadius: 2}]}>
                                <Text style={[styles.buttonText]}>LOG OUT</Text>
                            </TouchableHighlight>
                        </View>
                    </View>

                </View>
            </View>
        );

    }
}


const styles = require('../styles/login');