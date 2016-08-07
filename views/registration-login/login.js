/**
 * Author: Moses Adekunle Esan
 * Date: 8/5/16.
 * Project: React Native Authentication Views
 * Description: Login Page
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

export default class Login extends Component {

    constructor(props){
        super(props)
        this.state = {
            data: {email: "mosesesan@hotmail.com", password: "testpwd"},
            error: {name: "", email: "", password: ""}
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
                    <NavBar leftBtnImage={require('../../images/close.png')} leftBtn={() => Actions.pop()} rightBtn={Actions.Password}/>
                    <View style={[styles.login]}>
                        <View style={[styles.header]}>
                            <Text style={[styles.headerText2, {paddingRight: 75}]}>SIGN IN WITH YOUR E-MAIL</Text>
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
                                <View style={[styles.textInputWrapper]}>
                                    <TextInput style={[styles.textInput]}
                                               secureTextEntry={true}
                                               value={this.state.data.password}
                                               placeholder={"Password"}
                                               onChangeText={(text) => this.onChangeText("password", text)}
                                               autoFocus ={false}/>
                                </View>
                                <Text style={{color: "#d3222b", fontSize: 11}}>
                                    {_this.state.error["password"]}
                                </Text>

                            </View>
                            <TouchableHighlight onPress={this.logIn}
                                                underlayColor={"rgba(129, 29, 55, .8)"}
                                                style={[styles.logInButton, {width: windowWidth - 50, borderRadius: 2, marginTop: 15}]}>
                                <Text style={[styles.buttonText]}>SIGN IN</Text>
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

    logIn(){

        var data = _this.state.data;
        var error = {};
        var errCount = 0;


        if (data["password"].length < 1) {
            error["password"] = "Password is required";
            errCount++;
        }else {
            error["password"] = "";
        }


        if(data["email"].length === 0) {
            error["email"] = "Your email is required!";
            errCount++;
        }else error["email"] = "";

        _this.setState({error: error});

        if (errCount === 0) {
            LoginModel.login(_this.state.data, function (success, error) {
                if (success) {
                    _this.props.close();
                }
                else {
                    Alert.alert(
                        'Login Failed',
                        error,
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