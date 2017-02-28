/**
 * Author: Moses Adekunle Esan
 * Date: 8/15/16.
 * Project: React Native Authentication Views
 * Description: Welcome Page
 */

import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as ReduxActions from '../../actions';
import { Actions } from 'react-native-router-flux';

class Welcome extends Component {
    render() {
        var backgroundImage = require('../../../images/bg.jpg');

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
                            <TouchableOpacity onPress={() => Actions.Login()}
                                                underlayColor={"rgba(129, 29, 55, .8)"}
                                                style={[styles.logInButton, {borderRightWidth:1, borderRightColor:"#d73840"}]}>
                                <Text style={styles.buttonText}>SIGN IN</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => Actions.Register({})}
                                                underlayColor={"rgba(129, 29, 55, .8)"}
                                                style={[styles.logInButton]}>
                                <Text style={styles.buttonText}>SIGN UP</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={[styles.btnContainer, {borderTopWidth:1, borderTopColor:"#d73840"}]}>
                            <TouchableOpacity onPress={this.props.registerWithFacebook}
                                                underlayColor={"rgba(129, 29, 55, .8)"}
                                                style={[styles.socialButton]}>
                                <Text style={styles.buttonText}>SIGN IN WITH FACEBOOK</Text>
                            </TouchableOpacity>
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
    return {};
}

// Doing this merges our actions into the component’s props,
// while wrapping them in dispatch() so that they immediately dispatch an Action.
function mapDispatchToProps(dispatch) {
    return bindActionCreators(ReduxActions, dispatch);
}

// ‘mapStateToProps’ and ‘mapDispatchToProps’ are two functions bound with ‘connect’ to the component: this makes Redux know that this component needs to be passed a piece of the state (everything under ‘userReducers’) and all the actions available in the app.
// Just by doing this, we will have access to the login action and to the state of the app


//Connect everything
export default connect(mapStateToProps, mapDispatchToProps)(Welcome);

const styles = require('../../styles/login');