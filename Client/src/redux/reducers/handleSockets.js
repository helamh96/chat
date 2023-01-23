import { createSlice } from "@reduxjs/toolkit";

export const handleSockets = createSlice({
    name: "handleSockets",
    initialState: "",
    reducers:{
        emit: (msg) => {
            return msg
        },
        receive: (msg) => {
            return []
        }
    }
})

export const {setGroupName, delGroupName} = handleSockets.actions

export default handleSockets.reducer