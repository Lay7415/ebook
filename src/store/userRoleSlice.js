import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
   saveToLocalStorage,
   getFromLocalStorage,
   deleteFromLocalStorage,
} from '../utils/helpers'
import { EBOOKUSEROLE, EBOOKPERSONTOKEN } from '../utils/constants/constants'

export const asyncUpdateUserRole = createAsyncThunk(
   'role/asyncUpdateUserRole',
   async (role) => {
      const userInfo = getFromLocalStorage(EBOOKPERSONTOKEN)
      if (userInfo !== null) {
         const { authority } = userInfo
         saveToLocalStorage(EBOOKUSEROLE, authority)
         const role = authority
         return role
      }
      return role
   }
)

const userRoleReducer = createSlice({
   name: 'userRoleReducer',
   initialState: {
      roleData: {},
   },
   reducers: {
      cleanRoleData(state) {
         state.roleData = null
         deleteFromLocalStorage(EBOOKUSEROLE)
      },
      updateUserRole(state, action) {
         state.roleData = action.payload
      },
   },
   extraReducers: {
      [asyncUpdateUserRole.pending]: (state) => {
         state.status = 'loading'
      },
      [asyncUpdateUserRole.fulfilled]: (state, action) => {
         state.roleData = action.payload
         state.status = 'success'
      },
      [asyncUpdateUserRole.rejected]: (state) => {
         state.status = 'failed'
      },
   },
})

export const userRoleReducerActions = userRoleReducer.actions
export default userRoleReducer.reducer
