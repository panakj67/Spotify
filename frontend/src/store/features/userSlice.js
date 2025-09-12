import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user : null,
    isAutherised : false,
    loading : true
}

export const userSlice = createSlice({
    name : "user",
    initialState,
    reducers : {
        setUser : (state, action) => {
            state.user = action.payload;
        },
        setIsAutherised : (state, action) => {
            state.isAutherised = action.payload
        },
        setLoading : (state, action) => {
            state.loading = action.payload;
        }
    }
})

export const { setUser, setIsAutherised, setLoading } = userSlice.actions
export default userSlice.reducer;