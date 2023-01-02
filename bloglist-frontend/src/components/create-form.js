import { useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from '../slices/notificationSlice'
import Togglable from '../components/togglable'
import { addBlog } from '../slices/blogsSlice'

const CreateForm = () => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('https://')

  const createFormRef = useRef()
  const dispatch = useDispatch()
  const activeUser = useSelector(state => state.user)

  const createBlog = async (blogObject) => {
    try {
      dispatch(addBlog(blogObject))
      dispatch(setNotification([`${blogObject.title} by ${blogObject.author} added`, 200]))
      createFormRef.current.toggleVisibility()
    } catch (e) {
      dispatch(setNotification([e.message, e.response.status]))
    }
  }

  const isHttpValid = () => {
    let testUrl = ''
    try {
      testUrl = new URL(url)
    } catch (_) {
      return false
    }
    return testUrl.protocol === 'http:' || testUrl.protocol === 'https:'
  }

  const handleAddBlog = (e) => {
    e.preventDefault()
    if (!isHttpValid()) {
      dispatch(setNotification(['please include https in web address', 401]))
    } else {
      createBlog({
        title,
        author,
        url,
        activeUser
      })
      setTitle('')
      setAuthor('')
      setUrl('')
    }
  }

  return (
    <Togglable buttonLabel="add blog" ref={createFormRef}>
      <h2>create new</h2>
      <form onSubmit={handleAddBlog}>
        <div>
          <label htmlFor="title-input">title:</label>
          <input
            id="title-input"
            type="text"
            value={title}
            name="Title"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="author-input">author:</label>
          <input
            id="author-input"
            type="text"
            value={author}
            name="Author"
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="url-input">url:</label>
          <input
            id="url-input"
            type="text"
            value={url}
            name="Url"
            onChange={(e) => setUrl(e.target.value)}
          />
        </div>
        <button type="submit" id="create-blog-button">
          create
        </button>
      </form>
    </Togglable>
  )
}

export default CreateForm
