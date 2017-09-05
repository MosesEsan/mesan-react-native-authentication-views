/**
 * Created by mosesesan on 03/09/2017.
 */

'use strict';

var { StyleSheet, Platform } = require('react-native');

var styles = StyleSheet.create({
    wrapper:{
        flex: 1,
        backgroundColor: '#fff'
    },

    container:{
        flex: 1,
        padding: 15,
        paddingTop: 35,
        // justifyContent:"center"

    },

    headerText: {
        fontWeight: "700",
        fontSize: 22,
        marginTop: 5,
        marginBottom: 5,
        color: "rgb(10,39,106)",
    },

    errorText:{
        color:"red",
        marginBottom: 5,
        fontSize: 12,
    },

    inputContainer:{
        ...Platform.select({
            ios: {
                borderBottomWidth: .5,
                borderColor: "#ccc",
            },
            android: {
            },
        })
    },


    textInput: {
        fontSize: 14,
        height: 35,
        fontFamily: 'Helvetica Neue',
        color: "#333333",
        // flex:1
        ...Platform.select({
            ios: {
                height: 35,
            },
            android: {
                height: 45,
            },
        })
    },

    forgotText: {
        fontWeight: "500",
        fontSize: 13,
        marginTop: 5,
        marginBottom: 10,
        color: "rgb(10,39,106)",
        textAlign: "right"
    },

    btnContainer:{
        justifyContent:"center",
        alignItems: "center"
    },

    fbLogin: {
        backgroundColor: '#3B5998',
        padding: 10,
        alignItems: 'center',
        height: 44,
        justifyContent: "center",
        borderRadius:4,
    },
    whiteFont: {
        color: 'white'
    }
});

module.exports = styles;