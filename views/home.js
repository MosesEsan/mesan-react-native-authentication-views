/**
 * Author: Moses Adekunle Esan
 * Date: 8/2/16.
 * Project: React Native Authentication Views
 */

import React, { Component } from 'react';
import {
    StatusBar,
    Text, Platform,
    View, Dimensions, TextInput,TouchableHighlight, LayoutAnimation, UIManager, ListView,
    CameraRoll,
    DeviceEventEmitter,
    ActivityIndicator,
    Image,
    TouchableOpacity,
    Modal
} from 'react-native';

import CustomModal from 'react-native-simple-modal';
import NavBar from './navbar/navbar.js'
import Login from './registration-login/login-register.js'
import LoginModel from '../model/login-model.js';

var {width: windowWidth, height:windowHeight} = Dimensions.get('window');
var NAVBAR_HEIGHT = (Platform.OS === 'ios') ? 64 : 54;

var _this;
const styles = require('../styles/home');

export default class Home extends Component {

    constructor(props){
        super(props)
        this.state = {
            login: false
        }
    }

    componentDidMount() {
        _this = this;
        if (Platform.OS === "ios") StatusBar.setBarStyle('light-content', true);
        UIManager.setLayoutAnimationEnabledExperimental &&   UIManager.setLayoutAnimationEnabledExperimental(true);
        LoginModel.checkTokenExist(function(exist){
            if (!exist) _this.setState({login:true});
        });
        //LoginModel.logout();
    }

    render() {
        return (
            <View style={[styles.container]}>
                <NavBar rightBtn={null} color={"#CB1B22"}/>
                <View style={{marginTop: NAVBAR_HEIGHT, flex:1}}/>
                <CustomModal open={this.state.login}
                       closeOnTouchOutside={false}
                       modalStyle={{padding: 0, backgroundColor: "white",width: windowWidth,  height:  windowHeight, margin:0}}>
                    <Login onLogin={() =>  this.setState({login: false})}/>
                </CustomModal>
            </View>
        );
    }
}
