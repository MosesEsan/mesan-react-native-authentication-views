/**
 * Created by mosesesan on 01/09/2017.
 */

'use strict';

import React, {StyleSheet, Dimensions, Platform} from 'react-native';


var {width: windowWidth, height:windowHeight} = Dimensions.get('window');


var NAVBAR_HEIGHT = (Platform.OS === 'ios') ? 64 : 54;

const BLACK = "#333333";

var styles = StyleSheet.create({
    container:{
        flex: 1,
    },

    wrapper:{
        // borderWidth:1, borderColor: "green",
        flex: 1,
        position:"relative",
    },

    bgImage:{
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        flex: 1,
        width: windowWidth,
        height: windowHeight
    },

    overlay:{
        backgroundColor:  'rgba(69,67,68, .6 )',
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        flex: 1,
        height: windowHeight
    },

    logo:{
        marginTop: 45,
        paddingLeft: 20,
        paddingRight: 55
    },

    logoText:{
        color: "#F2F3F4",
        fontSize: 31,
        textAlign: "left",
        fontWeight: "600",
        backgroundColor: "transparent"
    },

    //Bottom Section
    bottom:{
        width: windowWidth,
        height: ((windowHeight / 100) * 8.450704225352112) * 2,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        // top: 0,
        right: 0,
        bottom: 0,
    },

    btnContainer: {
        width: windowWidth,
        height: (windowHeight / 100) * 8.450704225352112,
        flexDirection: "row",
    },

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