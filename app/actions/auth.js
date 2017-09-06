/**
 * Author: Moses Adekunle Esan
 * Date: 2/27/17. [US Format]
 * Project: React Native Authentication Views
 */

'use strict';

var { NetInfo, Alert, AsyncStorage } = require('react-native');

// import {
//     REGISTRATION_SUCCESS,
//     LOGIN_SUCCESS, LOGGED_IN, LOGGED_OUT,
//
//     EMAIL_VERIFICATION_SENT, EMAIL_VERIFICATION_FAILED,
//     CODE_VERIFICATION_SUCCESS, CODE_VERIFICATION_FAILED,
//     PASSWORD_REMINDER_SENT, PASSWORD_REMINDER_FAILED } from "./action_types";

import {LOGIN_SUCCESS, LOGIN_FAILED, LOGGED_IN, LOGGED_OUT} from "./action_types";
import { NETWORK_ERROR, SERVER_ERROR, ERROR, NETWORK_MSG, SERVER_MSG} from "../config";
import api from '../api/auth';

NetInfo.isConnected.addEventListener('change', () => {});


//Register
export function register(data, successCB, errorCB) {
    return (dispatch) => {
        checkNetworkConnection(function () {
            api.register(data, "email", function (success, data, error) {
                if (success) successCB(data.token);
                else if (error) showError(error, errorCB)
            });
        }, errorCB);
    };
}

//Register with Facebook
export function registerWithFacebook(successCB, errorCB) {
    return (dispatch) => {
        checkNetworkConnection(function () {
            api.registerWithFacebook(function (success, data, error) {
                if (success) successCB(data.token);
                else if (error) showError(error, errorCB)
            });
        }, errorCB);
    };
}

//Login
export function login(data, successCB, errorCB) {
    return (dispatch) => {
        checkNetworkConnection(function () {
            api.login(data, function (success, data, error) {
                if (success) {
                    //if user has verified account, save token
                    if (data.verified) dispatch({type: LOGIN_SUCCESS, token: data.token});
                    successCB(data.verified, data.token);
                } else if (error) {
                    dispatch({type: LOGIN_FAILED});
                    showError(error, errorCB)
                }
            });
        }, errorCB);
    };
}

//Send Email Verification
export function sendEmailVerification(data, successCB, errorCB) {
    return (dispatch) => {
        checkNetworkConnection(function () {
        api.sendEmailVerification(data, function (success, data, error) {
            if (success)  successCB(data.message);
            else if (error)  showError(error.toString(), errorCB)
        });
        }, null);
    };
}

//Send SMS Verification
export function sendVerificationCode(data, successCB, errorCB) {
    return (dispatch) => {
        checkNetworkConnection(function () {
        api.sendVerificationCode(data, function (success, data, error) {
            if (success) successCB(data.message);
            else if (error) showError(error, errorCB)
        });
        }, null);
    };
}

//Verify SMS Code
export function verifyCode(data, successCB, errorCB) {
    return (dispatch) => {
        var token = data.token;
        checkNetworkConnection(function () {
        api.verifyCode(data, function (success, data, error) {
            if (success) {
                dispatch({type: LOGIN_SUCCESS, token: token});
                successCB(data.message);
            }
            else if (error) showError(error, errorCB)
        });
    }, null);
    };
}

//Logout
export function logout(successCB) {
    return (dispatch) => {
        checkNetworkConnection(function () {
            api.logout(function (success, error) {
                if (success) {
                    dispatch({type: LOGGED_OUT});
                    successCB();
                } else alert("Failed to log out. Please try again" + error);
            });
        }, null);
    };
}

//Recover Password
export function recover(data, successCB, errorCB) {
    return (dispatch) => {
        checkNetworkConnection(function () {
            api.recover(data, function (success, data, error) {
                if (success) successCB(data.message);
                else if (error) showError(error, errorCB)
            });
        }, null);
    };
}

//Set Logged in Status
export function setStatus(loggedIn) {
    return (dispatch) => {
        if (loggedIn) dispatch({type: LOGGED_IN});
        else dispatch({type: LOGGED_OUT});
    };
}

//Check Internet Connection
export function checkNetworkConnection(successCB, errorCB) {
    NetInfo.isConnected.fetch().then(isConnected => {
        if (isConnected) successCB();
        else showError({type: NETWORK_ERROR}, errorCB);
    });
}

export function showError(errorObj, callback) {
    if (errorObj.type === ERROR) callback(errorObj.error)
    else {
        let type = errorObj.type;
        let msg;

        if (type === SERVER_ERROR) msg = SERVER_MSG;
        else if (type === NETWORK_ERROR) msg = NETWORK_MSG;

        Alert.alert('Something went wrong!', msg, [{text: 'Ok', style: 'cancel'}]);
        if (callback) callback();
    }
}