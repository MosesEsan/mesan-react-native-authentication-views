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
            data: {email: "mosesesan@hotmail.com"},
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
                            <Text style={styles.headerText2}>FORGOT YOUR PASSWROD?</Text>
                            <Text style={styles.subText}>Enter your email and you will get instructions to reset your password</Text>
                        </View>


                        <View style={[styles.loginWrapper]}>

                            <View style={[styles.textInputContainer, (this.state.verification) ? styles.hiddenTextInputContainer : null]}>
                                <View style={[styles.textInputWrapper]}>
                                    <TextInput style={[styles.textInput]}
                                               value={this.state.data.email}
                                               placeholder={"Email Address"}
                                               onChangeText={(text) => this.onChangeText("email", text)}
                                               autoFocus ={false}/>
                                </View>
                                <Text style={{color: "white", fontSize: 11}}>
                                    {_this.state.error["email"]}
                                </Text>

                            </View>
                            <TouchableHighlight onPress={this.recoverPassword}
                                                underlayColor={"rgba(129, 29, 55, .8)"}
                                                style={[styles.logInButton, {width: windowWidth - 50, borderRadius: 2}]}>
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
        LoginModel.recoverPassword(_this.state.data['email'], function(success, message, error){
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

            _this.setState({forgot: false})
        });
    }
}

const styles = require('../../styles/login');