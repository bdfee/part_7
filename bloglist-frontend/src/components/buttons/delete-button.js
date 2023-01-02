import { deleteBlog } from '../../slices/blogsSlice'
import { setNotification } from '../../slices/notificationSlice'
import { useDispatch, useSelector } from 'react-redux'

const DeleteButton = ({ blog }) => {
  const dispatch = useDispatch()
  const activeUser = useSelector(state => state.user)
  const { title, author, id, user } = blog

  if (activeUser.id === user.id) {
    const remove = async () => {
      if (window.confirm(`remove ${title} by ${author}?`)) {
        dispatch(deleteBlog(id))
        dispatch(setNotification(
          [`${title} by ${author} removed`, 200]
        ))
      }
    }

    return (
      <button id="delete-button" value={id} onClick={remove}>
        remove
      </button>
    )
  }
}

export default DeleteButton