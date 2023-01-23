import { createSlice } from "@reduxjs/toolkit";

export const currentChatID = createSlice({
    name: "chatID",
    initialState: "none",
    reducers:{
        setCurrentChatID: (state, action) => {
            return action.payload
        },
        delCurrentChatID: () => {
            return []
        }
    }
})

export const {setCurrentChatID, delCurrentChatID} = currentChatID.actions

export default currentChatID.reducer