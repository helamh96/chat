import { createSlice } from "@reduxjs/toolkit";

export const groupChat = createSlice({
    name: "groupChat",
    initialState: "",
    reducers:{
        setGroupName: (state, action) => {
            return action.payload
        },
        delGroupName: () => {
            return []
        }
    }
})

export const {setGroupName, delGroupName} = groupChat.actions

export default groupChat.reducer