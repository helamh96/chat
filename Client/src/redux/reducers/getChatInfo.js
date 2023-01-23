import { createSlice } from "@reduxjs/toolkit";

export const getChatEvent = createSlice({
    name: "getChat",
    initialState: {
        value: null,
    },
    reducers:{
        getChat: (name) => {
            return name;
        },
        getChatResponse: (state, action) => {
            state.value = action.payload
        },
        resetValue: (state) => {
            state.value = null
        }
    }
})

export const {getChat, getChatResponse, resetValue} = getChatEvent.actions

export default getChatEvent.reducer