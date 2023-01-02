import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const UsersView = () => {

  const users = useSelector(state => state.users)
  const bloglist = useSelector(state => state.blogs)

  return (
    <div className='users-view'>
      <h2>users</h2>
      <table>
        <thead>
          <tr>
            <th>name</th>
            <th>blogs created</th>
            <th>joined dated</th>
          </tr>
        </thead>
        <tbody>
          {users.map(({ id, name, createdAt }) => {
            const userBlogs = bloglist.filter(blog => blog.user.id === id)
            return (
              <tr key={id}>
                <td>
                  <Link to={`/users/${id}`}>
                    {name}
                  </Link>
                </td>
                <td>{userBlogs.length}</td>
                <td>{createdAt}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default UsersView