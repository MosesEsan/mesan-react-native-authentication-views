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
    getInitialState() {
        return {
            hide: false,
            moveAnim: new Animated.ValueXY(),
            active: true,
            index: 1,
            navTop: -NAVBAR_HEIGHT,
            searchTop: -NAVBAR_HEIGHT* 2,
            title: "Jean",
            right: false,
            searchTerm: '' ,
            searchBox: true,
            rightType: "text"
        }
    },

    componentDidMount() {
        _this = this;
    },


    render() {
        UIManager.setLayoutAnimationEnabledExperimental &&   UIManager.setLayoutAnimationEnabledExperimental(true);
        return (
            <Animated.View
                style={[styles.header, {transform: this.state.moveAnim.getTranslateTransform()}, (this.props.color) ? {backgroundColor: this.props.color} : null]}>

                <View style={{marginTop: (Platform.OS === 'ios') ? 20 : 5, height: 44, overflow: "hidden", position: "relative"}}>

                    <View style={{flex: 1, paddingLeft:10, flexDirection: "row"}}>
                        <TouchableOpacity style={[styles.backBtn]}
                                          onPress={this.props.leftBtn}>
                            <Image source={this.props.leftBtnImage} style={[styles.backButtonImage]}/>
                        </TouchableOpacity>
                        {
                            (this.props.rightBtn !== null) ?

                                <TouchableOpacity style={[styles.forgotBtn]}
                                                  onPress={this.props.rightBtn}>
                                    <Text style={[styles.forgotTxt]}>FORGOT PASSWORD?</Text>
                                </TouchableOpacity>
                                :
                                null
                        }
                    </View>

                </View>
            </Animated.View>
        )
    },

    showNavbar(){
        Animated.parallel([
            Animated.spring( this.state.moveAnim, {toValue: {x: 0, y:0}} )
        ]).start();
    },

    hideNavbar(){
        Animated.parallel([
            Animated.spring( this.state.moveAnim, {toValue: {x: 0, y:-(NAVBAR_HEIGHT)}} )
        ]).start();
    },

    leftNavBtn(){
        this.setState({title:"", navTop: -(NAVBAR_HEIGHT)});
        this._leftCallback();
    },

    rightNavBtn(){
        var _this = this;
        this._rightCallback();
        _this.setState({title: "", navTop: -(NAVBAR_HEIGHT)});
    },


    clampText(text){
        if (text.length > 20) text =  text.substring(0, 15)+"...";

        return text;
    },

});

module.exports = NavBar;


