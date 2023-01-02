import { useState } from 'react'
import { addComment } from '../slices/blogsSlice'
import { useDispatch } from 'react-redux'

const Comments = ({ blog }) => {
  const [comment, setComment] = useState('')
  const dispatch = useDispatch()
  const { comments, id } = blog

  const handleComment = (e) => {
    e.preventDefault()
    dispatch(addComment({ id, comment }))
    setComment('')
  }

  return (
    <div className='comments'>
      <h3>
        comments
        {comments.length > 0 ? ` (${comments.length})` : null}
      </h3>
      <form>
        <input
          value={comment}
          onChange={({ target }) => setComment(target.value)}
        />
        <button
          type='submit'
          onClick={handleComment}>add comment
        </button>
      </form>
      <ul>
        {comments.map((comment, i) =>
          <li key={'comment_' + i}>{comment}</li>
        )}
      </ul>
    </div>
  )
}

export default Comments