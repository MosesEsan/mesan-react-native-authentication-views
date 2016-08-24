/**
 * Author: Moses Adekunle Esan
 * Date: 8/5/16.
 * Project: React Native Authentication Views
 * Description: Forgot Password Page
 */

import React, { Component } from 'react';
import {
    Text, Platform,
    View, Dimensions,
    TextInput,TouchableHighlight,
    LayoutAnimation, UIManager,
    Alert, StatusBar
} from 'react-native';

import { Router, Scene, Actions} from 'react-native-router-flux';

import LoginModel from '../../model/login-model.js';
import NavBar from '../navbar/navbar.js'

var {width: windowWidth, height:windowHeight} = Dimensions.get('window');
var _this;

export default class Logout extends Component {

    constructor(props){
        super(props)
        this.state = {
            data: {email: ""},
            error: {email: ""}
        }
    }

    componentDidMount() {
        UIManager.setLayoutAnimationEnabledExperimental &&   UIManager.setLayoutAnimationEnabledExperimental(true);
    }

    render() {
        _this = this;
        return (
            <View style={{position: "relative"}}>
                <View style={[styles.loginContainer]}>
                    <View style={[styles.login, {justifyContent: "center", marginTop: 0}]}>
                        <View style={[styles.loginWrapper, {height: 190, marginTop: 0}]}>

                            <View style={[styles.header, {marginTop: 0}]}>
                                <Text style={[styles.subText, {fontWeight: "600", fontSize: 15, textAlign:"left"}]}>Are you sure you want to log out?</Text>
                            </View>


                            <View style={{position: "absolute", bottom: 0, left: 0, right: 0}}>
                                <TouchableHighlight onPress={this.logout}
                                                    underlayColor={"rgba(129, 29, 55, .8)"}
                                                    style={[styles.logInButton, {width: windowWidth - 50, borderRadius: 2, marginTop: 15}]}>
                                    <Text style={[styles.buttonText]}>LOG OUT</Text>
                                </TouchableHighlight>
                                <TouchableHighlight onPress={() => Actions.pop()}
                                                    underlayColor={"rgba(129, 29, 55, .8)"}
                                                    style={[styles.logInButton, {width: windowWidth - 50, borderRadius: 2, marginTop: 15, backgroundColor: "transparent", borderColor: "#D0CCC8", borderWidth: 1}]}>
                                    <Text style={[styles.buttonText, {color: "#535458", fontWeight: "600",}]}>CANCEL</Text>
                                </TouchableHighlight>
                            </View>
                        </View>
                    </View>

                </View>
            </View>
        );
    }

    logout(){
        LoginModel.logout();
        Actions.pop({refresh: {reload: true} });
    }
}

const styles = require('../../styles/login');