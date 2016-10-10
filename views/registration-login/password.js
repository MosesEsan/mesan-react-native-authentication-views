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

export default class Password extends Component {

    constructor(props){
        super(props)
        this.state = {
            data: {email: ""},
            error: {email: ""}
        }
    }

    componentDidMount() {
        UIManager.setLayoutAnimationEnabledExperimental &&   UIManager.setLayoutAnimationEnabledExperimental(true);
        if (Platform.OS === "ios") StatusBar.setBarStyle('default', true);
    }

    render() {
        _this = this;
        return (
            <View style={{position: "relative"}}>
                <View style={[styles.loginContainer]}>
                    <NavBar leftBtnImage={require('../../images/left-arrow-filled.png')} leftBtn={() => Actions.pop()} rightBtn={null}/>
                    <View style={[styles.login]}>


                        <View style={[styles.header]}>
                            <Text style={styles.headerText2}>FORGOT YOUR PASSWORD?</Text>
                            <Text style={styles.subText}>Enter your email and you will get instructions to reset your password</Text>
                        </View>


                        <View style={[styles.loginWrapper]}>

                            <View style={[styles.textInputContainer]}>
                                <View style={[styles.textInputWrapper]}>
                                    <TextInput style={[styles.textInput]}
                                               value={this.state.data.email}
                                               placeholder={"Email Address"}
                                               onChangeText={(text) => this.onChangeText("email", text)}
                                               autoFocus ={false}/>
                                </View>
                                <Text style={{color: "#d3222b", fontSize: 11}}>
                                    {_this.state.error["email"]}
                                </Text>

                            </View>
                            <TouchableHighlight onPress={this.recoverPassword}
                                                underlayColor={"rgba(129, 29, 55, .8)"}
                                                style={[styles.logInButton, {width: windowWidth - 50, borderRadius: 2, marginTop: 15}]}>
                                <Text style={[styles.buttonText]}>SUBMIT</Text>
                            </TouchableHighlight>
                        </View>
                    </View>

                </View>
            </View>
        );
    }

    onChangeText(key, value){
        var data = _this.state.data;
        data[key] = value;
        _this.setState({data: data})
    }



    recoverPassword(){

        var data = _this.state.data;
        var error = {};
        var errCount = 0;

        if(data["email"].length === 0) {
            error["email"] = "Your email is required!";
            errCount++;
        }else error["email"] = "";


        _this.setState({error: error});

        if (errCount === 0){
            loaderHandler.showLoader("Please Wait..."); // Show indicator with message

            LoginModel.recoverPassword(_this.state.data['email'], function(success, message, error){
                loaderHandler.hideLoader();  // Hide the loader
                if (error) {
                    Alert.alert(
                        'Failed To Send Reminder',
                        error,
                        [
                            {text: 'Ok', style: 'cancel'}
                        ]
                    )
                }else {
                    Alert.alert(
                        'Password Reminder Sent',
                        message,
                        [
                            {text: 'Ok', style: 'cancel'}
                        ]
                    )
                }
            });

        }

    }
}

const styles = require('../../styles/login');