import { useState } from 'react'
import PropTypes from 'prop-types'
import LikeButton from './buttons/like-button'
import DeleteButton from './buttons/delete-button'
import { Link } from 'react-router-dom'

const Blog = ({ blog }) => {
  const [showDetails, setShowDetails] = useState(false)
  const { title, author, url, likes, user, id, comments, createdAt } = blog
  // const createdDate = new Date(createdAt).toLocaleString()

  return (
    <div className="blog">
      <div id="test-blog-title-author">
        <Link to={`/blogs/${id}`}>
          <b>{`${title} by ${author}`}</b>
        </Link>
        <button
          id="view-button"
          onClick={() => {
            setShowDetails(!showDetails)
          }}
        >
          {showDetails === true ? 'close' : 'expand'}
        </button>
        <LikeButton blog={blog} />
        <DeleteButton blog={blog} />
      </div>
      {showDetails === true ? (
        <div>
          <div className='blog-url'>
            <a href={url}>link to article</a>
          </div>
          <div>
            {`${likes} ${likes === 1 ? 'like' : 'likes'}`}
          </div>
          <div>
            {`${comments.length} ${comments.length === 1 ? 'comment' : 'comments'}`}
          </div>
          <div className='submitted-by'>submitted by <Link to={`/users/${user.id}`}>{user.name}</Link>, {createdAt}</div>
        </div>
      ) : null}
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object
}

export default Blog
