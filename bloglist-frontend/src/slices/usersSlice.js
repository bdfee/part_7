import userService from '../services/users'
import { createSlice } from '@reduxjs/toolkit'

const usersSlice = createSlice({
  name: 'users',
  initialState: [],
  reducers: {
    setUsers(state, action) {
      return action.payload
    },
    appendUser(state, action) {
      state.push(action.payload)
    }
  }
})

export const { setUsers, appendUser } = usersSlice.actions

export const initializeUsers = () => {
  return async dispatch => {
    const users = await userService.getAll()
    dispatch(setUsers(users.map(user => {
      user.createdAt = new Date(user.createdAt).toLocaleString()
      return user
    })))
  }
}

export const createUser = (userObj) => {
  return async dispatch => {
    const newUser = await userService.addUser(userObj)
    dispatch(appendUser(newUser))
  }
}

export default usersSlice.reducer