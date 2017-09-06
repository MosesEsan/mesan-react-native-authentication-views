/**
 * Author: Moses Adekunle Esan
 * Date: 8/15/16.
 * Project: React Native Authentication Views
 * Description: Welcome Page
 */

import React, {Component} from 'react';
var {View, Text, Image} = require('react-native');

import {Actions} from 'react-native-router-flux';

import {Button} from '../index';

import styles from '../../styles/index'


export default class Welcome extends Component {
    render() {
        var backgroundImage = require('../../images/bg.jpg');

        return (
            <View style={styles.container}>
                <View style={[styles.wrapper]}>

                    <Image source={backgroundImage} style={[styles.bgImage]}/>
                    <View style={[styles.overlay]}></View>

                    <View style={[styles.logo]}>
                        <Text style={styles.logoText}>YOUR LOGO GOES HERE</Text>
                    </View>

                    <View style={[styles.bottom]}>

                        <View style={[styles.btnContainer]}>
                            <Button onPress={Actions.Login} btnText={"SIGN IN"} style={{borderRightWidth: 1, borderRightColor: "#d73840"}}/>
                            <Button onPress={Actions.Register} btnText={"SIGN UP"}/>
                        </View>

                        <View style={[styles.btnContainer,
                            {borderTopWidth: 1, borderTopColor: "#d73840"}]}>
                            <Button onPress={this.props.registerWithFacebook} btnText={"SIGN IN WITH FACEBOOK"} social/>
                        </View>
                    </View>

                </View>
            </View>
        );
    }
}
