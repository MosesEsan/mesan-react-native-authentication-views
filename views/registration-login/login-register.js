/**
 * Author: Moses Adekunle Esan
 * Date: 8/2/16.
 * Project: React Native Authentication Views
 * Description: Welcome Page
 */

import React, { Component } from 'react';
import {
    Text, Platform,
    View, Dimensions,
    TextInput,TouchableHighlight,
    LayoutAnimation, UIManager, Alert,
    Image, StatusBar
} from 'react-native';

import { Router, Scene, Actions} from 'react-native-router-flux';

var {width: windowWidth, height:windowHeight} = Dimensions.get('window');
var _this;

import LoginModel from '../../model/login-model.js';
import NavBar from '../navbar/navbar.js'
import Login from './login.js'
import Password from './password.js'
import Register from './register.js'

export default class Welcome extends Component {

    constructor(props){
        super(props)
        this.state = {
        }
    }

    componentDidMount() {
        UIManager.setLayoutAnimationEnabledExperimental &&   UIManager.setLayoutAnimationEnabledExperimental(true);
        if (Platform.OS === "ios") StatusBar.setBarStyle('default', true);
    }

    render() {
        _this = this;
        var backgroundImage = require('../../images/bg.jpg');

        return (
            <View style={{position: "relative"}}>
                <View style={[styles.container]}>

                    <View style={[styles.wrapper]}>

                        <Image source={backgroundImage} style={[styles.bgImage]}/>
                        <View style={[styles.overlay]}></View>

                        <View style={[styles.logo]}>
                            <Text style={styles.logoText}>YOUR LOGO GOES HERE</Text>
                        </View>
                    </View>

                    <View style={[styles.bottom]}>

                        <View style={styles.btnContainer}>
                                <TouchableHighlight onPress={() => Actions.Login({close: this.props.onLogin})}
                                                underlayColor={"rgba(129, 29, 55, .8)"}
                                                style={[styles.logInButton, {borderRightWidth:1, borderRightColor:"#d73840"}, (this.state.verification) ? styles.resendButton : null]}>
                                <Text style={styles.buttonText}>SIGN IN</Text>
                            </TouchableHighlight>
                            <TouchableHighlight onPress={() => Actions.Register({})}
                                                underlayColor={"rgba(129, 29, 55, .8)"}
                                                style={[styles.logInButton, (this.state.verification) ? styles.resendButton : null]}>
                                <Text style={styles.buttonText}>SIGN UP</Text>
                            </TouchableHighlight>
                        </View>
                        <View style={[styles.btnContainer, {borderTopWidth:1, borderTopColor:"#d73840"}]}>
                            <TouchableHighlight onPress={this.logInWithFacebook}
                                                underlayColor={"rgba(129, 29, 55, .8)"}
                                                style={[styles.socialButton, (this.state.verification) ? styles.resendButton : null]}>
                                <Text style={styles.buttonText}>SIGN IN WITH FACEBOOK</Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                </View>
            </View>
        );
    }

    logInWithFacebook(){
        Alert.alert(
            'Coming Soon',
            'This functionality is currently in development.',
            [
                {text: 'Ok', style: 'cancel'}
            ]
        );
    }
}

export default class LoginRegister extends Component {

    constructor(props){
        super(props)
        this.state = {
        }
    }

    render() {
        return (
            <Router>
                <Scene key="root" hideNavBar={true}>
                    <Scene key="pageOne" component={Welcome} title="PageOne" initial={true} onLogin={this.props.onLogin}/>
                    <Scene key="Login" component={Login} title="PageTwo"/>
                    <Scene key="Password" component={Password} title="PageThree"/>
                    <Scene key="Register" component={Register} title="PageFour"/>
                </Scene>
            </Router>
        )
    }
}

const styles = require('../../styles/login');