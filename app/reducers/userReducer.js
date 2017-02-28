/**
 * Author: Moses Adekunle Esan
 * Date: 2/27/17. [US Format]
 * Project: React Native Authentication Views
 */

import {
    REGISTERING, REGISTRATION_SUCCESS, REGISTRATION_FAILED,
    LOGGING_IN, LOGIN_SUCCESS, LOGIN_FAILED, LOGGED_IN, LOGGED_OUT,
    SMS_VERIFICATION_SENT, SMS_VERIFICATION_FAILED,
    EMAIL_VERIFICATION_SENT, EMAIL_VERIFICATION_FAILED,
    CODE_VERIFICATION_SUCCESS, CODE_VERIFICATION_FAILED,
    PASSWORD_REMINDER_SENT, PASSWORD_REMINDER_FAILED,
    NETWORK_FAILURE } from "../actions/"

var NETWORK_FAILURE_MSG = "No Internet Connection. Please check your network connection.";

var React = require('react-native');
var { Alert, AsyncStorage } = React;
import { Actions } from 'react-native-router-flux';

let userState = {loggingIn: false, loggedIn: false, registering: false};

const userReducer = (state = userState, action) => {
    switch (action.type) {
        case REGISTERING: //show activity indicator
            state = Object.assign({}, state, {registering: true});
            return state;
        case REGISTRATION_SUCCESS: //stop activity indicator and set logged in to false
            state = Object.assign({}, state, {registering: false});
            Actions.Verify({email: action.email});
            return state;
        case REGISTRATION_FAILED: //stop activity indicator and set logged in to false
            state = Object.assign({}, state, {registering: false});
            Alert.alert('Registration Failed', action.message, [{text: 'Ok', style: 'cancel'}]);
            return state;

        case LOGGING_IN: //show activity indicator
            state = Object.assign({}, state, {loggingIn: true});
            return state;
        case LOGIN_SUCCESS: //stop activity indicator and close login view
            state = Object.assign({}, state, {loggedIn: true, loggingIn: false, registering: false});
            AsyncStorage.setItem('token', action.token); //save the token
            Actions.pop();
            Actions.pop();
            return state;
        case LOGIN_FAILED: //stop activity indicator and set logged in to false
            state = Object.assign({}, state, {loggedIn: false, loggingIn: false, registering: false});
            Alert.alert('Login Failed', action.message, [{text: 'Ok', style: 'cancel'}]);
            return state;
        case LOGGED_IN:  // set logged in to true
            state = Object.assign({}, state, {loggedIn: true});
            return state;
        case LOGGED_OUT:  // set logged in to false
            AsyncStorage.removeItem('token'); //clear token on device
            state = Object.assign({}, state, {loggedIn: false});
            Actions.login();
            return state;

        //Verification
        case EMAIL_VERIFICATION_SENT:
            Alert.alert( 'Verification Sent', action.message, [{text: 'Continue', style: 'cancel', onPress: () => Actions.pop()}])
            return state;
        case EMAIL_VERIFICATION_FAILED:
            Alert.alert('Failed To Send Verification', action.message, [{text: 'Ok', style: 'cancel'}])
            return state;

        case SMS_VERIFICATION_SENT:
            Actions.VerificationCode();
            return state;
        case SMS_VERIFICATION_FAILED:
            Alert.alert('Failed To Send Verification', action.message, [{text: 'Ok', style: 'cancel'}])
            return state;

        case CODE_VERIFICATION_SUCCESS:
            Alert.alert( 'Verification Successfully.', action.message, [{text: 'Continue', style: 'cancel', onPress: () => Actions.pop()}])
            return state;
        case CODE_VERIFICATION_FAILED:
            Alert.alert('Verification Failed!', action.message, [{text: 'Ok', style: 'cancel'}])
            return state;

        //Password
        case PASSWORD_REMINDER_SENT:
            Alert.alert( 'Password Reminder Sent', action.message, [{text: 'Ok', style: 'cancel'}])
            Actions.pop();
            return state;
        case PASSWORD_REMINDER_FAILED:
            Alert.alert('Failed To Send Reminder', action.message, [{text: 'Ok', style: 'cancel'}])
            return state;


        case NETWORK_FAILURE:  // Network Failure
            state = Object.assign({}, state, {loggedIn: false, loggingIn: false, registering: false});
            Alert.alert('Network Error', NETWORK_FAILURE_MSG, [{text: 'Ok', style: 'cancel'}]);
            return state;

        default:
            return state;
    }
};

export default userReducer;

//Redux
// A reducer takes the current state tree and an action as arguments and returns the resulting state tree.
// Its important that reducers never mutate the state inplace, instead it should replace the keys that it needs to be changed.
// So if you look at all the cases, we never mutate state directly
// but instead use Object.assign which creates new object having the target fields replaced with the updated one.