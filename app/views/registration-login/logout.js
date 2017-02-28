/**
 * Author: Moses Adekunle Esan
 * Date: 8/5/16.
 * Project: React Native Authentication Views
 * Description: Forgot Password Page
 */

import React, { Component } from 'react';
import { Text, View, Dimensions, TextInput,TouchableHighlight } from 'react-native';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as ReduxActions from '../../actions';
import { Actions } from 'react-native-router-flux';

var {width: windowWidth, height:windowHeight} = Dimensions.get('window');

class Logout extends Component {

    render() {
        return (
            <View style={{position: "relative"}}>
                <View style={[styles.loginContainer]}>
                    <View style={[styles.login, {justifyContent: "center", marginTop: 0}]}>
                        <View style={[styles.loginWrapper, {height: 190, marginTop: 0}]}>

                            <View style={[styles.header, {marginTop: 0}]}>
                                <Text style={[styles.subText, {fontWeight: "600", fontSize: 15, textAlign:"left"}]}>Are you sure you want to log out?</Text>
                            </View>


                            <View style={{position: "absolute", bottom: 0, left: 0, right: 0}}>
                                <TouchableHighlight onPress={this.props.logout}
                                                    underlayColor={"rgba(129, 29, 55, .8)"}
                                                    style={[styles.logInButton, {width: windowWidth - 50, borderRadius: 2, marginTop: 15}]}>
                                    <Text style={[styles.buttonText]}>LOG OUT</Text>
                                </TouchableHighlight>
                                <TouchableHighlight onPress={() => Actions.pop()}
                                                    underlayColor={"rgba(129, 29, 55, .8)"}
                                                    style={[styles.logInButton, {width: windowWidth - 50, borderRadius: 2, marginTop: 15, backgroundColor: "transparent", borderColor: "#D0CCC8", borderWidth: 1}]}>
                                    <Text style={[styles.buttonText, {color: "#535458", fontWeight: "600",}]}>CANCEL</Text>
                                </TouchableHighlight>
                            </View>
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
export default connect(mapStateToProps, mapDispatchToProps)(Logout);
const styles = require('../../styles/login');