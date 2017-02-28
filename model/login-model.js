/**
 * Author: Moses Adekunle Esan
 * Date: 8/3/16. - Updated 2/27/17
 * Project: React Native Authentication Views
 * Description: Login Data Model
 */

'use strict';

var React = require('react-native');
var { NetInfo } = React;

var { FBLoginManager } = require('react-native-facebook-login');

var config = require('../app/config.json');

NetInfo.isConnected.addEventListener('change', () => {
});

// Callback : success, data, error, network err

var LoginModel = {

    register: function(data, callback, type){
        var url = config.url + "api/register";
        if (type === "fb") url = config.url + "api/registerwithfb";
        this.api(url, data, callback, 'POST');
    },

    registerWithFacebook: function (callback) {
        var _this = this;

        this.checkNetworkConnection(function (status) {
            if (status) {
                FBLoginManager.loginWithPermissions(["public_profile", "email"], function (error, data) {
                    if (!error) {
                        var credentials = data.credentials;

                        var api = `https://graph.facebook.com/v2.3/${credentials.userId}?fields=name,email&access_token=${credentials.token}`;

                        fetch(api)
                            .then((response) => response.json())
                            .then((responseData) => {
                                var data = {
                                    name: responseData.name,
                                    email: responseData.email,
                                    fbToken: credentials.token,
                                    fbID: credentials.userId
                                }
                                _this.register(data, callback, "fb");
                            }).catch(error => {
                            callback(false, null, error, false)
                        }).done();
                    } else {
                        callback(false, null, error, false)
                    }
                })
            }else {
                callback(false, null, null, true)
            }
        });
    },

    login: function(data, callback){
        var url = config.url + "api/login";
        this.api(url, data, callback, 'POST');
    },

    sendEmailVerification: function (email, callback) {
        var data = {"email": email}
        var url = config.url + "api/email/verification";
        this.api(url, data, callback, 'POST');
    },

    sendSMSVerification: function (phone, callback) {
        var data = {phone_number: phone}
        var url = config.url + "api/phone/verification";
        // this.api(url, data, callback, 'POST');

        callback(true, {'message' : "Password reminder sent"}, null, false) //SUCCESS
    },

    verifyCode: function(code, callback){
        var url = config.url + "api/verify/sms/"+code;
        this.api(url, {}, callback, 'GET');
    },

    recoverPassword: function(email, callback){
        var data = {"email": email}
        var url = config.url+"api/recover";
        this.api(url, data, callback, 'POST');
    },


    logout(callback){
        var url = config.url+"api/logout?token=";
        this.api(url, {}, callback, 'GET');
    },

    api(url, data, callback, method){
        var _this = this;
        this.checkNetworkConnection(function (status) {
            if (status) {
                let config = {}
                if (method === "GET") {
                    config = {
                        method: method,
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                    }
                } else {
                    config = {
                        method: method,
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(data)
                    }
                }

                console.log(url)

                fetch(url, config).then((response) => {
                    // console.log(response)
                    return response.json()
                })
                    .then((responseData) => {
                        if (responseData.error) callback(false, null, responseData.error, false)
                        else if (responseData.success) callback(true, responseData.data, null, false)
                        else callback(true, responseData, null, false)
                    }).catch(error => {
                    callback(false, null, error, false)
                }).done();
            } else {
                callback(false, null, null, true)
            }
        });
    },

    checkNetworkConnection(callback){
        //
        //none - device is offline
        //wifi - device is online and connected via wifi, or is the iOS simulator
        //cell - device is connected via Edge, 3G, WiMax, or LTE
        //unknown - error case and the network status is unknown

        //NetInfo.fetch().done((reach) => {
        //    if (reach === "none") callback(false);
        //    else callback(true)
        //});

        NetInfo.isConnected.fetch().then(isConnected => {
            callback(isConnected);
        });
    }
}

module.exports = LoginModel;
