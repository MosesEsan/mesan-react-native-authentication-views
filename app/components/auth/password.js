/**
 * Author: Moses Adekunle Esan
 * Date: 8/5/16.
 * Project: React Native Authentication Views
 * Description: Forgot Password Page
 */

'use strict';

import React, {Component} from 'react';
import { Text, View, Dimensions, Alert } from 'react-native';

import {connect} from 'react-redux';
import { Actions } from 'react-native-router-flux';


import { ButtonWithLoader, AuthTextInput } from '../index';
import NavBar from '../navbar/navbar.js'
import {recover} from '../../actions/auth'; //Import your actions
import styles from '../../styles/login'

var {width: windowWidth, height:windowHeight} = Dimensions.get('window');

class Password extends Component {

    constructor(props){
        super(props)
        this.state = {
            email: "test@hotmail.com",
            error: {email:"", general:""},
        }
    }

    render() {
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

                                <Text style={[styles.errorText]}>{this.state.error['general']}</Text>

                                <AuthTextInput
                                    onChangeText={(text) => this.setState({email: text})}
                                    placeholder={"Email Address"}
                                    autoFocus={false}
                                    value={this.state.email}
                                    error={this.state.error['email']}
                                    secureTextEntry={false}
                                />
                            </View>

                            <ButtonWithLoader
                                onPress={(!this.state.isLoading) ? this.submit.bind(this) : null}
                                btnText={"SUBMIT"}
                                showLoader={(this.state.isLoading) ? true : false}
                                style={{width: windowWidth - 50, borderRadius: 2}}
                            />
                        </View>
                    </View>

                </View>
            </View>
        );
    }

    submit() {
        var state = this.state;
        var error = state.error;
        var errCount = 0;

        if (state.email.length <= 0) errCount++; //check email first
        error["email"] = (state.email.length <= 0) ? "Your email is required!" : "";

        this.setState({error: error});

        if (errCount <= 0) {
            var data = {email:state.email}
            this.setState({isLoading: true});
            this.props.recover(data, this.successCB.bind(this), this.errorCB.bind(this));
        }
    }

    successCB(message) {
        this.setState({isLoading: false});
        const {goBack} = this.props.navigation;
        Alert.alert('Password Reset Sent', message, [{text: 'Ok', style: 'cancel'}]);
        goBack();
    }

    errorCB(err) {
        this.setState({isLoading: false});
        var error = this.state.error;

        if (typeof err === "object" && err.email) error["email"] = err.email;
        else error["general"] = err;

        this.setState({error: error});
    }
}

//Connect everything
export default connect(null, {recover})(Password);