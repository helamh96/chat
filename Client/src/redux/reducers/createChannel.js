import { createSlice } from "@reduxjs/toolkit";

export const createChannelEvent = createSlice({
    name: "createChannel",
    initialState: {
        value: null,
    },
    reducers:{
        createChannel: (info) => {
            return info;
        }
    }
})

export const {createChannel} = createChannelEvent.actions

export default createChannelEvent.reducer