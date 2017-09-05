/**
 * Author: Moses Adekunle Esan
 * Date: 2/27/17. [US Format]
 * Project: React Native Authentication Views
 */

import React, { Component } from 'react';

import Main from './index'

import store from '../app/store';
import { Provider } from 'react-redux';

function setup() {
    class Root extends Component {
        render() {
            return (
                <Provider store={store}>
                    <Main />
                </Provider>
            );
        }
    }

    return Root;
}

module.exports = setup;
// Redux needs to inject a store holding the app state into the app.
// To do so, it requires a ‘Provider’ wrapping the whole app.