import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { initializeUsers, createUser } from '../slices/usersSlice'
import { setNotification } from '../slices/notificationSlice'
import { useDispatch } from 'react-redux'

const CreateUser = ({ setToggleUserForm }) => {
  const [ username, setUsername ] = useState('')
  const [ displayName, setDisplayName ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ passwordConfirm, setPasswordConfirm] = useState('')
  const [ isUsernameValid, setIsUsernameValid ] = useState(false)

  const dispatch = useDispatch()
  const usersList = useSelector(state => state.users)

  useEffect(() => {
    dispatch(initializeUsers())
  },[])

  const usernameValidStyle = {
    color: (isUsernameValid) ? 'green' : 'red',
    display: 'inline-block',
    marginLeft: '5px'
  }

  const handleCreateUser = (e) => {
    e.preventDefault()
    if ( isUsernameValid
    && password === passwordConfirm
    && displayName.length >= 3
    && password.length >= 5
    ) {
      const userObj = {
        displayName,
        username,
        password
      }
      dispatch(createUser(userObj))
      dispatch(setNotification([`${displayName} created!`, 200]))
      setToggleUserForm(false)
      setUsername('')
      setDisplayName('')
      setPassword('')
      setPasswordConfirm('')
    } else {
      dispatch(setNotification(['invalid submission, no account created', 401]))
    }
  }

  const handleSetUsername = ({ target }) => {
    setUsername(target.value)
    const existingUsername = usersList.filter(user => user.username === target.value)
    if (existingUsername.length ) {
      return setIsUsernameValid(false)
    }
    setIsUsernameValid(true)
  }

  return (
    <div className='user-form'>
      <h2>create user account</h2>
      <form>
        <div>
          <input
            required
            id='display-name-input'
            placeholder='display name'
            value={displayName}
            type='text'
            onChange={({ target }) => setDisplayName(target.value)}
          />
        </div>
        <div>
          <input
            required
            id='new-username-input'
            placeholder='username'
            type='text'
            value={username}
            onChange={handleSetUsername}
          />
          {(username.length) ?
            <div
              style={usernameValidStyle}
            >
              {(isUsernameValid) ? 'user name available!' : 'sorry, this username is taken'}
            </div> :
            null
          }
        </div>
        <div>
          <input
            required
            id='new-password-input'
            placeholder='password'
            type='password'
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <div>
          <input
            required
            id='confirm-password-input'
            placeholder='re-enter password'
            type='password'
            value={passwordConfirm}
            onChange={({ target }) => setPasswordConfirm(target.value)}
          />
          <button
            id='create-user-account-button'
            type='submit'
            onClick={handleCreateUser}
          >create
          </button>
        </div>
      </form>
    </div>
  )
}

export default CreateUser