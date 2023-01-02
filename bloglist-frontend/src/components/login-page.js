import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import LoginForm from '../components/login-form'
import Notification from '../components/notification'
import Header from '../components/header'
import UserForm from '../components/user-form'
import { setUser } from '../slices/userSlice'
import { initializeBlogs } from '../slices/blogsSlice'
import { initializeUsers } from '../slices/usersSlice'
import blogService from '../services/blogs'

export const LoginPage = () => {
  const [ toggleUserForm, setToggleUserForm] = useState(false)

  const dispatch = useDispatch()
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
      blogService.setToken(user.token)
      dispatch(initializeBlogs())
      dispatch(initializeUsers())
    }
  }, [])

  return (
    <>
      <Notification />
      <Header />
      <button
        id='login-join-toggle'
        value={+ toggleUserForm}
        onClick={() => setToggleUserForm(!toggleUserForm)}
      >
        {(toggleUserForm ? 'login' : 'join')}
      </button>
      {(toggleUserForm) ?
        <UserForm setToggleUserForm={setToggleUserForm}/> :
        <LoginForm />
      }
    </>
  )
}

export default LoginPage