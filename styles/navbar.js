/**
 * Author: Moses Adekunle Esan
 * Date: 8/2/16.
 * Project: React Native Authentication Views
 * Description: Navigation Bar Styles
 */

'use strict';

import React, {StyleSheet, Dimensions, Platform} from 'react-native';

var {width: windowWidth, height:windowHeight} = Dimensions.get('window');
if (Platform.OS !== 'ios') windowHeight - 20;

const BLACK = "#333333";
const GRAY = "rgb(126,126,126)";

var TITLE_VIEW_RIGHT = (Platform.OS === 'ios') ? 0 : 5 + 44 + 10 + 44;



var styles = StyleSheet.create({

    header: {
        //backgroundColor: '#CB1B22',
        backgroundColor: '#FFF',
        overflow: "hidden",
        position: "absolute",
        //borderWidth: 1, borderColor: "red",
        top: 0, left: 0, right: 0
    },
    backBtn:{
        height:44,
        width: 44,
        justifyContent: "center",
        alignItems: "center",
        //borderWidth: 1, borderColor: "green",
    },
    backButtonImage: {
        width: 27,
        height: 27
    },
    forgotBtn:{
        position: "absolute",
        right:18,
        height:44,
        width: 150,
        justifyContent: "center",
        alignItems: "flex-end",
        //borderWidth: 1, borderColor: "green",
    },
    forgotTxt:{
        color: "#535458",
        fontWeight:"500",
        fontSize: 13
    },


    title: {
        color: "#FFFFFF",
        fontFamily: 'Bariol',
        fontWeight:"500",
        fontSize: 19, textAlign:"center",
        paddingTop: 0
    },

    titleView: {
        position: "absolute",
        top:0,
        left: 0,
        height: 44,
        justifyContent: "center",
        alignItems: 'center',
    },
    titleImage:{
        //height:30,
        //width: 134,
        height:25,
        width: 112,
        //borderWidth: 1, borderColor: "blue",
        //marginTop: -5
    },

    backButton: {
        position: "absolute",
        top: 0,
        left: 5,
        width: 44,
        height: 44,
        flexDirection: "row", overflow:"hidden",
        justifyContent: "center",
        alignItems: 'center'
    },

    navButton: {
        position: "absolute",
        top: 0,
        width: 44,
        height: 44,
        flexDirection: "row", overflow:"hidden",
        justifyContent: "center",
        alignItems: 'center',
    },



    leftNavButton: {
        left: 5
    },

    rightNavButton: {
        right: 3 +  44 ,
    },

    rightNavButton2: {
        right: 3
    },


    barRightButtonText: {
        color: 'rgb(0, 122, 255)',
        textAlign: "right",
        fontSize: 17,
    },


    barBackButtonText: {
        color: 'rgb(0, 122, 255)',
        textAlign: "left",
        fontSize: 17,
        paddingLeft: 6,
    },
    barLeftButtonText: {
        color: 'rgb(0, 122, 255)',
        textAlign: "left",
        fontSize: 17,
    },

    menuItem:{
        //height:40,
        height:44,
        //width: windowWidth/3,
        width: 62,
        justifyContent: "center",
        alignItems: "center",
        //borderWidth: 1, borderColor: "green",
    },

    activeMenuItem:{
        borderBottomWidth:2,
        borderColor: "white",
    },

    menuItemText:{
        color: "#993d3f",
        fontFamily: 'OpenSans-Semibold',
        fontSize: 15,
        fontWeight: "600"
    },


    activeMenuItemText:{
        color:"#FFF",
        fontSize: 16,
        //fontFamily: 'Bariol'
    },


    navBtn:{
        position: "absolute",
        top: 0,
        width: 44,
        height: 44,
        flexDirection: "row", overflow:"hidden",
        justifyContent: "center",
        alignItems: 'center',
    },


    leftNavBtn:{
        left: 5
    },

    rightNavBtn:{
        right:5
    },


});


module.exports = styles;