/**
 * Author: Moses Adekunle Esan
 * Date: 8/2/16.
 * Project: React Native Authentication Views
 */

import React, { Component } from 'react';
import { StatusBar, Platform, View, Dimensions,  UIManager
} from 'react-native';

import {Actions } from 'react-native-router-flux';
import LoginModel from '../model/login-model.js';


var {width: windowWidth, height:windowHeight} = Dimensions.get('window');
var NAVBAR_HEIGHT = (Platform.OS === 'ios') ? 64 : 54;


export default class Home extends Component {

    componentWillReceiveProps(newProps) {
        if (Platform.OS === "ios") StatusBar.setBarStyle('light-content', true);
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
        return <View style={{marginTop: NAVBAR_HEIGHT, flex:1}}/>;
    }
}

