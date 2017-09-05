/**
 * Author: Moses Adekunle Esan
 * Date: 8/2/16.
 * Project: React Native Authentication Views
 * Description: Navigation bar
 */

import React, { Component } from 'react';
import {View, TouchableOpacity, Image, Animated, LayoutAnimation, UIManager,Platform, TouchableHighlight, Text,Dimensions, TextInput} from 'react-native';

const styles = require('../../styles/navbar');

var _this;

var NAVBAR_HEIGHT = (Platform.OS === 'ios') ? 64 : 54;

var {width: windowWidth, height:windowHeight} = Dimensions.get('window');
windowHeight = (Platform.OS === 'ios') ? windowHeight : windowHeight - 20;



var NavBar = React.createClass({
    componentDidMount() {
        _this = this;
    },
    render() {
        UIManager.setLayoutAnimationEnabledExperimental &&   UIManager.setLayoutAnimationEnabledExperimental(true);
        return (
            <Animated.View
                style={[styles.header, (this.props.color) ? {backgroundColor: this.props.color} : null]}>

                <View style={{marginTop: (Platform.OS === 'ios') ? 20 : 5, height: 44, overflow: "hidden", position: "relative"}}>

                    <View style={{flex: 1, paddingLeft:10, flexDirection: "row"}}>
                        {
                            (this.props.leftBtn !== null) &&
                                <TouchableOpacity style={[styles.backBtn]}
                                                  onPress={this.props.leftBtn}>
                                    <Image source={this.props.leftBtnImage} style={[styles.backButtonImage]}/>
                                </TouchableOpacity>
                        }
                        {
                            (this.props.rightBtn !== null) &&
                                <TouchableOpacity style={[styles.forgotBtn]}
                                                  onPress={this.props.rightBtn}>
                                    <Text style={[styles.forgotTxt]}>FORGOT PASSWORD?</Text>
                                </TouchableOpacity>
                        }
                    </View>

                </View>
            </Animated.View>
        )
    }
});

module.exports = NavBar;


