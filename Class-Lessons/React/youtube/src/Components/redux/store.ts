import { combineReducers } from "redux";
import { SongReducer } from "./SongReducer";
import { configureStore } from "@reduxjs/toolkit";
import { CatReducer } from "./CatReducer";

//npm install @reduxjs/toolkit

//which reducers should i use
const reducers = combineReducers({songs: SongReducer,categories:CatReducer});

//combine all reducer to one single store
export const youtube = configureStore({
    reducer: reducers,
    middleware: (getDefaultMiddleWare)=>
    getDefaultMiddleWare({serializableCheck: false}) // do not look on serialization error
});

//middleware => התערבות מרגע הכנת המידע ועד להצגה שלו