import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import CreateForm from './create-form'
import userEvent from '@testing-library/user-event'

test('correct title, author, and URL are passed to create blog handler', async () => {
  const createBlog = jest.fn()

  render(<CreateForm createBlog={createBlog} />)

  const sessionUser = userEvent.setup()

  const input1 = screen.getByLabelText('title:')
  const input2 = screen.getByLabelText('author:')
  const input3 = screen.getByLabelText('url:')
  const addBlog = screen.getByText('create')

  await sessionUser.type(input1, 'test-create-title')
  await sessionUser.type(input2, 'test-create-author')
  await sessionUser.type(input3, 'test-create-url')

  await sessionUser.click(addBlog)

  expect(createBlog.mock.calls[0][0]).toEqual({
    title: 'test-create-title',
    author: 'test-create-author',
    url: 'test-create-url'
  })
})
