import { useSelector } from 'react-redux'
import { useMatch, Link } from 'react-router-dom'
import LikeButton from '../../components/buttons/like-button'
import Comments from '../../components/comments'

const BlogView = () => {
  const blogs = useSelector(state => state.blogs)
  const match = useMatch('/blogs/:id')
  const blog = match
    ? blogs.find(blog => blog.id === match.params.id)
    : null

  if (blog) {
    const { title, url, likes, user, createdAt } = blog

    return (
      <div className='blog-view'>
        <h2>{title}</h2>
        <div><a href={url}>{url}</a></div>
        <div>
          {`${likes} ${likes === 1 ? 'like' : 'likes'}`}
          <LikeButton blog={blog} />
        </div>
        <div className='submitted-by'>submitted by <Link to={`/users/${user.id}`}>{user.name}</Link>, {createdAt}</div>
        <Comments blog={blog} />
      </div>
    )
  }
}

export default BlogView