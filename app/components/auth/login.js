/**
 * Author: Moses Adekunle Esan
 * Date: 8/5/16.
 * Project: React Native Authentication Views
 * Description: Login Page
 */

import React, { Component } from 'react';
import { Text, Platform, View, Dimensions, TextInput, TouchableOpacity, LayoutAnimation, UIManager, Alert, ActivityIndicator } from 'react-native';

import {connect} from 'react-redux';
import { Actions } from 'react-native-router-flux';

import { ButtonWithLoader, AuthTextInput } from '../index';
import NavBar from '../navbar/navbar.js'

import {login} from '../../actions/auth'; //Import your actions
import styles from '../../styles/login'

var {width: windowWidth, height:windowHeight} = Dimensions.get('window');

class Login extends Component {

    constructor(props){
        super(props)
        this.state = {
            isLoading: false,
            email: "test45@hotmail.com",
            password: "testpwd",
            error: {email: "", password: "", general:""}
        }
    }

    render() {
        return (
            <View style={{position: "relative"}}>
                <View style={[styles.loginContainer]}>

                    <NavBar leftBtnImage={require('../../images/left-arrow-filled.png')}
                            leftBtn={() => Actions.pop()} rightBtn={Actions.Password}/>

                    <View style={[styles.login]}>
                        <View style={[styles.header]}>
                            <Text style={[styles.headerText2, {paddingRight: 75}]}>
                                SIGN IN WITH YOUR E-MAIL
                            </Text>
                        </View>
                        <View style={[styles.loginWrapper]}>
                            <View style={[styles.textInputContainer]}>

                                <Text style={[{color:"red",
                                    marginTop: 5,
                                    marginBottom: 5,
                                    fontSize: 12}]}>{this.state.error['general']}</Text>


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
                            </View>

                            <ButtonWithLoader
                                onPress={(!this.state.isLoading) ? this.submit.bind(this) : null}
                                btnText={"SIGN IN"}
                                showLoader={(this.state.isLoading) ? true : false}
                                style={{width: windowWidth - 50, borderRadius: 2}}
                            />
                        </View>
                    </View>
                </View>
            </View>
        );
    }


    submit(){
        var state = this.state;
        var error = state.error;
        var errCount = 0;

        if (state.email.length <= 0) errCount++; //check email first
        error["email"] = (state.email.length <= 0) ? "Your email is required!" : "";

        if (state.password.length < 6) errCount++;
        error["password"] = (state.password.length < 6) ? "Password should be Min 6 characters" : ""

        this.setState({error: error});

        if (errCount <= 0) {
            var data = {email:state.email, password: state.password}
            this.setState({isLoading:true});
            this.props.login(data, this.successCB.bind(this), this.errorCB.bind(this));
        }
    }

    successCB(verified, token) {
        this.setState({isLoading:false});
        if (!verified) Actions.Verify({token: token}); //show the verify view
        else Actions.Home()
    }

    errorCB(err) {
        this.setState({isLoading:false});
        var error = this.state.error;

        if (typeof err === "object" && err.email) error["email"] = err.email;
        else if (typeof err === "string") error["general"] = err;


        this.setState({error: error});
    }
}


//Connect everything
export default connect(null, {login})(Login);
