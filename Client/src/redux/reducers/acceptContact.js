import { createSlice } from "@reduxjs/toolkit";

export const acceptContactEvent = createSlice({
    name: "acceptContact",
    initialState: {
        value: null,
    },
    reducers:{
        acceptContact: (name) => {
            return name;
        },
        acceptContactResponse: (state, action) => {
            state.value = action.payload
        },
        resetValue: (state) => {
            state.value = null
        }
    }
})

export const {acceptContact, acceptContactResponse, resetValue} = acceptContactEvent.actions

export default acceptContactEvent.reducer