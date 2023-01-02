import { useSelector } from 'react-redux'
import { useMatch } from 'react-router-dom'
import { Link } from 'react-router-dom'

const UserView = () => {
  const users = useSelector(state => state.users)
  const match = useMatch('/users/:id')
  const user = match
    ? users.find(user => user.id === match.params.id)
    : null

  if (user) {
    const { name, blogs } = user

    return (
      <div className='user-view'>
        <h2>{name}</h2>
        { (blogs.length) ?
          <h3>added blogs</h3> :
          <div>blogs added by this user will appear here</div>
        }
        <ul>
          {blogs.map(({ id, title, author }) => {
            return (
              <li key={id}>
                <Link to={`/blogs/${id}`}>
                  {`${title} by ${author}`}
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
}

export default UserView