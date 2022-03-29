import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const fetchGenres = createAsyncThunk(
   'genres/fetchGenres',
   async function generesFetch(_, { rejectWithValue }) {
      try {
         const response = await fetch(
            'https://jsonplaceholder.typicode.com/users?_limit=5'
         )
         if (!response.ok) {
            throw new Error('Server Error!')
         }

         const data = await response.json()

         return data
      } catch (error) {
         return rejectWithValue(error.message)
      }
   }
)

const genresSlice = createSlice({
   name: 'genres',
   initialState: {
      genres: [],
      status: null,
      error: null,
   },
   extraReducers: {
      [fetchGenres.pending]: (state) => {
         state.status = 'loading'
         state.error = null
      },
      [fetchGenres.fulfilled]: (state, action) => {
         state.status = 'resolved'
         state.todos = action.payload
      },
      [fetchGenres.rejected]: (state, action) => {
         state.status = 'rejected'
         state.error = action.payload
      },
   },
})

export const genresActions = genresSlice.actions
export default genresSlice.reducer
