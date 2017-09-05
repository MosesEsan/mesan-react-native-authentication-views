/**
 * Author: Moses Adekunle Esan
 * Date: 8/2/16.
 * Project: React Native Authentication Views
 */

import React, { Component } from 'react';

import { Router, Scene } from 'react-native-router-flux';

import Home from './components/home.js'
import Welcome from './components/auth/welcome.js'
import Login from './components/auth/login.js'
import Register from './components/auth/register.js'
import Password from './components/auth/password.js'
import Verify from './components/auth/verify.js'
import VerificationCode from './components/auth/verification_code.js'
import LogOut from './components/auth/logout.js'

const navigationBarStyle = {
    backgroundColor: '#CB1B22',
    overflow: "hidden",
    position: "absolute",
    top: 0, left: 0, right: 0
};

const titleStyle = {
    color: "#FFFFFF",
    fontWeight:"500",
    fontSize: 17, textAlign:"center",
};

export default class extends Component {
    render() {
        return (
            <Router>
                <Scene key="root" navigationBarStyle={navigationBarStyle} titleStyle={titleStyle}
                       backButtonImage={require('./images/back.png')}>
                    <Scene key="home" component={Home} title="Home" initial={true}/>

                    <Scene key="Auth" hideNavBar={true} direction="vertical"  title="Login" >
                        <Scene key="Welcome" component={Welcome} title="Welcome"
                               initial={true} onLogin={this.props.onLogin}
                               schema="modal" panHandlers={null}/>
                        <Scene key="Login" component={Login} title="Login"/>
                        <Scene key="Password" component={Password} title="Password"/>
                        <Scene key="Register" component={Register} title="Register"/>
                        <Scene key="Verify" component={Verify} title="Verify"/>
                        <Scene key="VerificationCode" component={VerificationCode} title="VerificationCode"/>
                    </Scene>
                    <Scene key="logout" component={LogOut} title="LogOut"direction="vertical" schema="modal" hideNavBar={true}/>
                </Scene>
            </Router>
        )
    }
}
