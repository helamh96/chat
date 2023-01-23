import { createSlice } from "@reduxjs/toolkit";

export const AddToGroupEvent = createSlice({
    name: "addToGroup",
    initialState: {
        value: null,
    },
    reducers:{
        addToGroup: (name) => {
            return name;
        },
        addToGroupResponse: (state, action) => {
            state.value = action.payload
        },
        resetValue: (state) => {
            state.value = null
        }
    }
})

export const {addToGroup, addToGroupResponse, resetValue} = AddToGroupEvent.actions

export default AddToGroupEvent.reducer