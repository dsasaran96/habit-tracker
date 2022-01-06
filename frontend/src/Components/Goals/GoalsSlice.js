import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const getGoals = createAsyncThunk("goals/get", async (userInfo, thunkAPI) => {
    //call api for get /goals
    try {
        const {token} = userInfo
        const response = await axios.get('/goals', {
            headers: {Authorization: "Bearer " + token}
        })
        return response.data
    } catch (error) {
        const { rejectWithValue } = thunkAPI
        return rejectWithValue(error.response.data)
    }
})

const initGoalState = {
    goalsList: [],
    loading: "idle",
    error: null
}

const goalsSlice = createSlice({
    name: 'goals',
    initialState: initGoalState,
    reducers: {},
    extraReducers: {
        [getGoals.pending]: (state) => {
            if(state.loading === 'idle') {
                state.loading = 'pending'
            }
        },
        [getGoals.fulfilled]: (state, action) => {
            if(state.loading === 'pending') {
                state.loading = 'idle'
                state.goalsList = action.payload
            }
        },
        [getGoals.rejected]: (state, action) => {
            if(state.loading === 'pending') {
                state.loading = 'idle'
                state.error = action.error
            }
        }
    }
})

export default goalsSlice.reducer