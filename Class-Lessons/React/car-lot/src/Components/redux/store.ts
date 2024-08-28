import { combineReducers } from "redux";

import { configureStore } from "@reduxjs/toolkit";
import { CarReducer } from "./CarReducer";

const reducers = combineReducers({cars: CarReducer});

export const carLot = configureStore({
    reducer: reducers,
    middleware: (getDefaultMiddleWare)=>
    getDefaultMiddleWare({serializableCheck: false})
});
