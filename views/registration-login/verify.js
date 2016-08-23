/**
 * Author: Moses Adekunle Esan
 * Date: 8/23/16.
 * Project: React Native Authentication Views
 * Description: Verify Page
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
const BusyIndicator = require('react-native-busy-indicator');
const loaderHandler = require('react-native-busy-indicator/LoaderHandler');


var {width: windowWidth, height:windowHeight} = Dimensions.get('window');
var _this;

export default class Password extends Component {

    constructor(props){
        super(props)
        this.state = {
            data: {email: "", phone: ""},
            error: {email: "", phone: ""}
        }
    }

    componentDidMount() {
        UIManager.setLayoutAnimationEnabledExperimental &&   UIManager.setLayoutAnimationEnabledExperimental(true);
        if (Platform.OS === "ios") StatusBar.setBarStyle('default', true);

        if (this.props.email !== undefined){
            var data = this.state.data;
            data["email"] = (this.props.email) ;
            this.setState({data: data, email: this.props.email})
        }
    }

    render() {
        _this = this;
        return (
            <View style={{position: "relative"}}>
                <View style={[styles.loginContainer]}>
                    <NavBar leftBtnImage={require('../../images/left-arrow-filled.png')} leftBtn={() => Actions.pop()} rightBtn={null}/>
                    <View style={[styles.login]}>


                        <View style={[styles.header]}>
                            <Text style={styles.headerText2}>VERIFY YOUR ACCOUNT</Text>
                            <Text style={styles.subText}>
                                It's easy to verify your account, just select your preferred verification method.
                            </Text>
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

                            <View style={[styles.textInputContainer]}>
                                <View style={[styles.textInputWrapper]}>
                                    <TextInput style={[styles.textInput]}
                                               value={this.state.data.phone}
                                               placeholder={"Phone Number"}
                                               onChangeText={(text) => this.onChangeText("phone", text)}
                                               autoFocus ={false}/>
                                </View>
                                <Text style={{color: "#d3222b", fontSize: 11}}>
                                    {_this.state.error["phone"]}
                                </Text>
                            </View>
                            <TouchableHighlight onPress={this.sendEmailVerification}
                                                underlayColor={"rgba(129, 29, 55, .8)"}
                                                style={[styles.logInButton, {width: windowWidth - 50, borderRadius: 2, marginTop: 15}]}>
                                <Text style={[styles.buttonText]}>Send Email</Text>
                            </TouchableHighlight>
                            <TouchableHighlight onPress={this.sendSMSVerification}
                                                underlayColor={"rgba(129, 29, 55, .8)"}
                                                style={[styles.logInButton, {width: windowWidth - 50, borderRadius: 2, marginTop: 15}]}>
                                <Text style={[styles.buttonText]}>Send SMS</Text>
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


    sendEmailVerification(){
        var data = _this.state.data;
        var error = _this.state.error;
        var errCount = 0;
        if(data["email"].length === 0) {
            error["email"] = "Your email is required!";
            errCount++;
        }else error["email"] = "";

        _this.setState({error: error});

        if (errCount === 0){
            loaderHandler.showLoader("Please Wait..."); // Show indicator with message

            LoginModel.sendVerification(data["email"], "", "email", function(success, message, error){
               loaderHandler.hideLoader();  // Hide the loader
               if(success) {
                   Alert.alert(
                       'Verification Sent',
                       message,
                       [
                           {
                               text: 'Continue', style: 'cancel', onPress: () => {
                               Actions.pop()
                           }
                           },
                       ]
                   )
               }else {
                   var errormsg = _this.state.error;
                   errormsg["email"] = error;
                   _this.setState({error: errormsg});
                }
            });
        }

    }


    sendSMSVerification(){
        var data = _this.state.data;
        var error = _this.state.error;
        var email = _this.state.email;
        var errCount = 0;
        if(data["phone"].length === 0) {
            error["phone"] = "Your phone number is required!";
            errCount++;
        }else error["phone"] = "";

        _this.setState({error: error});

        if (errCount === 0){
            loaderHandler.showLoader("Please Wait..."); // Show indicator with message

            LoginModel.sendVerification(email, data["phone"], "sms", function(success, message, error){
               loaderHandler.hideLoader();  // Hide the loader
               if(success) {
                   Actions.VerificationCode();
               }else {
                   var errormsg = _this.state.error;
                   errormsg["phone"] = error;
                   _this.setState({error: errormsg});
                }
            });
        }

    }
}

const styles = require('../../styles/login');