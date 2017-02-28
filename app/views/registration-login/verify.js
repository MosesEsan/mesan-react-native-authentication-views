/**
 * Author: Moses Adekunle Esan
 * Date: 8/23/16.
 * Project: React Native Authentication Views
 * Description: Verify Page
 */

import React, { Component } from 'react';
import { Text, Platform, View, Dimensions, TextInput,TouchableHighlight, LayoutAnimation, UIManager, Alert, StatusBar } from 'react-native';


import NavBar from '../navbar/navbar.js'

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as ReduxActions from '../../actions';
import { Actions } from 'react-native-router-flux';


var {width: windowWidth, height:windowHeight} = Dimensions.get('window');
class Verify extends Component {

    constructor(props){
        super(props)
        this.state = {
            email: "",
            phone: "",
            error: {email: "", phone: ""}
        }
    }

    componentDidMount() {
        UIManager.setLayoutAnimationEnabledExperimental &&   UIManager.setLayoutAnimationEnabledExperimental(true);
        if (Platform.OS === "ios") StatusBar.setBarStyle('default', true);

        if (this.props.email !== undefined){
            this.setState({email: this.props.email})
        }
    }

    render() {
        return (
            <View style={{position: "relative"}}>
                <View style={[styles.loginContainer]}>
                    <NavBar leftBtnImage={require('../../../images/left-arrow-filled.png')} leftBtn={() => Actions.pop()} rightBtn={null}/>
                    <View style={[styles.login]}>


                        <View style={[styles.header]}>
                            <Text style={styles.headerText2}>VERIFY YOUR ACCOUNT</Text>
                            <Text style={styles.subText}>
                                It's easy to verify your account, just select your preferred verification method.
                            </Text>
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
                                    {this.state.error["email"]}
                                </Text>
                            </View>

                            <View style={[styles.textInputContainer]}>
                                <View style={[styles.textInputWrapper]}>
                                    <TextInput style={[styles.textInput]}
                                               value={this.state.phone}
                                               placeholder={"Phone Number"}
                                               onChangeText={(text) => this.setState({"phone" : text})}
                                               autoFocus ={false}/>
                                </View>
                                <Text style={{color: "#d3222b", fontSize: 11}}>
                                    {this.state.error["phone"]}
                                </Text>
                            </View>
                            <TouchableHighlight onPress={this.sendEmailVerification.bind(this)}
                                                underlayColor={"rgba(129, 29, 55, .8)"}
                                                style={[styles.logInButton, {width: windowWidth - 50, borderRadius: 2, marginTop: 15}]}>
                                <Text style={[styles.buttonText]}>Send Email</Text>
                            </TouchableHighlight>
                            <TouchableHighlight onPress={this.sendSMSVerification.bind(this)}
                                                underlayColor={"rgba(129, 29, 55, .8)"}
                                                style={[styles.logInButton, {width: windowWidth - 50, borderRadius: 2, marginTop: 15}]}>
                                <Text style={[styles.buttonText]}>Send SMS</Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                </View>
            </View>
        );
    }

    sendEmailVerification(){
        var error = {email: ""};
        if(this.state.email.length === 0) {
            error["email"] = "Your email is required!";
            this.setState({error: error});
        }else{
            // this.props.sendEmailVerification(this.state.email);

            Alert.alert(
                'API Calls Disabled',
                "API calls have been disabled for this demo.",
                [
                    {text: 'Ok', style: 'cancel'}
                ]
            )
        }
    }

    sendSMSVerification(){
        var error = {phone: ""};
        if(this.state.phone.length === 0) {
            error["phone"] = "Your phone number is required!";
            this.setState({error: error});
        }else{
            // this.props.sendSMSVerification(this.state.phone);
            Actions.VerificationCode();
        }

    }
}

//
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
export default connect(mapStateToProps, mapDispatchToProps)(Verify);





const styles = require('../../styles/login');