import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import socketIOClient, { Socket } from 'socket.io-client';
import * as io from "socket.io-client";
import {DefaultEventsMap} from "@socket.io/component-emitter";
import { WritableDraft } from "immer/dist/internal";
import { ICountryDB } from "./userSlice";


export interface IInformation{
    id:string,
    user:string,
    message:string,
    country: ICountryDB|null,
    connected:boolean,
}
interface IRootData {
    
    data:IData
}
interface IData{
    first:boolean,
    appId:string,
    source: any| null,
    value: IInformation[]
}
const init:IData ={
    first:false,
    appId:"",
    source:null,
    value: []
}


const dataSlice = createSlice({
    name: 'data',
    initialState: init,
    reducers: {
      
        addData: (state, action:PayloadAction<any>) =>{
            let o:IInformation = action.payload;
            if(!state.first){
                state.first =true;
                state.appId = o.id;
            }
            if(state.appId !== o.id){
                if(o.country && o.user !=""){
                    state.value.push(action.payload);
                }
            }
            // if(o.connected === false){
            //     removeData(action.payload);
            // }
        },
        removeData: (state, action:PayloadAction<any>) =>{
            state.value=state.value.filter(item => item.id !== action.payload.id)
        },
        clearData:(state:any) =>{
            state.value = [];
        }
    }
});



export default dataSlice.reducer;
export const {addData, removeData, clearData} = dataSlice.actions;
export const selectData =(state:IRootData) => state.data.value
export const selectSource = (state:IRootData) => state.data.source;
