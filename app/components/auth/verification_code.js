/**
 * Author: Moses Adekunle Esan
 * Date: 8/23/16.
 * Project: React Native Authentication Views
 * Description: Verify Page
 */

import React, {Component} from 'react';
import {
    Text,
    Platform,
    View,
    Dimensions,
    TextInput,
    TouchableOpacity,
    LayoutAnimation,
    UIManager,
    Alert,
    StatusBar
} from 'react-native';

import NavBar from '../navbar/navbar.js'
var {width: windowWidth, height: windowHeight} = Dimensions.get('window');

import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import {verifyCode, sendVerificationCode} from '../../actions/auth'; //Import your actions
import {ButtonWithLoader} from '../index';

class VerifyCodeInput extends Component {

    render() {
        return (
            <View style={[styles.verificationCodeInput]}>

                <TextInput style={[styles.codeInput]}
                           value={this.props.value}
                           onChangeText={this.props.onChangeText}
                           maxLength={1}
                           keyboardType='phone-pad'
                           autoFocus={false}/>
            </View>
        )
    }
}
class VerifyCode extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isLoading: false,
            one: "5",
            two: "2",
            three: "1",
            four: "8",
            error: {general: ""}
        }
    }

    componentDidMount() {
        UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
        if (Platform.OS === "ios") StatusBar.setBarStyle('default', true);
    }

    render() {
        return (
            <View style={{position: "relative"}}>
                <View style={[styles.loginContainer]}>
                    <NavBar leftBtnImage={require('../../images/left-arrow-filled.png')}
                            leftBtn={() => Actions.pop()} rightBtn={null}/>
                    <View style={[styles.login]}>


                        <View style={[styles.header]}>
                            <Text style={styles.headerText2}>VERIFICATION CODE</Text>
                            <Text style={styles.subText}>
                                {this.props.message}
                            </Text>
                        </View>


                        <View style={[styles.loginWrapper]}>
                            <View style={[styles.textInputContainer]}>

                            <View style={{flexDirection: "row", height: 50}}>
                                <VerifyCodeInput value={this.state.one}
                                                 onChangeText={(text) => this.setState({"one": text})}/>
                                <VerifyCodeInput value={this.state.two}
                                                 onChangeText={(text) => this.setState({"two": text})}/>
                                <VerifyCodeInput value={this.state.three}
                                                 onChangeText={(text) => this.setState({"three": text})}/>
                                <VerifyCodeInput value={this.state.four}
                                                 onChangeText={(text) => this.setState({"four": text})}/>
                            </View>

                                <Text style={[{color:"red",
                                    marginTop: 5,
                                    marginBottom: 5,
                                    fontSize: 12}]}>{this.state.error["general"]}</Text>
                            </View>

                            <ButtonWithLoader
                                onPress={(!this.state.isLoading) ? this.verifyCode.bind(this) : null}
                                btnText={"Verify"}
                                showLoader={(this.state.isLoading) ? true : false}
                                style={{width: windowWidth - 50, borderRadius: 2}}
                            />
                            <Text onPress={this.resendVerification.bind(this)}
                                  style={{marginTop: 25, fontWeight:"600", fontSize:16, textAlign:"center", color:"#CB1B22"}}>
                                Resend Code</Text>

                        </View>
                    </View>
                </View>
            </View>
        );
    }

    resendVerification() {
        var data = {
            country_code: this.props.country_code,
            phone_number: this.props.phone_number
        }
        
        this.props.sendVerificationCode(data, (message) => {alert(message)}, this.errorCB.bind(this));
    }

    verifyCode() {
        var error = {};
        var errCount = 0;

        if (this.state.one.length === 0) errCount++;
        if (this.state.two.length === 0) errCount++;
        if (this.state.three.length === 0) errCount++;
        if (this.state.four.length === 0) errCount++;

        this.setState({error: error});

        if (errCount === 0) {
            var verification_code = this.state.one + this.state.two + this.state.three + this.state.four;
            var data = {
                verification_code: verification_code,
                country_code: this.props.country_code,
                phone_number: this.props.phone_number,
                token: this.props.token
            }
            this.setState({isLoading: true});
            this.props.verifyCode(data, this.successCB.bind(this), this.errorCB.bind(this));
        }
    }

    successCB(message) {
        this.setState({isLoading: false});
        Actions.Home();
    }

    errorCB(err) {
        this.setState({isLoading: false});
        var error = this.state.error;

        if (typeof err === "string") error["general"] = err;

        this.setState({error: error});
    }
}

//Connect everything
export default connect(null, {verifyCode, sendVerificationCode})(VerifyCode);

const styles = require('../../styles/login');