import { createSlice } from "@reduxjs/toolkit";

export const AddFriendEvent = createSlice({
    name: "events",
    initialState: {
        value: null,
    },
    reducers:{
        addFriend: (name) => {
            return name;
        },
        addFriendResponse: (state, action) => {
            state.value = action.payload
        },
        resetValue: (state) => {
            state.value = null
        }
    }
})

export const {addFriend, addFriendResponse, resetValue} = AddFriendEvent.actions

export default AddFriendEvent.reducer