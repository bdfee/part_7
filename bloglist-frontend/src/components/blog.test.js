import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './blog'
import userEvent from '@testing-library/user-event'

const blog = {
  title: 'blog-title',
  author: 'blog-author',
  url: 'blog-url',
  likes: 'blog-likes',
  user: {
    username: 'blog-user-username',
    name: 'blog-user-name',
    id: 'blog-user-id'
  }
}

const user = {
  username: 'test-username',
  name: 'test-name',
  id: 'test-id'
}

const mockHandler = jest.fn()

test('renders author and title, does not render url or number of likes, by default', () => {
  render(
    <Blog
      blog={blog}
      likeBlog={mockHandler}
      removeBlog={mockHandler}
      user={user}
    />
  )

  const blogTitleAuthor = screen.getByText('blog-title blog-author')
  expect(blogTitleAuthor).toBeDefined()

  const blogTogglableURL = screen.queryByText('blog-url')
  expect(blogTogglableURL).toBeNull()

  const blogTogglableLikes = screen.queryByText('blog-likes')
  expect(blogTogglableLikes).toBeNull()
})

test('renders url and number of likes when toggled', async () => {
  render(
    <Blog
      blog={blog}
      likeBlog={mockHandler}
      removeBlog={mockHandler}
      user={user}
    />
  )

  const sessionUser = userEvent.setup()

  const button = screen.getByText('view')
  await sessionUser.click(button)

  const blogTogglableURL = screen.getByText('blog-url')
  expect(blogTogglableURL).toBeDefined()

  const blogTogglableLikes = screen.getByText('blog-likes')
  expect(blogTogglableLikes).toBeDefined()
})

test('like button handler is called twice when clicked twice', async () => {
  const mockLikeHandler = jest.fn()

  render(
    <Blog
      blog={blog}
      likeBlog={mockLikeHandler}
      removeBlog={mockHandler}
      user={user}
    />
  )

  const sessionUser = userEvent.setup()

  const viewButton = screen.getByText('view')
  await sessionUser.click(viewButton)

  const likeButton = screen.getByText('like')
  await sessionUser.dblClick(likeButton)

  expect(mockLikeHandler.mock.calls).toHaveLength(2)
})
