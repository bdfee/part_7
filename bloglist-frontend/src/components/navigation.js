import { useMatch, Link } from 'react-router-dom'
import Notification from './notification'
import Logout from './logout'

const Navigation = () => {
  const usersMatch = useMatch('/users/*')

  return (
    <div className='navigation'>
      <div className='navigation-links'>
        <Link id='home' to='/'>
          {(usersMatch) ? 'blogs' : <b>blogs</b>}
        </Link>
        <Link to='/users'>
          {(usersMatch) ? <b>users</b> : 'users'}
        </Link>
        <Logout />
        <Notification />
      </div>
    </div>
  )
}
export default Navigation