/**
 * Author: Moses Adekunle Esan
 * Date: 8/23/16.
 * Project: React Native Authentication Views
 * Description: Verify Page
 */

import React, { Component } from 'react';
import {
    Text, Platform,
    View, Dimensions,
    TextInput,TouchableHighlight,
    LayoutAnimation, UIManager,
    Alert, StatusBar
} from 'react-native';

import { Router, Scene, Actions} from 'react-native-router-flux';

import LoginModel from '../../model/login-model.js';
import NavBar from '../navbar/navbar.js'
const BusyIndicator = require('react-native-busy-indicator');
const loaderHandler = require('react-native-busy-indicator/LoaderHandler');


var {width: windowWidth, height:windowHeight} = Dimensions.get('window');
var _this;

export default class Password extends Component {

    constructor(props){
        super(props)
        this.state = {
            data: {one: "", two: "", three: "", four: "", five: ""}
        }
    }

    componentDidMount() {
        UIManager.setLayoutAnimationEnabledExperimental &&   UIManager.setLayoutAnimationEnabledExperimental(true);
        if (Platform.OS === "ios") StatusBar.setBarStyle('default', true);

        var data = this.state.data;
        data["email"] = this.props.email;
        this.setState({data: data, email: this.props.email})
    }

    render() {
        _this = this;
        return (
            <View style={{position: "relative"}}>
                <View style={[styles.loginContainer]}>
                    <NavBar leftBtnImage={require('../../images/left-arrow-filled.png')} leftBtn={() => Actions.pop()} rightBtn={null}/>
                    <View style={[styles.login]}>


                        <View style={[styles.header]}>
                            <Text style={styles.headerText2}>VERIFICATION CODE</Text>
                            <Text style={styles.subText}>
                                Enter your verification code.
                            </Text>
                        </View>


                        <View style={[styles.loginWrapper]}>


                            <View style={{ flexDirection: "row"}}>

                                <View style={[{borderWidth:1, borderColor: "#9EA0A2", width: 50, marginLeft: 0, borderRadius: 3}]}>
                                    <View style={[]}>
                                        <TextInput style={[styles.codeInput]}
                                                   value={this.state.data.one}
                                                   onChangeText={(text) => this.onChangeText("one", text)}
                                                   maxLength={1}
                                                   autoFocus ={false}/>
                                    </View>
                                </View>

                                <View style={[{borderWidth:1, borderColor: "#9EA0A2", width: 50, marginLeft: 5, borderRadius: 3}]}>
                                    <View style={[]}>
                                        <TextInput style={[styles.codeInput]}
                                                   value={this.state.data.two}
                                                   onChangeText={(text) => this.onChangeText("two", text)}
                                                   maxLength={1}
                                                   autoFocus ={false}/>
                                    </View>
                                </View>
                                <View style={[{borderWidth:1, borderColor: "#9EA0A2", width: 50, marginLeft: 5, borderRadius: 3}]}>
                                    <View style={[]}>
                                        <TextInput style={[styles.codeInput]}
                                                   value={this.state.data.three}
                                                   onChangeText={(text) => this.onChangeText("three", text)}
                                                   maxLength={1}
                                                   autoFocus ={false}/>
                                    </View>
                                </View>
                                <View style={[{borderWidth:1, borderColor: "#9EA0A2", width: 50, marginLeft: 5, borderRadius: 3}]}>
                                    <View style={[]}>
                                        <TextInput style={[styles.codeInput]}
                                                   value={this.state.data.four}
                                                   onChangeText={(text) => this.onChangeText("four", text)}
                                                   maxLength={1}
                                                   autoFocus ={false}/>
                                    </View>
                                </View>
                                <View style={[{borderWidth:1, borderColor: "#9EA0A2", width: 50, marginLeft: 5, borderRadius: 3}]}>
                                    <View style={[]}>
                                        <TextInput style={[styles.codeInput]}
                                                   value={this.state.data.five}
                                                   onChangeText={(text) => this.onChangeText("five", text)}
                                                   maxLength={1}
                                                   autoFocus ={false}/>
                                    </View>
                                </View>
                            </View>
                            <TouchableHighlight onPress={this.verifyCode}
                                                underlayColor={"rgba(129, 29, 55, .8)"}
                                                style={[styles.logInButton, {width: windowWidth - 50, borderRadius: 2, marginTop: 25}]}>
                                <Text style={[styles.buttonText]}>Verify</Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                    <BusyIndicator />

                </View>
            </View>
        );
    }

    onChangeText(key, value){
        var data = _this.state.data;
        data[key] = value;
        _this.setState({data: data})
    }


    verifyCode(){
        var data = _this.state.data;
        var error = {};
        var errCount = 0;

        if(data["one"].length === 0) errCount++;
        if(data["two"].length === 0) errCount++;
        if(data["three"].length === 0) errCount++;
        if(data["four"].length === 0) errCount++;
        if(data["five"].length === 0) errCount++;

        _this.setState({error: error});

        if (errCount === 0){
            let code = data["one"]+data["two"]+data["three"]+data["four"]+data["five"];
            loaderHandler.showLoader("Please Wait..."); // Show indicator with message
            LoginModel.verifyCode(code, function(success, message, error){
               loaderHandler.hideLoader();  // Hide the loader
               if(success) {
                   Alert.alert(
                       'Verification Successfully.',
                       message,
                       [
                           {
                               text: 'Continue', style: 'cancel', onPress: () => {
                               Actions.pop()
                           }
                           },
                       ]
                   )
               }else {
                   Alert.alert(
                       'Verification Failed!',
                       error,
                       [
                           {
                               text: 'Continue', style: 'cancel'
                           },
                       ]
                   )
                }
            });
        }
    }
}

const styles = require('../../styles/login');