/**
 * Author: Moses Adekunle Esan
 * Date: 2/27/17. [US Format]
 * Project: React Native Authentication Views
 */

import { combineReducers } from 'redux';

import userReducer from "./auth"

// Combine all the reducers
// short hand property names
const rootReducer = combineReducers({ userReducer})

export default rootReducer;
