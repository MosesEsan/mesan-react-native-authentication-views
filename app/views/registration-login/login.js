/**
 * Author: Moses Adekunle Esan
 * Date: 8/5/16.
 * Project: React Native Authentication Views
 * Description: Login Page
 */

import React, { Component } from 'react';
import { Text, Platform, View, Dimensions, TextInput, TouchableOpacity, LayoutAnimation, UIManager, Alert, ActivityIndicator } from 'react-native';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as ReduxActions from '../../actions';
import { Actions } from 'react-native-router-flux';

import NavBar from '../navbar/navbar.js'

var {width: windowWidth, height:windowHeight} = Dimensions.get('window');

class Login extends Component {

    constructor(props){
        super(props)
        this.state = {
            email: "",
            password: "",
            error: {email: "", password: ""}
        }
    }

    render() {
        return (
            <View style={{position: "relative"}}>
                <View style={[styles.loginContainer]}>
                    <NavBar leftBtnImage={require('../../../images/left-arrow-filled.png')}
                            leftBtn={() => Actions.pop()} rightBtn={Actions.Password}/>
                    <View style={[styles.login]}>
                        <View style={[styles.header]}>
                            <Text style={[styles.headerText2, {paddingRight: 75}]}>SIGN IN WITH YOUR E-MAIL</Text>
                            <Text style={styles.subText}>
                                <Text style={[styles.subText, {color:"#CB1B22"}]} onPress={() => Actions.Verify()}>Click here </Text>
                                If you need to verify your account
                            </Text>

                        </View>
                        <View style={[styles.loginWrapper]}>
                            <View style={[styles.textInputContainer]}>
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
                            </View>
                            <TouchableOpacity
                                onPress={(!this.props.loggingIn)?this.logIn.bind(this):null}
                                style={[styles.logInButton, {width: windowWidth - 50, borderRadius: 2, marginTop: 15}]}>
                                {
                                    (!this.props.loggingIn) ?
                                        <Text style={[styles.buttonText]}>SIGN IN</Text>
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
            </View>
        );
    }

    logIn(){
        var error = {email: "", password: ""}
        var errCount = 0;

        if (this.state.password.length === 0) {
            error["password"] = "Password is required";
            errCount++;
        }

        if(this.state.email.length === 0) {
            error["email"] = "Your email is required!";
            errCount++;
        }

        this.setState({error: error});

        if (errCount === 0) {
            var data = {email: this.state.email, password: this.state.password};
            // this.props.login(data);

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
        loggingIn: state.userReducer.loggingIn,
        loggedIn: state.userReducer.loggedIn
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
export default connect(mapStateToProps, mapDispatchToProps)(Login);

const styles = require('../../styles/login');