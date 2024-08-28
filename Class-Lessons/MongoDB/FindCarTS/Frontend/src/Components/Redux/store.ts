import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { AuthReducer } from './AuthReducer';

const reducers = combineReducers({auth: AuthReducer});

export const store = configureStore({
    reducer: reducers,
    middleware: (getDefaultMiddleWare)=>
    getDefaultMiddleWare({serializableCheck: false}), // do not look on serialization error
});