/**
 * Author: Moses Adekunle Esan
 * Date: 8/2/16.
 * Project: React Native Authentication Views
 */

'use strict';

import React, {Component} from 'react';
import { Text, Platform,  View, Dimensions, ActionSheetIOS, TouchableHighlight, AsyncStorage,
   UIManager, Alert, StatusBar } from 'react-native';

import {connect} from 'react-redux';

import {Actions} from 'react-native-router-flux';

import {setStatus, logout} from '../actions/auth'; //Import your actions

// import {Button} from './index'; //Import your Button

// import styles from '../styles/index' //Import your styles

var {width: windowWidth, height:windowHeight} = Dimensions.get('window');
var NAVBAR_HEIGHT = (Platform.OS === 'ios') ? 64 : 54;


var BUTTONS = [
    "Log Out",
    'Cancel',
];

var DESTRUCTIVE_INDEX = 0;
var CANCEL_INDEX = 1;

class Home extends Component {
    componentDidMount() {
        if (Platform.OS === "ios") StatusBar.setBarStyle('light-content', true);
        UIManager.setLayoutAnimationEnabledExperimental &&   UIManager.setLayoutAnimationEnabledExperimental(true);


        var _this = this;
        var {navigate} = this.props.navigation;

        setTimeout(function () {
            // Check if token exist
            AsyncStorage.multiGet(['token', 'verified'], (err, stores) => {
                var data = {};
                stores.map((result, i, store) => {
                    let key = store[i][0];
                    let val = store[i][1];
                    data[key] = val;
                });

                if (data['token'] === null) navigate('Auth');
                else _this.props.setStatus(true);
            });
        }, 1000)
    }

    render() {
        return (
            <View style={{position: "relative", marginTop: NAVBAR_HEIGHT, flex:1}}>
                <View style={[styles.loginContainer]}>
                    <View style={[styles.login, {justifyContent: "center", marginTop: 0}]}>
                        <View style={[]}>

                            {
                                (this.props.loggedIn) &&
                                <Text style={{textAlign: "center", marginBottom: 10}}>YOU ARE LOGGED IN</Text>
                            }
                            <TouchableHighlight onPress={this.logout.bind(this)}
                                                underlayColor={"rgba(129, 29, 55, .8)"}
                                                style={[styles.logInButton, {width: windowWidth - 50, borderRadius: 2}]}>
                                <Text style={[styles.buttonText]}>LOG OUT</Text>
                            </TouchableHighlight>
                        </View>
                    </View>

                </View>
            </View>
        );
    }

    logout(){
        var _this = this;
        ActionSheetIOS.showActionSheetWithOptions({
                // title:"Log Out",
                message:"Are you sure you want to log out?",
                options: BUTTONS,
                destructiveButtonIndex: DESTRUCTIVE_INDEX,
                cancelButtonIndex: CANCEL_INDEX
            },
            (buttonIndex) => {
                if (buttonIndex === 0) {
                    _this.props.logout(() => {
                        alert("logged out")
                    });
                }
            });
    }
}

// The function is used to take the Redux Store, then take some data from it,
// and insert it into the props for our component.
function mapStateToProps(state, props) {
    return {
        loggedIn: state.userReducer.loggedIn
    };
}

//Connect everything
export default connect(mapStateToProps, {setStatus, logout})(Home);

const styles = require('../styles/login');