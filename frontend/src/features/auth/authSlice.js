import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

let myUser = JSON.parse( localStorage.getItem( 'user' ) )

const initialState = {
    user: myUser ? myUser : null,
    userMessage: '',
    userError: false,
    userSuccess: false,
    userLoading: false,
    userChats: []
}



export const registerUser = createAsyncThunk( 'register', async ( userData, thunkAPI ) => {
    try {
        let response = await axios.post( 'http://localhost:5174/api/auth/register', userData )
        localStorage.setItem( 'user', JSON.stringify( response.data ) )
        return response.data
    } catch ( error ) {
        return thunkAPI.rejectWithValue( error.response.data )
    }
} )


export const verfiyOTP = createAsyncThunk( 'otp-verification', async ( otpData, thunkAPI ) => {
    try {
        let response = await axios.post( 'http://localhost:5174/api/auth/otp-verification', otpData )
        return response.data
    } catch ( error ) {
        return thunkAPI.rejectWithValue( error.response.data )
    }
} )



const authSlice = createSlice( {
    name: 'auth',
    initialState,
    reducers: {
        userReset: ( state ) => {
            state.userLoading = false
            state.userError = false
            state.userSuccess = false
            state.userMessage = ''
        }
    },
    extraReducers: ( builder ) => {
        builder
            .addCase( registerUser.pending, ( state, action ) => {
                state.userLoading = true
            } )
            .addCase( registerUser.rejected, ( state, action ) => {
                state.userLoading = false
                state.userMessage = action.payload
                state.userError = true
                state.user = null
            } )
            .addCase( registerUser.fulfilled, ( state, action ) => {
                state.userLoading = false
                state.userSuccess = true
                state.user = action.payload
            } )
            .addCase( verfiyOTP.pending, ( state, action ) => {
                state.userLoading = true
            } )
            .addCase( verfiyOTP.rejected, ( state, action ) => {
                state.userLoading = false
                state.userError = true
                state.userMessage = action.payload
            } )
            .addCase( verfiyOTP.fulfilled, ( state, action ) => {
                state.userLoading = false
                state.userSuccess = true
                state.userError = false
            } )
    }
} );



export const { userReset } = authSlice.actions

export default authSlice.reducer


