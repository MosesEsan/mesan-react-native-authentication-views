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
    NETWORK_FAILURE } from "../actions/action_types"

var NETWORK_FAILURE_MSG = "No Internet Connection. Please check your network connection.";

var React = require('react-native');
var { Alert, AsyncStorage } = React;
import { Actions } from 'react-native-router-flux';

let userState = {loggingIn: false, loggedIn: false, registering: false};

const userReducer = (state = userState, action) => {
    switch (action.type) {

        // REGISTER
        case REGISTERING: //show activity indicator
            state = Object.assign({}, state, {registering: true});
            return state;

        case REGISTRATION_SUCCESS:
            state = Object.assign({}, state, {registering: false});
            return state;

        case REGISTRATION_FAILED:
            state = Object.assign({}, state, {registering: false, loggedIn: false});
            return state;

        // LOGIN
        case LOGGING_IN: //show activity indicator
            state = Object.assign({}, state, {loggingIn: true});
            return state;

        case LOGIN_SUCCESS:
            state = Object.assign({}, state, {loggingIn: false, loggedIn: true});
            AsyncStorage.setItem('token', action.token); //save the token
            AsyncStorage.setItem('verified', action.verified); //save the verified flag
            return state;

        case LOGIN_FAILED:
            state = Object.assign({}, state, {loggingIn: false, loggedIn: false});
            return state;

        case LOGGED_IN:
            state = Object.assign({}, state, {loggedIn: true});
            return state;

        case LOGGED_OUT:
            AsyncStorage.removeItem('token'); //clear token on device
            AsyncStorage.removeItem('verified'); //clear completed on device
            state = Object.assign({}, state, {loggedIn: false});
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