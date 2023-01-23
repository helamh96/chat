import { createSlice } from "@reduxjs/toolkit";

export const sendMessageEvent = createSlice({
    name: "sendMessage",
    initialState: {
        value: null,
    },
    reducers:{
        sendMessage: (msg) => {
            return msg;
        },
        sendMessageResponse: (state, action) => {
            state.value = action.payload
        },
        resetValue: (state) => {
            state.value = null
        }
    }
})

export const {sendMessage, sendMessageResponse, resetValue} = sendMessageEvent.actions

export default sendMessageEvent.reducer