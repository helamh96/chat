import { createSlice } from "@reduxjs/toolkit";

export const CreateGroupEvent = createSlice({
    name: "createGroup",
    initialState: {
        value: null,
    },
    reducers:{
        createGroup: (name) => {
            return name;
        },
        createGroupResponse: (state, action) => {
            state.value = action.payload
        },
        resetValue: (state) => {
            state.value = null
        }
    }
})

export const {createGroup, createGroupResponse, resetValue} = CreateGroupEvent.actions

export default CreateGroupEvent.reducer