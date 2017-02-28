/**
 * Author: Moses Adekunle Esan
 * Date: 8/23/16.
 * Project: React Native Authentication Views
 * Description: Verify Page
 */

import React, { Component } from 'react';
import { Text, Platform, View, Dimensions, TextInput,TouchableOpacity, LayoutAnimation, UIManager, Alert, StatusBar } from 'react-native';

import NavBar from '../navbar/navbar.js'
var {width: windowWidth, height:windowHeight} = Dimensions.get('window');


import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as ReduxActions from '../../actions';
import { Actions } from 'react-native-router-flux';


class VerifyCode extends Component {

    constructor(props){
        super(props)
        this.state = {
            one: "",
            two: "",
            three: "",
            four: "",
            five: ""
        }
    }

    componentDidMount() {
        UIManager.setLayoutAnimationEnabledExperimental &&   UIManager.setLayoutAnimationEnabledExperimental(true);
        if (Platform.OS === "ios") StatusBar.setBarStyle('default', true);
    }

    render() {
        return (
            <View style={{position: "relative"}}>
                <View style={[styles.loginContainer]}>
                    <NavBar leftBtnImage={require('../../../images/left-arrow-filled.png')}
                             leftBtn={() => Actions.pop()} rightBtn={null}/>
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
                                                   value={this.state.one}
                                                   onChangeText={(text) => this.setState({"one" : text})}
                                                   maxLength={1}
                                                   autoFocus ={false}/>
                                    </View>
                                </View>

                                <View style={[{borderWidth:1, borderColor: "#9EA0A2", width: 50, marginLeft: 5, borderRadius: 3}]}>
                                    <View style={[]}>
                                        <TextInput style={[styles.codeInput]}
                                                   value={this.state.two}
                                                   onChangeText={(text) => this.setState({"two" : text})}
                                                   maxLength={1}
                                                   autoFocus ={false}/>
                                    </View>
                                </View>
                                <View style={[{borderWidth:1, borderColor: "#9EA0A2", width: 50, marginLeft: 5, borderRadius: 3}]}>
                                    <View style={[]}>
                                        <TextInput style={[styles.codeInput]}
                                                   value={this.state.three}
                                                   onChangeText={(text) => this.setState({"three" : text})}
                                                   maxLength={1}
                                                   autoFocus ={false}/>
                                    </View>
                                </View>
                                <View style={[{borderWidth:1, borderColor: "#9EA0A2", width: 50, marginLeft: 5, borderRadius: 3}]}>
                                    <View style={[]}>
                                        <TextInput style={[styles.codeInput]}
                                                   value={this.state.four}
                                                   onChangeText={(text) => this.setState({"four" : text})}
                                                   maxLength={1}
                                                   autoFocus ={false}/>
                                    </View>
                                </View>
                                <View style={[{borderWidth:1, borderColor: "#9EA0A2", width: 50, marginLeft: 5, borderRadius: 3}]}>
                                    <View style={[]}>
                                        <TextInput style={[styles.codeInput]}
                                                   value={this.state.five}
                                                   onChangeText={(text) => this.setState({"five" : text})}
                                                   maxLength={1}
                                                   autoFocus ={false}/>
                                    </View>
                                </View>
                            </View>
                            <TouchableOpacity onPress={this.verifyCode.bind(this)}
                                                style={[styles.logInButton, {width: windowWidth - 50, borderRadius: 2, marginTop: 25}]}>
                                <Text style={[styles.buttonText]}>Verify</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        );
    }


    verifyCode(){
        var error = {};
        var errCount = 0;

        if(this.state.one.length === 0) errCount++;
        if(this.state.two.length === 0) errCount++;
        if(this.state.three.length === 0) errCount++;
        if(this.state.four.length === 0) errCount++;
        if(this.state.five.length === 0) errCount++;

        this.setState({error: error});

        if (errCount === 0) {
            var code = this.state.one+this.state.two+this.state.three+this.state.four+this.state.five;
            // this.props.verifyCode(code);
            Alert.alert(
                'API Calls Disabled',
                "API calls have been disabled for this demo.",
                [
                    {text: 'Ok', style: 'cancel'}
                ]
            )
        }
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
export default connect(mapStateToProps, mapDispatchToProps)(VerifyCode);

const styles = require('../../styles/login');