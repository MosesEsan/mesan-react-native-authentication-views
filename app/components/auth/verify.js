/**
 * Author: Moses Adekunle Esan
 * Date: 8/23/16.
 * Project: React Native Authentication Views
 * Description: Verify Page
 */

import React, { Component } from 'react';
import { Text, Platform, View, Dimensions, UIManager, Alert, StatusBar } from 'react-native';

import {connect} from 'react-redux';
import { Actions } from 'react-native-router-flux';

import { Button, AuthTextInput, PhoneTextInput } from '../index';
import NavBar from '../navbar/navbar.js'

import {sendEmailVerification, sendVerificationCode} from '../../actions/auth'; //Import your actions
import styles from '../../styles/login'

import PhoneInput from 'react-native-phone-input'
// import PhoneInput from 'react-native-phone-input'


var {width: windowWidth, height:windowHeight} = Dimensions.get('window');
class Verify extends Component {

    constructor(props){
        super(props)
        this.state = {
            email: "",
            phone_number: "3476990472",
            error: {email: "", phone_number: ""}
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
                    <NavBar leftBtn={null} rightBtn={null}/>
                    <View style={[styles.login]}>


                        <View style={[styles.header]}>
                            <Text style={styles.headerText2}>VERIFY YOUR ACCOUNT</Text>
                            <Text style={styles.subText}>
                                It's easy to verify your account, just select your preferred verification method.
                            </Text>
                        </View>


                        <View style={[styles.loginWrapper]}>
                            <View style={{flexDirection:"row"}}>
                                <PhoneInput ref='phone'
                                            style={{
                                                width: 90,
                                                height: 35,
                                                borderBottomWidth: .5,
                                                borderColor: "#ccc"}}
                                            textProps={{placeholder: "Phone Number", editable: false, }}/>
                                <PhoneTextInput
                                    onChangeText={(text) => this.setState({phone_number: text})}
                                    placeholder={"Phone Number"}
                                    autoFocus={false}
                                    value={this.state.phone_number}
                                    error={this.state.error['phone_number']}
                                    secureTextEntry={false}
                                />
                            </View>
                            {
                                (this.state.error["phone_number"].length > 0 ) &&
                                <Text style={[{color:"red",
                                    marginTop: 5,
                                    marginBottom: 5,
                                    fontSize: 12}]}>{this.state.error["phone_number"]}</Text>
                            }



                            {/*<Button onPress={this.sendEmailVerification.bind(this)}*/}
                                    {/*btnText={"Send Email"}*/}
                                    {/*style={{width: windowWidth - 50, borderRadius: 2, marginTop: 15}}/>*/}

                            <Button onPress={this.sendSMSVerification.bind(this)}
                                    btnText={"Request Code"}
                                    style={{width: windowWidth - 50, borderRadius: 2, marginTop: 15}}/>
                        </View>
                    </View>
                </View>
            </View>
        );
    }

    sendEmailVerification(){
        var state = this.state;
        var error = state.error;
        var errCount = 0;

        if (state.email.length <= 0) errCount++; //check email first
        error["email"] = (state.email.length <= 0) ? "Your email is required!" : "";

        error["phone_number"] = "";

        this.setState({error: error});

        if (errCount <= 0) {
            var data = {email:state.email}
            // this.props.sendEmailVerification(data, this.successCB.bind(this), this.errorCB.bind(this));

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
        var state = this.state;
        var error = state.error;
        var errCount = 0;

        // const {navigate} = this.props.navigation;
        // navigate('VerificationCode')
        var country_code = this.refs.phone.getValue();
        Actions.VerificationCode({
            country_code: country_code,phone_number: state.phone_number,
            message:"We have sent you an SMS with a code to 3476990472. To complete your registration, please enter the activation code."})



        //
        // if (state.phone_number.length <= 0) errCount++;
        // error["phone_number"] = (state.phone_number.length <= 0) ? "Your phone number is required!" : "";
        //
        // error["email"] = "";
        //
        // this.setState({error: error});
        //
        // if (errCount === 0) {
        //     var country_code = this.refs.phone.getValue();
        //     var data = {country_code: country_code,phone_number: state.phone_number}
        //     this.props.sendVerificationCode(data, this.successCB.bind(this), this.errorCB.bind(this));
        // }
    }

    successCB(message) {
        Actions.VerificationCode({
            country_code: country_code,
            phone_number: state.phone_number,
            message:message
        });
    }

    errorCB(err) {
        var error = this.state.error;
        console.log("<===>")
        console.log(err)
        console.log("<===>")
        // err = JSON.parse(err);

        if (err.phone_number) error["phone_number"] = err.phone_number;
        else error["phone_number"] = err;

        this.setState({error: error});
    }
}

//Connect everything
export default connect(null, {sendEmailVerification, sendVerificationCode})(Verify);
