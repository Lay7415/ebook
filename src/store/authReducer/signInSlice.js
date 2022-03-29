import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { saveToLocalStorage, sendRequest } from '../../utils/helpers'
import { asyncUpdateUserRole } from '../userRoleSlice'

export const authFetch = createAsyncThunk(
   'EbookUser/signIn',
   async (ebookUserInfo, { rejectWithValue, dispatch }) => {
      try {
         const response = await sendRequest(ebookUserInfo)
         if (response.token) {
            saveToLocalStorage('EbookUserToken', response)
         }
         dispatch(asyncUpdateUserRole())
         return response
      } catch (error) {
         return rejectWithValue(error.message || 'Something went wrong')
      }
   }
)

const setError = (state, action) => {
   state.status = 'rejected'
   state.error = action.payload
}

const isPending = (state) => {
   state.status = 'loading'
   state.error = null
}

const setFulfilled = (state, action) => {
   state.error = null
   state.status = 'resolved'
   if (action.payload.token) {
      const { token, authority } = action.payload
      state.token = token
      state.role = authority
   } else {
      state.userRegCredential = 'successful'
   }
}

const signInSlice = createSlice({
   name: 'Auth',
   initialState: {
      token: '',
      role: '',
      status: null,
      error: null,
      userRegCredential: '',
   },
   reducers: {
      authenticateUser(state, action) {
         if (action.payload === null) {
            state.token = ''
            state.role = ''
         }
         if (action.payload !== null) {
            const { token, authority } = action.payload
            state.token = token
            state.role = authority
         }
      },
      logout(state) {
         state.token = ''
         state.role = ''
      },
   },
   extraReducers: {
      [authFetch.pending]: isPending,
      [authFetch.fulfilled]: setFulfilled,
      [authFetch.rejected]: setError,
   },
})

export const setAuth = signInSlice.actions
export default signInSlice.reducer
