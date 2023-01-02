import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  name: '',
  username: '',
  token: null,
  id: ''
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    user(state, action) {
      return action.payload
    },
  }
})

export const { user } = userSlice.actions

export const setUser = (userObj) => {
  return dispatch => {
    dispatch(user(userObj))
  }
}

export const clearUser = () => {
  return dispatch => {
    dispatch(user(initialState))
  }
}

export default userSlice.reducer