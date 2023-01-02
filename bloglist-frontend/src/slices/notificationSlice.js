import { createSlice } from '@reduxjs/toolkit'

const initialState = [null, null]

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    notification(_, action) {
      return action.payload
    }
  }
})

export const { notification } = notificationSlice.actions

export const setNotification = (message) => {
  return dispatch => {
    dispatch(notification(message))
    setTimeout(() => {
      dispatch(notification([null, null]))
    }, 3000)
  }
}

export default notificationSlice.reducer