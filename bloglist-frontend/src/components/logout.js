import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { clearUser } from '../slices/userSlice'
import { setNotification } from '../slices/notificationSlice'

const Logout = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector(state => state.user)

  const handleLogout = async (event) => {
    event.preventDefault()
    dispatch(clearUser())
    window.localStorage.removeItem('loggedUser')
    navigate('/')
    dispatch(setNotification(['logout successful', 200]))
  }

  return (
    <div className={'logout'}>
      {`${user.name} is logged in`}
      <button type="button" id="login-button" onClick={handleLogout}>
        logout
      </button>
    </div>
  )
}

export default Logout
