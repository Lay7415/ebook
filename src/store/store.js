import { configureStore } from '@reduxjs/toolkit'
import userRoleSlice from './userRoleSlice'
import signInSlice from './authReducer/signInSlice'
import breadCrumbsReducer from './breadCrumbsSlice'

const store = configureStore({
   reducer: {
      bread: breadCrumbsReducer,
      authorization: signInSlice,
      role: userRoleSlice,
   },
})
export default store
