import { likeBlog } from '../../slices/blogsSlice'
import { setNotification } from '../../slices/notificationSlice'
import { useDispatch } from 'react-redux'

const LikeButton = ({ blog }) => {
  const dispatch = useDispatch()

  const addLike = (e) => {
    e.preventDefault()
    const likeObj = { id: blog.id, likes: blog.likes }
    dispatch(likeBlog(likeObj))
    dispatch(setNotification([`${blog.title} by ${blog.author} liked!`, 200]))
  }

  return (
    <button onClick={addLike}>
      like
    </button>
  )
}

export default LikeButton