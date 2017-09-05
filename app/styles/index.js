/**
 * Created by mosesesan on 01/09/2017.
 */

'use strict';

import React, {StyleSheet, Dimensions, Platform} from 'react-native';


var {width: windowWidth, height:windowHeight} = Dimensions.get('window');


var NAVBAR_HEIGHT = (Platform.OS === 'ios') ? 64 : 54;

const BLACK = "#333333";

var styles = StyleSheet.create({
    logInButton:{
        height: (windowHeight/100) * 8.450704225352112,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:  "#CB1B22",
        width: windowWidth /2,
    },

    socialButton:{
        height: (windowHeight/100) * 8.450704225352112,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:  "#CB1B22",
        width: windowWidth
    },

    buttonText:{
        textAlign: 'center',
        color: "#F2F3F4",
        fontSize: 14    ,
        fontWeight: "600"
    },

    textInputWrapper:{
        marginBottom: 2,
        borderBottomWidth: 1,
        borderColor: "#D1D1D2"
    },

    textInput:{
        height: 45,
        flex:1,
        fontSize: 15,
        color: "#86858A",
        textAlign: "left"
    },
});



module.exports = styles;