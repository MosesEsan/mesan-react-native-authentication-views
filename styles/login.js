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
        //flex: 1,
        //backgroundColor: 'rgb(184,62,73)',
        backgroundColor: '#D3222B',
        //borderWidth: 1, borderColor: "red"

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
        //flex: 1,
        height:((windowHeight/2) / 2),
        justifyContent: 'center',
        alignItems: 'center',
        //backgroundColor: 'yellow',
        //backgroundColor: 'rgb(184,62,73)',
    },
    smallLogoContainer:{
        height:64,
    },
    logo:{
        //height: 50,
        marginTop: 45,
        paddingRight: 55
    },
    logoText:{
        color: "#F2F3F4",
        fontSize: 31,
        textAlign: "left",
        fontWeight: "600",
        backgroundColor: "transparent"
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

    bgImage:{
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        flex: 1,
        width: windowWidth,
        height: windowHeight - 94
    },
    overlay:{
        //backgroundColor: '#ff6666',
        //backgroundColor: 'rgba(0,0,0,.6)',
        backgroundColor:  'rgba(69,67,68, .6 )',
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        flex: 1,
        height: windowHeight - 96
    },

    ///Log In
    loginContainer: {
        //backgroundColor: 'rgb(184,62,73)',
        backgroundColor: 'white',
        //borderWidth: 1, borderColor: "red",
        position: "absolute", left: 0,
        top: 0,
        bottom: 0, right: 0,
        height: windowHeight
    },
    login:{
        //borderWidth: 1, borderColor: "red",
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
    codeInput:{
        height: 45,
        flex:1,
        color: "#86858A",
        //borderWidth:1, borderColor: "red",
        textAlign: "center", fontSize: 30
    },
    logInButton:{
        height: (windowHeight/100) * 8.450704225352112,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:  "#CB1B22",
        width: windowWidth /2
    },
    socialButton:{
        height: (windowHeight/100) * 8.450704225352112,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:  "#CB1B22",
        //marginTop: 20,
        width: windowWidth,

        //width: React.Dimensions.get('window').width - 50,
    },
    resendButton:{
        position: "absolute", bottom: 0
    },
    buttonText:{
        textAlign: 'center',
        color: "#F2F3F4",
        fontSize: 14    ,
        fontWeight: "600"
    },

    forgotPasswordText: {
        fontSize: 14,
        textAlign: "center",
        marginTop: 9
    },
    //Bottom Section
    bottom:{
        width: windowWidth,
        justifyContent: 'center',
        alignItems: 'center',
        //flexDirection: "row"
    },

    btnContainer:{
        width: windowWidth,
        height: (windowHeight/100) * 8.450704225352112,
        flexDirection: "row",
        //borderWidth:1, borderColor: "purple",
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
        //borderBottomWidth: 1,
        //borderColor: "rgb(249, 184, 156)",
        borderWidth:1,
        //borderColor: "purple",
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
});


module.exports = styles;