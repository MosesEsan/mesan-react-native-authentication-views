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

import LoginModel from '../../model/login-model.js';
import NavBar from '../navbar/navbar.js'

import { Actions } from 'react-native-router-flux';
const BusyIndicator = require('react-native-busy-indicator');
const loaderHandler = require('react-native-busy-indicator/LoaderHandler');

var {width: windowWidth, height:windowHeight} = Dimensions.get('window');
var _this;

export default class Login extends Component {

    constructor(props){
        super(props)
        this.state = {
            data: {email: "", password: ""},
            error: {name: "", email: "", password: ""}
        }
    }

    componentDidMount() {
        //if (Platform.OS === "ios") StatusBar.setBarStyle('light-content', true);
        //UIManager.setLayoutAnimationEnabledExperimental &&   UIManager.setLayoutAnimationEnabledExperimental(true);
    }

    render() {
        _this = this;
        return (
            <View style={{position: "relative"}}>
                <View style={[styles.loginContainer]}>
                    <NavBar leftBtnImage={require('../../images/left-arrow-filled.png')} leftBtn={() => Actions.pop()} rightBtn={Actions.Password}/>
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
                                <Text style={{color: "#d3222", fontSize: 11}}>
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
                    <BusyIndicator />

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
            loaderHandler.showLoader("Please Wait..."); // Show indicator with message
            Alert.alert(
                'API Calls Disabled',
                "API calls have been disabled for this demo.",
                [
                    {text: 'Ok', style: 'cancel'}
                ]
            )

            loaderHandler.hideLoader();  // Hide the loader
            //_this.props.close();
            Actions.pop({refresh: {reload: true} });

            //LoginModel.login(_this.state.data, function (success, error) {
            //
            //loaderHandler.hideLoader();  // Hide the loader
            //
            //if (success) Actions.pop({refresh: {reload: true} })
            //    else {
            //        Alert.alert(
            //            'Login Failed',
            //            error,
            //            [
            //                {text: 'Ok', style: 'cancel'}
            //            ]
            //        )
            //    }
            //});
        }
    }
}


const styles = require('../../styles/login');