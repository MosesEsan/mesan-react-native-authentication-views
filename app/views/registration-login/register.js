/**
 * Author: Moses Adekunle Esan
 * Date: 8/5/16.
 * Project: React Native Authentication Views
 * Description: Registration Page
 */

import React, { Component } from 'react';
import { Text, Platform, View, Dimensions, TextInput, TouchableOpacity, ActivityIndicator, LayoutAnimation, UIManager, Alert, StatusBar } from 'react-native';

import NavBar from '../navbar/navbar.js'

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as ReduxActions from '../../actions';
import { Actions } from 'react-native-router-flux';

var {width: windowWidth, height:windowHeight} = Dimensions.get('window');

class Register extends Component {

    constructor(props){
        super(props)
        this.state = {
            name: "Moses",
            email: "mosesesan@eandmdigital.com",
            password: "testingpwd",
            password_confirmation: "testingpwd",
            error: {name: "", email: "", password: "", password_confirmation: ""},
        }
    }

    render() {
        return (
            <View style={{position: "relative"}}>
                <View style={[styles.loginContainer]}>
                    <NavBar leftBtnImage={require('../../../images/left-arrow-filled.png')} leftBtn={() => Actions.pop()} rightBtn={null}/>
                    <View style={[styles.login]}>
                        <View style={[styles.header]}>
                            <Text style={[styles.headerText2, {paddingRight: 75 }]}>CREATE YOUR PROFILE</Text>
                        </View>
                        <View style={[styles.loginWrapper]}>
                            <View style={[styles.textInputContainer]}>
                                <View style={[styles.textInputWrapper]}>
                                    <TextInput style={[styles.textInput]}
                                               value={this.state.name}
                                               placeholder={"Full Name"}
                                               onChangeText={(text) => this.setState({"name" : text})}
                                               autoFocus ={false}/>
                                </View>
                                <Text style={{color: "#d3222b", fontSize: 11}}>
                                    {this.state.error["name"]}
                                </Text>
                                <View style={[styles.textInputWrapper]}>
                                    <TextInput style={[styles.textInput]}
                                               value={this.state.email}
                                               placeholder={"Email Address"}
                                               onChangeText={(text) => this.setState({"email" : text})}
                                               autoFocus ={false}/>
                                </View>
                                <Text style={{color: "#d3222b", fontSize: 11}}>
                                    {this.state.error["email"]}
                                </Text>
                                <View style={[styles.textInputWrapper]}>
                                    <TextInput style={[styles.textInput]}
                                               secureTextEntry={true}
                                               value={this.state.password}
                                               placeholder={"Password"}
                                               onChangeText={(text) => this.setState({"password" : text})}
                                               autoFocus ={false}/>
                                </View>
                                <Text style={{color: "#d3222b", fontSize: 11}}>
                                    {this.state.error["password"]}
                                </Text>
                                <View style={[styles.textInputWrapper]}>
                                    <TextInput style={[styles.textInput]}
                                               secureTextEntry={true}
                                               value={this.state.password_confirmation}
                                               placeholder={"Confirm Password"}
                                               onChangeText={(text) => this.setState({"password_confirmation" : text})}
                                               autoFocus ={false}/>
                                </View>
                                <Text style={{color: "#d3222b", fontSize: 11, marginBottom: 20}}>
                                    {this.state.error["password_confirmation"]}
                                </Text>

                            </View>
                        </View>
                        <TouchableOpacity onPress={(!this.props.registering)?this.register.bind(this):null}
                                            style={[styles.logInButton, {width: windowWidth - 50, borderRadius: 2, position: "absolute", bottom: 15}]}>
                            {
                                (!this.props.registering) ?
                                    <Text style={[styles.buttonText]}>SIGN UP</Text>
                                    :
                                    <ActivityIndicator
                                        animating={true}
                                        color="#fff"
                                        style={[{height: 24}]}
                                        size="small"
                                    />
                            }

                        </TouchableOpacity>
                    </View>

                </View>
            </View>
        );
    }

    register(){
        var error = {name: "", email: "", password: "", password_confirmation: ""};
        var errCount = 0;

        if(this.state.name.length === 0) {
            error["name"] = "Your name is required!";
            errCount++;
        }

        if(this.state.email.length === 0) {
            error["email"] = "Your email is required!";
            errCount++;
        }

        if (this.state.password.length < 6) {
            error["password"] = "Password should be Min 6 characters";
            errCount++;
        }else{
            if(this.state.password !== this.state.password_confirmation) {
                error["password_confirmation"] = "The password does not match.";
                errCount++;
            }
        }

        this.setState({error: error});


        if (errCount === 0) {
            var data = {
                name: this.state.name,
                email: this.state.email,
                password: this.state.password,
                password_confirmation: this.state.password_confirmation,
            };

            // this.props.register(data);

            Alert.alert(
                'API Calls Disabled',
                "API calls have been disabled for this demo.",
                [
                    {text: 'Ok', style: 'cancel'}
                ]
            )
        }
    }
}

// The function is used to take the Redux Store, then take some data from it,
// and insert it into the props for our component.
function mapStateToProps(state, props) {
    return {
        registering: state.userReducer.registering
    };
}

// Doing this merges our actions into the component’s props,
// while wrapping them in dispatch() so that they immediately dispatch an Action.
function mapDispatchToProps(dispatch) {
    return bindActionCreators(ReduxActions, dispatch);
}

// ‘mapStateToProps’ and ‘mapDispatchToProps’ are two functions bound with ‘connect’ to the component: this makes Redux know that this component needs to be passed a piece of the state (everything under ‘userReducers’) and all the actions available in the app.
// Just by doing this, we will have access to the login action and to the state of the app


//Connect everything
export default connect(mapStateToProps, mapDispatchToProps)(Register);

const styles = require('../../styles/login');
