import { configureStore } from "@reduxjs/toolkit";
import userReducer from './userSlice'
import dataReducer from './dataSlice'
import chartReducer from './chartSlice'

const store = configureStore({
    reducer:{
        user: userReducer,
        data: dataReducer,
        chart: chartReducer,
    }
});
export default store;