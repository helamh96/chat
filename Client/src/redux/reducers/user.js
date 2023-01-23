import { createSlice } from "@reduxjs/toolkit";

export const user = createSlice({
    name: "user",
    initialState: [],
    reducers:{
        setUser: (state, action) => {
            state.push(action.payload)
        },
        deleteUser: () => {
            return []
        }
    }
})

export const {setUser, deleteUser} = user.actions

export default user.reducer