import Blog from './blog'
import CreateForm from './create-form'
import { useSelector } from 'react-redux'

const BlogsList = () => {
  const blogs = useSelector(state => state.blogs)
  const sortLikeDesc = [ ...blogs ].sort((a, b) => b.likes - a.likes)
  return (
    <div>
      <div className="blogs-list"
        aria-description='blogs listed by title and author. click add blog to open the creation form'
      >
        <h2>blogs</h2>
        <CreateForm  />
        {sortLikeDesc.map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
          />
        ))}
      </div>
    </div>
  )
}

export default BlogsList