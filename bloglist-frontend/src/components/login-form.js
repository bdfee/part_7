import { useState, useRef } from 'react'
import { useDispatch } from 'react-redux'
import blogService from '../services/blogs'
import loginService from '../services/login'
import { setUser } from '../slices/userSlice'
import { setNotification } from '../slices/notificationSlice'
import { initializeBlogs } from '../slices/blogsSlice'
import { initializeUsers } from '../slices/usersSlice'

const LoginForm = () => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()
  const focus = useRef(null)

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      dispatch(setUser(user))
      dispatch(initializeBlogs())
      dispatch(initializeUsers())
      dispatch(setNotification([`welcome back ${user.name}`, 200]))
    } catch (exception) {
      dispatch(setNotification(['wrong username or password', exception.response.status]))
      setTimeout(() => {
        focus.current.focus()
      }, 200)
    }
    setUsername('')
    setPassword('')
  }

  return (
    <div className='login-form'>
      <h2 aria-label='login form for application'>
        log in to application
      </h2>
      <div>
        <form onSubmit={handleLogin}>
          <div>
            <input
              ref={focus}
              aria-label='enter username'
              id='username-input'
              placeholder='username'
              type='text'
              value={username}
              name='Username'
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            <input
              aria-label='enter password'
              id='password-input'
              placeholder='password'
              type='password'
              value={password}
              name='Password'
              onChange={({ target }) => setPassword(target.value)}
            />
            <button
              aria-label='login'
              type='submit'
              id='login-button'
            >
              login
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default LoginForm
