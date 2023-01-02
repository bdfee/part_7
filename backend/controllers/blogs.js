const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const { userExtractor } = require('../utils/middleware')

const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
  const blog = await Blog.find({}).populate('user', 'username name id comments createdAt')
  if (blog) {
    response.json(blog)
  } else {
    response.status(404).end()
  }
})

blogsRouter.post('/:id/comments', async (request, response) => {
  const { id, comment } = request.body
  try {
    const blog = await Blog.findById({ _id: id })
    blog.comments = blog.comments.concat(comment)
    const savedBlog = await blog.save()

    response.status(201).json(savedBlog)
  } catch(e) {
    response.status(401).json({ error: 'blog not found by ID' })
  }
})

blogsRouter.post('/', userExtractor, async (request, response) => {
  const { title, url, author, likes } = request.body

  if (!title || !url) {
    response.status(404).end()
  } else {
    try {
      const decodedToken = jwt.verify(request.token, process.env.SECRET)
      const user = await User.findById(decodedToken.id)

      const blog = new Blog({
        title,
        author,
        url,
        likes,
        user
      })

      const savedBlog = await blog.save()
      user.blogs = user.blogs.concat(savedBlog._id)
      await user.save()

      response.status(201).json(savedBlog)
    } catch (e) {
      response.status(401).json({ error: 'token incorrect' })
    }
  }
})

blogsRouter.delete('/:id', userExtractor, async (request, response) => {
  if (!request.token) response.status(401).json({ error: 'token missing' })

  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    const user = await User.findById(decodedToken.id)
    const blog = await Blog.findById(request.params.id)

    if (user._id.toString() === blog.user.toString()) {
      await Blog.findByIdAndRemove(request.params.id)
      response.status(204).end()
    } else {
      response.status(401).json({ error: 'unauthorized to delete' })
    }
  } catch (e) {
    response.status(401).json({ error: 'token incorrect' })
  }
})

blogsRouter.put('/:id', async (request, response) => {
  const { likes } = request.body
  try {
    const blog = await Blog.findByIdAndUpdate(
      request.params.id, 
      likes, 
      { new: true }
    )
    response.json(blog)
  } catch(e) {
    response.status(401).json({ error: 'blog not found by ID and updated' }) 
  }
})

module.exports = blogsRouter