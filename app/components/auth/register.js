/**
 * Author: Moses Adekunle Esan
 * Date: 8/5/16.
 * Project: React Native Authentication Views
 * Description: Registration Page
 */

'use strict';

import React, {Component} from 'react';
import { Text, Platform, View, Dimensions, TextInput, TouchableOpacity, ActivityIndicator, LayoutAnimation, UIManager, Alert, StatusBar } from 'react-native';

import {connect} from 'react-redux';
import { Actions } from 'react-native-router-flux';

import { Button, AuthTextInput, ButtonWithLoader } from '../index';
import NavBar from '../navbar/navbar.js'

import {register} from '../../actions/auth'; //Import your actions
import styles from '../../styles/login'

var {width: windowWidth, height:windowHeight} = Dimensions.get('window');

class Register extends Component {

    constructor(props){
        super(props)
        this.state = {
            isLoading: false,
            name: "John Brown",
            email: "test1@hotmail.com",
            password: "testpwd",
            password_confirmation: "testpwd",
            error: {name:"", email:"", password: "", password_confirmation:"", general:""},

        };
    }

    render() {
        return (
            <View style={{position: "relative"}}>
                <View style={[styles.loginContainer]}>
                    <NavBar leftBtnImage={require('../../images/left-arrow-filled.png')} leftBtn={() => Actions.pop()} rightBtn={null}/>
                    <View style={[styles.login]}>

                        <View style={[styles.header]}>
                            <Text style={[styles.headerText2, {paddingRight: 75 }]}>CREATE YOUR PROFILE</Text>
                        </View>
                        <View style={[styles.loginWrapper]}>
                            <View style={[styles.textInputContainer]}>


                                <Text style={[styles.errorText]}>{this.state.error['general']}</Text>

                                <AuthTextInput
                                    onChangeText={(text) => this.setState({name: text})}
                                    placeholder={"Full Name"}
                                    autoFocus={true}
                                    value={this.state.name}
                                    error={this.state.error['name']}
                                    secureTextEntry={false}
                                />

                                <AuthTextInput
                                    onChangeText={(text) => this.setState({email: text})}
                                    placeholder={"Email Address"}
                                    autoFocus={false}
                                    value={this.state.email}
                                    error={this.state.error['email']}
                                    secureTextEntry={false}
                                />

                                <AuthTextInput
                                    onChangeText={(text) => this.setState({password: text})}
                                    placeholder={"Password"}
                                    autoFocus={false}
                                    value={this.state.password}
                                    error={this.state.error['password']}
                                    secureTextEntry={true}
                                />

                                <AuthTextInput
                                    onChangeText={(text) => this.setState({password_confirmation: text})}
                                    placeholder={"Confirm Password"}
                                    autoFocus={false}
                                    value={this.state.password_confirmation}
                                    error={this.state.error['password_confirmation']}
                                    secureTextEntry={true}
                                />
                            </View>
                        </View>

                        <ButtonWithLoader
                            onPress={(!this.state.isLoading) ? this.submit.bind(this) : null}
                            btnText={"SIGN UP"}
                            showLoader={(this.state.isLoading) ? true : false}
                            style={{width: windowWidth - 50, borderRadius: 2, position: "absolute", bottom: 15}}
                        />
                    </View>

                </View>
            </View>
        );
    }

    submit() {
        var state = this.state;
        var error = state.error;
        var errCount = 0;

        if (state.name.length <= 0) errCount++;
        error["name"] = (state.name.length <= 0) ? "Your name is required" : "";

        if (state.email.length <= 0) errCount++; //check email first
        error["email"] = (state.email.length <= 0) ? "Your email is required!" : "";

        if (state.password.length < 6) errCount++;
        error["password"] = (state.password.length < 6) ? "Password should be Min 6 characters" : ""

        if (state.password !== state.password_confirmation) errCount++; //check password match
        error["password_confirmation"] = (state.password !== state.password_confirmation) ? "The password do not match." : "";

        this.setState({error: error});

        if (errCount <= 0) {
            var data = {
                name: this.state.name,
                email:state.email,
                password: state.password,
                password_confirmation: this.state.password_confirmation,
            }

            this.setState({isLoading:true});
            this.props.register(data, this.successCB.bind(this), this.errorCB.bind(this));
        }
    }

    successCB(token) {
        this.setState({isLoading:false});
        Actions.Verify({token: token}); //show the verify view
    }

    errorCB(err) {
        this.setState({isLoading:false});
        var error = this.state.error;

        if (typeof err === "object" && err.email) error["email"] = err.email;
        else if (typeof err === "string") error["general"] = err;


        this.setState({error: error});
    }
}

// The function is used to take the Redux Store, then take some data from it,
// and insert it into the props for our component.
function mapStateToProps(state, props) {
    return {
        registering: state.userReducer.registering
    };
}

//Connect everything
export default connect(mapStateToProps, {register})(Register);

