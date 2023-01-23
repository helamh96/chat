import { createSlice } from "@reduxjs/toolkit";

export const currentChat = createSlice({
    name: "chat",
    initialState: "none",
    reducers:{
        setCurrentChat: (state, action) => {
            return action.payload
        },
        delCurrentChat: () => {
            return []
        }
    }
})

export const {setCurrentChat, delCurrentChat} = currentChat.actions

export default currentChat.reducer