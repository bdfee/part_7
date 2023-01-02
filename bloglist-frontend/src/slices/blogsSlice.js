import blogService from '../services/blogs'
import { createSlice } from '@reduxjs/toolkit'

const initialState = []

const blogsSlice = createSlice({
  name: 'blogs',
  initialState,
  reducers: {
    setBlogs(state, action) {
      return action.payload
    },
    appendBlog(state, action) {
      state.push(action.payload)
    },
    addLike(state, action) {
      return state.map(blog => {
        if (blog.id === action.payload) {
          return { ...blog, likes: blog.likes + 1 }
        }
        return blog
      })
    },
    removeBlog(state, action) {
      return state.filter(({ id }) => id !== action.payload)
    },
    appendComment(state, action) {
      state.map(blog => {
        if (blog.id === action.payload.id)
          return { ...blog, comments: blog.comments.push(action.payload.comment) }
        return blog
      })
    }
  }
})

export const { setBlogs, appendBlog, addLike, removeBlog, appendComment } = blogsSlice.actions
export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs.map(blog => {
      blog.createdAt = new Date(blog.createdAt).toLocaleString()
      return blog
    })
    ))
  }
}

export const addBlog = (blogObject) => {
  return async dispatch => {
    const newBlog = await blogService.create(blogObject)
    dispatch(appendBlog(newBlog))
  }
}

export const likeBlog = (likeObj) => {
  return async dispatch => {
    await blogService.like(likeObj)
    dispatch(addLike(likeObj.id))
  }
}

export const deleteBlog = (blogId) => {
  return async dispatch => {
    await blogService.remove(blogId)
    dispatch(removeBlog(blogId))
  }
}

export const addComment = (commentObj) => {
  return async dispatch => {
    await blogService.comment(commentObj)
    dispatch(appendComment(commentObj))
  }
}

export default blogsSlice.reducer