import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { getAuth } from 'firebase/auth'
import { getFirestore, collection, doc, getDoc } from 'firebase/firestore'

const initialState = {
  value: {},
  status: 'idle',
  error: null,
}

export const fetchUser = createAsyncThunk('user/fetchUser', async () => {
  const auth = getAuth()

  if (auth.currentUser) {
    const db = getFirestore()

    const usersCol = collection(db, 'users')
    const userRef = doc(usersCol, auth.currentUser.uid)
    const currentUser = await getDoc(userRef)

    if (currentUser.exists) return currentUser.data()
    else console.log('user does not exist')
    return {}
  }

  console.log('no current user')
  return {}
})

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchUser.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.value = { ...state.value, ...action.payload }
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  },
})

export const selectUser = (state) => state.user.value
export const selectUserStatus = (state) => state.user.status
export const selectUserError = (state) => state.user.error

export default userSlice.reducer
