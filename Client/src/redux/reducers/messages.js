import { createSlice } from "@reduxjs/toolkit";

export const messages = createSlice({
    name: "chat",
    initialState: [],
    reducers:{
        setMessages: (state, action) => {
            return action.payload
        },
        delMessages: () => {
            return []
        },
        addMessage: (state, action) => {
            return state.push(action.payload)
        }
    }
})

export const {setMessages, delMessages, addMessage} = messages.actions

export default messages.reducer