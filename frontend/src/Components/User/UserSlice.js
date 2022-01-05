import {createSlice} from '@reduxjs/toolkit'

const initUserState = {
    loggedInUser: null,
    registerState: {
        loading: "idle",
        error: null,
        currentRequestID: undefined
    },
}

const userSlice = createSlice({
    name: 'user',
    initialState: initUserState,
    reducers: {},
    extraReducers: {}
})

export default userSlice.reducer