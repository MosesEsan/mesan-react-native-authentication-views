/**
 * Author: Moses Adekunle Esan
 * Date: 2/27/17. [US Format]
 * Project: React Native Authentication Views
 */

export const REGISTERING = 'REGISTERING';
export const REGISTRATION_SUCCESS = 'REGISTRATION_SUCCESS';
export const REGISTRATION_FAILED = 'REGISTRATION_FAILED';

export const LOGGING_IN = 'LOGGING_IN';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILED = 'LOGIN_FAILED';
export const LOGGED_IN = 'LOGGED_IN';
export const LOGGED_OUT = 'LOGGED_OUT';

export const SMS_VERIFICATION_SENT = 'SMS_VERIFICATION_SENT';
export const SMS_VERIFICATION_FAILED = 'SMS_VERIFICATION_FAILED';
export const EMAIL_VERIFICATION_SENT = 'EMAIL_VERIFICATION_SENT';
export const EMAIL_VERIFICATION_FAILED = 'EMAIL_VERIFICATION_FAILED';

export const CODE_VERIFICATION_SUCCESS = 'CODE_VERIFICATION_SUCCESS';
export const CODE_VERIFICATION_FAILED = 'CODE_VERIFICATION_FAILED';

export const PASSWORD_REMINDER_SENT = 'PASSWORD_REMINDER_SENT';
export const PASSWORD_REMINDER_FAILED = 'PASSWORD_REMINDER_FAILED';

export const NETWORK_FAILURE = 'NETWORK_FAILURE';

import Model from '../../model/login-model';

var React = require('react-native');
var { AsyncStorage, Alert } = React;

//Check the login status
export function checkLoginStatus(){
    return (dispatch) => {
        AsyncStorage.getItem('token', (err, token) => {
            if (token === null) dispatch({type: LOGGED_OUT});
            else dispatch({type: LOGGED_IN});
        });
    };
}

//Attempt to register user
export function register(user){
    return (dispatch) => {
        dispatch({type: REGISTERING});
        Model.register(user, function (success, data, error, network) {
            if (success) dispatch({ type: REGISTRATION_SUCCESS, email: user.email });
            else if (network) dispatch({type: NETWORK_FAILURE});
            else dispatch({type: REGISTRATION_FAILED, message:error.toString()});
        });
    };
}

//Attempt to register user with facebook
export function registerWithFacebook(){
    return (dispatch) => {
        Alert.alert(
            'API Calls Disabled',
            "API calls have been disabled for this demo.",
            [
                {text: 'Ok', style: 'cancel'}
            ]
        )

        // Model.registerWithFacebook(function (success, data, error, network) {
        //     if (success) dispatch({ type: LOGIN_SUCCESS, token: data.token });
        //     else if (network) dispatch({type: NETWORK_FAILURE});
        //     else dispatch({type: LOGIN_FAILED, message:error.toString()});
        // });
    };
}

//Attempt to log user in
export function login(user){
    return (dispatch) => {
        dispatch({type: LOGGING_IN});
        Model.login(user, function (success, data, error, network) {
            if (success) dispatch({ type: LOGIN_SUCCESS, token: data.token });
            else if (network) dispatch({type: NETWORK_FAILURE});
            else dispatch({type: LOGIN_FAILED, message:error.toString()});
        });
    };
}

//Attempt to send verification
export function sendEmailVerification(email){
    return (dispatch) => {
        Model.sendEmailVerification(email, function (success, data, error, network) {
            if (success) dispatch({ type: EMAIL_VERIFICATION_SENT, message: data.message });
            else if (network) dispatch({type: NETWORK_FAILURE});
            else dispatch({type: EMAIL_VERIFICATION_FAILED, message:error.toString()});
        });
    };
}

export function sendSMSVerification(phone){
    return (dispatch) => {
        Model.sendSMSVerification(phone, function (success, data, error, network) {
            if (success) dispatch({ type: SMS_VERIFICATION_SENT, message: data.message });
            else if (network) dispatch({type: NETWORK_FAILURE});
            else dispatch({type: SMS_VERIFICATION_FAILED, message:error.toString()});
        });
    };
}

//Attempt to verify the sms code
export function verifyCode(code){
    return (dispatch) => {
        Model.verifyCode(code, function (success, data, error, network) {
            if (success) dispatch({ type: CODE_VERIFICATION_SUCCESS, message: data.message });
            else if (network) dispatch({type: NETWORK_FAILURE});
            else dispatch({type: CODE_VERIFICATION_FAILED, message:error.toString()});
        });
    };
}

//Attempt to recover the users password
export function recoverPassword(email){
    return (dispatch) => {
        Model.recoverPassword(email, function (success, data, error, network) {
            if (success) dispatch({ type: PASSWORD_REMINDER_SENT, message: data.message });
            else if (network) dispatch({type: NETWORK_FAILURE});
            else dispatch({type: PASSWORD_REMINDER_FAILED, message:error.toString()});
        });
    };
}

//Attempt to log user out
export function logout(){
    return (dispatch) => {
        dispatch({type: LOGGED_OUT});
        Model.logout(function (success, data, error, network) {});
    };
}