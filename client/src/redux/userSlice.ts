import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export interface IFlags{
    svg: string;
    png: string;
}
export interface ICountryDB{
    name: string;
    topLevelDomain: string[];
    alpha2Code: string;
    alpha3Code: string;
    callingCodes:string[];
    capital: string;
    altSpellings:string[];
    subregion: string;
    region: string;
    population: number;
    latlng:any[];
    demonym: string;
    area: number;
    gini: number;
    timezones: string[];
    borders: string[];
    nativeName: string;
    numericCode: string;
    flags: IFlags;
    currencies: Object[];
    languages: object[];
    translations:Object;
    flag: string;
    regionalBlocs: Object[];
    cioc: string;
    independent: boolean;
  }

const init= {
    countries: null,
    value:[]
}
interface IUserState{
    user:{
        countries: null|any,
        value:any[]
    }
}

export const getCountries = createAsyncThunk(
    'user/getCountries', async()=>{
        const response = await axios.get('https://restcountries.com/v2/all')
        return response.data
    }
)

const userSlice = createSlice({
    name: 'user',
    initialState: init,
    reducers:{
        addUser: (state, action:PayloadAction<any>)=>{
            state.value.push( action.payload)
        },
        removeUser:(state, action:PayloadAction<any>)=>{
            const ind = state.value.findIndex( item => item.id === action.payload.id );
            state.value.splice( ind,1);
        }
    },
    extraReducers: builder=>{
        builder.
        addCase(getCountries.fulfilled, (state, action)=>{
            state.countries = action.payload
        })
    }
});


export default userSlice.reducer;
export const {addUser, removeUser} = userSlice.actions;
export const selectUser = (state:IUserState)=> state.user.value;
export const selectCountries = (state:IUserState) => state.user.countries;