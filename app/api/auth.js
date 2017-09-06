/**
 * Author: Moses Adekunle Esan
 * Date: 8/3/16. - Updated 2/27/17
 * Project: React Native Authentication Views
 * Description: Login Data Model
 */

// var data = {phone_number: phone}

'use strict';

var { AsyncStorage } = require('react-native');
var { FBLoginManager } = require('react-native-facebook-login');

import { SERVER_ERROR, ERROR, ERROR_MSG, API_URL } from "../config";


// Callback : success, data, error
var AuthAPI = {
    register: function(data, type, callback){
        var endpoint = (type === "facebook") ? "registerwithfb" : "register";
        var url = API_URL + endpoint;

        this.requestWithoutToken(url, data, callback);
    },

    registerWithFacebook: function (callback) {
        var _this = this;
        FBLoginManager.loginWithPermissions(["public_profile", "email"], function (error, data) {
            if (!error) {
                var credentials = data.credentials;

                var api = `https://graph.facebook.com/v2.3/${credentials.userId}?fields=name,first_name,last_name,email&access_token=${credentials.token}`;

                fetch(api)
                    .then((response) => response.json())
                    .then((responseData) => {
                        var data = {
                            name: responseData.name,
                            firstname: responseData.first_name,
                            lastname: responseData.last_name,
                            email: responseData.email,
                            fbToken: credentials.token,
                            fbID: credentials.userId
                        }
                        _this.register(data, "facebook", callback);
                    })
                    .catch(error => callback(false, null, {type: SERVER_ERROR}))
                    .done();
            } else {
                alert(error);
            }
        })
    },

    login: function(data, callback){
        var url = API_URL + "login";
        this.requestWithoutToken(url, data, callback);
    },

    sendEmailVerification: function (data, callback) {
        var url = API_URL + "email/verification";
        this.requestWithoutToken(url, data, callback);
    },

    sendVerificationCode: function (data, callback) {
        var url = API_URL + "phone/send-verification";
        this.requestWithoutToken(url, data, callback);
    },

    verifyCode: function(data, callback){
        var url = API_URL + "phone/verify-code?token=";
        this.requestWithoutToken(url+data.token, data, callback);
    },

    logout(callback){
        var url = API_URL + "logout?token=";
        AsyncStorage.getItem('token', (err, token) => {
            if (token !== null) {
                let requestConfig = {
                    method: "GET",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                }

                fetch(url+token, requestConfig)
                    .then((response) => response.json())
                    .then((responseData) => callback(true))
                    .catch(error => callback(false, error))
                    .done();
            }else{
                callback(true);
            }
        });
    },

    recover: function(data, callback){
        var url = API_URL +"recover";
        this.requestWithoutToken(url, data, callback);
    },

    requestWithoutToken(url, data, callback){
        let requestConfig = {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }

        fetch(url, requestConfig)
            .then((response) => {
                console.log(response)
            return response.json()
            })
            .then((responseData) => {
            console.log(responseData.data)
                if (responseData.success) callback(true, responseData.data, null)
                else if (responseData.error) callback(false, null, {type: ERROR, error: responseData.error})
            })
            .catch(error => {
                alert(error)
                callback(false, null, {type: SERVER_ERROR, error:error})
            })
            .done();
    }
}

module.exports = AuthAPI;
