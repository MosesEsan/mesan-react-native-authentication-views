/**
 * Author: Moses Adekunle Esan
 * Date: 8/2/16.
 * Project: React Native Authentication Views
 */

import React, { Component } from 'react';
import { StyleSheet, Platform } from 'react-native';

import { Router, Scene, Reducer } from 'react-native-router-flux';

import {HomeScreen, WelcomeScreen, RegisterScreen, LoginScreen, PasswordScreen, VerifyScreen, VerificationCode} from "./scenes"

const reducerCreate = params => {
    const defaultReducer = new Reducer(params);
    return (state, action) => {
        return defaultReducer(state, action);
    };
};

const getSceneStyle = () => ({
    backgroundColor: "#F5FCFF",
    shadowOpacity: 1,
    shadowRadius: 3,
});


const styles = StyleSheet.create({
    navigationBarStyle: {
        backgroundColor: '#CB1B22',
        ...Platform.select({
            android: {
                borderBottomWidth: 0
            },
        }),
    },

    titleStyle: {
        color: "#FFFFFF",
        fontWeight: "500",
        fontSize: 17,
        ...Platform.select({
            ios: {},
            android: {
                alignSelf: 'flex-start',
                textAlign: 'left',
                paddingLeft: 15
            },
        }),
    }
});

export default class extends Component {
    render() {
        return (
            <Router createReducer={reducerCreate} getSceneStyle={getSceneStyle}>
                <Scene key="root" navigationBarStyle={styles.navigationBarStyle} titleStyle={styles.titleStyle} backButtonImage={require('./images/back.png')}>
                    <Scene key="Home" component={HomeScreen} title="Home" initial={true}/>
                    <Scene key="Auth" hideNavBar={true}>
                        <Scene key="Welcome" component={WelcomeScreen} title="Welcome" initial={true}/>
                        <Scene key="Login" component={LoginScreen} title="Login"/>
                        <Scene key="Password" component={PasswordScreen} title="Password"/>
                        <Scene key="Register" component={RegisterScreen} title="Register"/>
                        <Scene key="Verify" component={VerifyScreen} title="Verify"/>
                        <Scene key="VerificationCode" component={VerificationCode} title="VerificationCode"/>
                    </Scene>
                </Scene>
            </Router>
        )
    }
}
