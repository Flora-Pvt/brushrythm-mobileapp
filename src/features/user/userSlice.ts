import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
  value: {},
  status: 'idle',
  error: null,
}

export const logUser = createAsyncThunk('user/logUser', async (id, token) => {
  if (typeof id !== 'string') {
    console.log('id invalid')
    return {}
  }

  const response = await axios.get(`/users/${id}`)
  const currentUser = response.data[0]

  const headersToken = `Bearer ${token}`
  axios.defaults.headers.common['Authorization'] = `Bearer ${headersToken}`

  return currentUser
})

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(logUser.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(logUser.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.value = { ...state.value, ...action.payload }
      })
      .addCase(logUser.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  },
})

export const selectUser = (state) => state.user.value

export default userSlice.reducer
