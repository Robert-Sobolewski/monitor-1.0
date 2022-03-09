import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";


const init= {
    countries: null,
    value:null
}
interface IUserState{
    user:{
        countries: null|any,
        value:null|any
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
            state.value = action.payload
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
export const {addUser} = userSlice.actions;
export const selectUser = (state:IUserState)=> state.user.value;
export const selectCountries = (state:IUserState) => state.user.countries;