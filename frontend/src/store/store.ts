import { configureStore } from "@reduxjs/toolkit";
import { reducer } from "./slice";

const store=configureStore({
    reducer:{
        employees:reducer
    }
})

export type storeType=ReturnType<typeof store.getState>

export default store