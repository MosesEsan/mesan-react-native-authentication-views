/**
 * Author: Moses Adekunle Esan
 * Date: 8/2/16.
 * Project: React Native Authentication Views
 */

import React, { Component } from 'react';

import { Text, Platform,  View, Dimensions, TextInput,TouchableHighlight, LayoutAnimation, UIManager, Alert, StatusBar } from 'react-native';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as ReduxActions from '../../app/actions';
import {Actions } from 'react-native-router-flux';

var {width: windowWidth, height:windowHeight} = Dimensions.get('window');
var NAVBAR_HEIGHT = (Platform.OS === 'ios') ? 64 : 54;

class Home extends Component {
    componentDidMount() {
        if (Platform.OS === "ios") StatusBar.setBarStyle('light-content', true);
        UIManager.setLayoutAnimationEnabledExperimental &&   UIManager.setLayoutAnimationEnabledExperimental(true);

        //Check login status
        this.props.checkLoginStatus();
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
                            <TouchableHighlight onPress={Actions.logout}
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
}



// The function is used to take the Redux Store, then take some data from it,
// and insert it into the props for our component.
function mapStateToProps(state, props) {
    return {
        loggedIn: state.userReducer.loggedIn
    };
}

// Doing this merges our actions into the component’s props,
// while wrapping them in dispatch() so that they immediately dispatch an Action.
function mapDispatchToProps(dispatch) {
    return bindActionCreators(ReduxActions, dispatch);
}

// ‘mapStateToProps’ and ‘mapDispatchToProps’ are two functions bound with ‘connect’ to the component: this makes Redux know that this component needs to be passed a piece of the state (everything under ‘userReducers’) and all the actions available in the app.
// Just by doing this, we will have access to the login action and to the state of the app

//Connect everything
export default connect(mapStateToProps, mapDispatchToProps)(Home);

const styles = require('../styles/login');