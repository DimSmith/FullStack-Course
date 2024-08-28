//npm install redux

import { current } from "@reduxjs/toolkit";
import { Song } from "../model/song";

//divided to five equal parts

//state of songs
export class SongState {
    public allSongs:Song[] = [];
}

//what action i will use
export enum SongActionType {
    addSong="addSong",
    deleteSong = "deleteSong",
    searchSong = "searchSong",
    downloadSong = "downloadSong",
}

//action data structure
export interface SongAction {
    type: SongActionType;
    payload?: any;
}

//which function i will use
export function addSongFunction(newSong:Song):SongAction{
    return {type: SongActionType.addSong, payload:newSong}
}

export function deleteSongAction(id:string):SongAction{
    return{type: SongActionType.deleteSong}
}

export function searchSongAction(songNAme:string):SongAction{
    return{type: SongActionType.searchSong, payload:songNAme}
}

export function downloadSongAction(allSongs:Song[]):SongAction{
    return{type: SongActionType.downloadSong, payload:allSongs}
}

//reducer - by it's unique function signature
export function SongReducer(
    currentState: SongState = new SongState(),
    action: SongAction): SongState
    {
        const newState = {...currentState};
        switch(action.type){
            case SongActionType.addSong:
                newState.allSongs = [...newState.allSongs,action.payload];
            break;
            case SongActionType.deleteSong:
                newState.allSongs = [...newState.allSongs].filter(
                    (item)=> item.id!==action.payload
                )
            break;
            case SongActionType.downloadSong:
                newState.allSongs = action.payload;
            break;
            case SongActionType.searchSong:
            
            break;
        }

        return newState;
    }