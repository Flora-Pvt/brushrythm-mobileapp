import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { storeStringData } from 'utils/async-storage'

const initialState = {
  value: {},
  status: 'idle',
  error: null,
}

export const logUser = createAsyncThunk(
  'user/logUser',
  async (credentials: { id; token }) => {
    const { id, token } = credentials

    if (typeof id !== 'string' && typeof id !== 'number') {
      console.log('id invalid')
      return {}
    }

    storeStringData('userId', id)
    storeStringData('token', token)

    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`

    const response = await axios.get(`/users/${id}`)
    const currentUser = response.data[0]

    return currentUser
  }
)

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
