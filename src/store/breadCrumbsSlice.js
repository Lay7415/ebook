import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { saveToLocalStorage, getFromLocalStorage } from '../utils/helpers'
import { EBOOK_BREADCRUMBS } from '../utils/constants/constants'

export const asyncUpdateBreadcrumb = createAsyncThunk(
   'breadCrumb/asyncUpdateBreadcrumb',
   async (breadCrumbs) => {
      saveToLocalStorage(EBOOK_BREADCRUMBS, breadCrumbs)
      return breadCrumbs
   }
)

export const asyncAutoUpdateBreadcrumb = createAsyncThunk(
   'breadCrumb/asyncUpdateBreadcrumb',
   async () => {
      const breadcrumbs = getFromLocalStorage(EBOOK_BREADCRUMBS)
      return breadcrumbs
   }
)

const breadCrumbsReducer = createSlice({
   name: 'breadCrumbsReducer',
   initialState: {
      breadCrumbsData: [],
   },
   extraReducers: {
      [asyncUpdateBreadcrumb.pending]: (state) => {
         state.status = 'loading'
      },
      [asyncUpdateBreadcrumb.fulfilled]: (state, action) => {
         state.breadCrumbsData = action.payload
         state.status = 'success'
      },
      [asyncUpdateBreadcrumb.rejected]: (state) => {
         state.status = 'failed'
      },
   },
})

export const breadCrumbsReducerActions = breadCrumbsReducer.actions
export default breadCrumbsReducer.reducer
