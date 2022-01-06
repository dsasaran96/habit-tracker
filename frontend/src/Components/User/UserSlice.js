import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'

const userInfoString = localStorage.getItem("user_info")
const currentUserInfo = userInfoString ? JSON.parse(userInfoString) : null

const initUserState = {
    loggedInUser: currentUserInfo,
    registerState: {
        loading: "idle",
        error: null,
        currentRequestID: undefined
    },
    signinState: {
        loading: "idle",
        error: null,
        currentRequestID: undefined
    },
}

export const registerUser = createAsyncThunk("user/register", async (userInfo, thunkAPI) => {
    //error handling   
    const {loading, currentRequestID} = thunkAPI.getState().user.registerState
    if(loading !== 'pending' || thunkAPI.requestId !== currentRequestID) {
        return
    }

    try{
        //make API call
        const response = await axios.post('user/register', userInfo)
        localStorage.setItem("user_info", JSON.stringify(response.data))
        return response.data
    } catch (error) {
        const {rejectWithValue} = thunkAPI
        return rejectWithValue(error.response.data)
    }
})

export const signinUser = createAsyncThunk("user/signin", async (userInfo, thunkAPI) => {
    //error handling   
    const {loading, currentRequestID} = thunkAPI.getState().user.signinState
    if(loading !== 'pending' || thunkAPI.requestId !== currentRequestID) {
        return
    }

    try{
        //make API call
        const response = await axios.post('user/signin', userInfo)
        localStorage.setItem("user_info", JSON.stringify(response.data))
        return response.data
    } catch (error) {
        const {rejectWithValue} = thunkAPI
        return rejectWithValue(error.response.data)
    }
})

const userSlice = createSlice({
    name: 'user',
    initialState: initUserState,
    reducers: {},
    extraReducers: {
        [registerUser.pending]: (state, action) => {
            const {registerState} = state
            if(registerState.loading === "idle") {
                registerState.loading = "pending"
                registerState.currentRequestID = action.meta.requestId
            }
        },
        [registerUser.rejected]: (state, action) => {
            const {registerState} = state
            if(registerState.loading === "pending") {
                registerState.loading = "idle"
                registerState.currentRequestID = undefined
                registerState.error = action.payload
            }
        },
        [registerUser.fulfilled]: (state, action) => {
            const {registerState} = state
            if(registerState.loading === "pending") {
                registerState.loading = "idle"
                registerState.currentRequestID = undefined
                registerState.error = null
                state.loggedInUser = action.payload
            }
        },
        [signinUser.pending]: (state, action) => {
            const {signinState} = state
            if(signinState.loading === "idle") {
                signinState.loading = "pending"
                signinState.currentRequestID = action.meta.requestId
            }
        },
        [signinUser.rejected]: (state, action) => {
            const {signinState} = state
            if(signinState.loading === "pending") {
                signinState.loading = "idle"
                signinState.currentRequestID = undefined
                signinState.error = action.payload
            }
        },
        [signinUser.fulfilled]: (state, action) => {
            const {signinState} = state
            if(signinState.loading === "pending") {
                signinState.loading = "idle"
                signinState.currentRequestID = undefined
                signinState.error = null
                state.loggedInUser = action.payload
            }
        },
    }
})

export default userSlice.reducer