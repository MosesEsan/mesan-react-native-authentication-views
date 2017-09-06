/**
 * Author: Moses Adekunle Esan
 * Date: 8/2/16.
 * Project: React Native Authentication Views
 * Description: Registration, Login and Password Views Styles
 */

'use strict';

import React, {StyleSheet, Dimensions, Platform} from 'react-native';


var {width: windowWidth, height:windowHeight} = Dimensions.get('window');


var NAVBAR_HEIGHT = (Platform.OS === 'ios') ? 64 : 54;

const BLACK = "#333333";

var styles = StyleSheet.create({
    container: {
        backgroundColor: '#D3222B',
        position: "absolute", left: 0,
        top: 0,
        bottom: 0, right: 0,
        height: windowHeight
    },
    verifyContainer: {
        backgroundColor: '#FFF'
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    logoContainer:{
        width: windowWidth,
        height:((windowHeight/2) / 2),
        justifyContent: 'center',
        alignItems: 'center'
    },
    smallLogoContainer:{
        height:64,
    },
    infoBox:{
        backgroundColor: "#FFF"
    },
    headerText:{
        fontFamily: 'Bariol', fontSize: 17, color: BLACK, fontWeight: "500"
    },
    smallHeaderText:{
        fontFamily: 'Bariol', fontSize: 15, color: BLACK, fontWeight: "500"
    },
    buttonsContainer:{
        height: 72,
        borderTopWidth: 1,
        borderColor: "rgb(231, 239, 241)",
        flexDirection: "row",
        paddingLeft: 20, paddingRight: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },

    buttonsContainer2:{
        height: 105,
        flexDirection: "column"
    },

    wrapper:{
        //borderWidth:1, borderColor: "green",
        //backgroundColor: 'purple',
        flex: 1,
        position:"relative",
        paddingLeft: 20, paddingRight: 20
    },

    ///Log In
    loginContainer: {
        backgroundColor: 'white',
        position: "absolute", left: 0,
        top: 0,
        bottom: 0, right: 0,
        height: windowHeight
    },
    login:{
        height: windowHeight - NAVBAR_HEIGHT,
        marginTop: NAVBAR_HEIGHT,
        paddingLeft: 25, paddingRight: 25
    },
    header:{
        marginTop: 30,
        paddingRight: 35
    },
    headerText2:{
        color: "#535458",
        fontSize: 23,
        textAlign: "left",
        fontWeight: "600",
        backgroundColor: "transparent"
    },
    subText:{
        color: "#535458",
        fontSize: 14,
        textAlign: "left",
        fontWeight: "400",
        backgroundColor: "transparent",
        marginTop: 10
    },
    loginWrapper:{
        marginTop:20,
        height: windowHeight - 210 + 7,
        position: "relative",
        //borderWidth: 1, borderColor: "red",
    },
    resendButton:{
        position: "absolute", bottom: 0
    },

    forgotPasswordText: {
        fontSize: 14,
        textAlign: "center",
        marginTop: 9
    },


    hiddenBottom:{
        height: 0
    },
    bottomText:{
        color: "rgb(249, 184, 156)",
        fontSize: 14,
    },


    //Verify Section

    verifyWrapper:{
        position: "absolute",
        top: 20, left: 25, right:25

    },

    verifyHeaderText:{
        textAlign: 'center',
        color: "rgb(207,120,120)",
        fontSize: 17    ,
        fontWeight: "500",

    },
    verifySubText:{
        textAlign: 'center',
        fontSize: 15,
        marginTop: 10
    },

    //Forgot Paswword

    forgotWrapper:{
        marginTop: 20,
        borderColor: "#e4e6e8",
        borderWidth:1
    },

    forgotInput:{
        height: 45,
        flex:1,
        fontSize: 15,
        textAlign: "left",
        padding: 5
    },

    forgotButton:{
        height: 44,
        borderRadius: 3,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:  "rgb(129, 29, 55)",
        marginTop: 20,
    },

    verificationCodeInput:{
        height: 50,
        width: ((windowWidth - 50 - 15) / 4),
        marginRight: 5
    },

    codeInput:{
        flex:1,
        color: "#86858A",
        textAlign: "center", fontSize: 30,
        borderWidth:1,
        borderColor: "#9EA0A2",
        borderRadius: 3,
    },
});


module.exports = styles;