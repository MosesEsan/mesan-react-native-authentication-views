/**
 * Author: Moses Adekunle Esan
 * Date: 8/5/16.
 * Project: React Native Authentication Views
 * Description: Forgot Password Page
 */

import React, { Component } from 'react';
import {
    Text, Platform,
    View, Dimensions,
    TextInput, TouchableOpacity, ActivityIndicator,
    LayoutAnimation, UIManager,
    Alert, StatusBar
} from 'react-native';


import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as ReduxActions from '../../actions';
import { Actions } from 'react-native-router-flux';
import NavBar from '../navbar/navbar.js'

var {width: windowWidth, height:windowHeight} = Dimensions.get('window');

class RecoverPassword extends Component {

    constructor(props){
        super(props)
        this.state = {
            email: "mosesesan@eandmdigital.com",
            error:  ""
        }
    }

    render() {
        return (
            <View style={{position: "relative"}}>
                <View style={[styles.loginContainer]}>
                    <NavBar leftBtnImage={require('../../../images/left-arrow-filled.png')} leftBtn={() => Actions.pop()} rightBtn={null}/>
                    <View style={[styles.login]}>


                        <View style={[styles.header]}>
                            <Text style={styles.headerText2}>FORGOT YOUR PASSWORD?</Text>
                            <Text style={styles.subText}>Enter your email and you will get instructions to reset your password</Text>
                        </View>


                        <View style={[styles.loginWrapper]}>

                            <View style={[styles.textInputContainer]}>
                                <View style={[styles.textInputWrapper]}>
                                    <TextInput style={[styles.textInput]}
                                               value={this.state.email}
                                               placeholder={"Email Address"}
                                               onChangeText={(text) => this.setState({"email" : text})}
                                               autoFocus ={false}/>
                                </View>
                                <Text style={{color: "#d3222b", fontSize: 11}}>
                                    {this.state.error}
                                </Text>

                            </View>
                            <TouchableOpacity onPress={this.recoverPassword.bind(this)}
                                                underlayColor={"rgba(129, 29, 55, .8)"}
                                                style={[styles.logInButton, {width: windowWidth - 50, borderRadius: 2, marginTop: 15}]}>
                                <Text style={[styles.buttonText]}>SUBMIT</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                </View>
            </View>
        );
    }

    recoverPassword(){
        var error = "";
        var errCount = 0;

        if(this.state.email.length === 0) {
            error = "Your email is required!";
            errCount++;
        }

        this.setState({error: error});

        if (errCount === 0) {
            Alert.alert(
                'API Calls Disabled',
                "API calls have been disabled for this demo.",
                [
                    {text: 'Ok', style: 'cancel'}
                ]
            )

            // this.props.recoverPassword(this.state.email);
        }
    }
}


// The function is used to take the Redux Store, then take some data from it,
// and insert it into the props for our component.
function mapStateToProps(state, props) {
    return {
        processing: state.userReducer.processing
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
export default connect(mapStateToProps, mapDispatchToProps)(RecoverPassword);


const styles = require('../../styles/login');