/**
 * Author: Moses Adekunle Esan
 * Date: 8/3/16.
 * Project: React Native Authentication Views
 * Description: Login Data Model
 */

'use strict';

var React = require('react-native');
var {AsyncStorage} = React;

var LoginModel = {
    register: function(data, callback){
        var url ="http://localhost:8888/mesan-drops-laravel-api/public/api/register";
        fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then((response) => response.json())
            .then((responseData) => {
                console.log(responseData)
                if (responseData.success) callback(true, responseData.message, null)
                else callback(false, null, responseData.error)
            })
            .done();
    },

    login: function(data, callback){
        var url ="http://localhost:8888/mesan-drops-laravel-api/public/api/login";
        fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then((response) => response.json())
            .then((responseData) => {
                if (responseData.error) callback(false, responseData.error)
                else {
                    //2 - Save Token
                    AsyncStorage.setItem('token',responseData.token);
                    callback(true, null);
                }
            })
            .done();
    },

    recoverPassword: function(email, callback){
        var data = {"email" : email}
        var url ="http://localhost:8888/mesan-drops-laravel-api/public/api/recover";
        fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then((response) => response.json())
            .then((responseData) => {
                if (responseData.success) callback(true, responseData.message, null)
                else callback(false, null, responseData.error)
            })
            .done();
    },

    checkTokenExist(callback) {
        AsyncStorage.getItem('token', (err, token) => {
            if(token === null) callback(false, null);
            else callback(true, token)
        });
    },

    getSessionToken(callback) {
        AsyncStorage.getItem('token', (err, token) => {
            callback(err, token)
        });
    },

    logout(){
        AsyncStorage.removeItem('token'); //clear token on device
        this.checkTokenExist(function(exist, token){
            if (exist){ //invalidate token
                var data = {"token" : token}
                var url ="http://localhost:8888/mesan-drops-laravel-api/public/api/logout";
                fetch(url, {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                })
                    .then((response) => response.json())
                    .then((responseData) => {})
                    .done();
            }
        });
    }
}

module.exports = LoginModel;
