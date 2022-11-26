import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import BlogContent from './BlogContent'

describe('<Blog />', () => {
  let blogContainer

  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'jest',
    url: 'testing url address',
    likes: 1,
  }

  beforeEach(() => {
    blogContainer = render(<Blog initBlog={blog} />).container
  })

  test('renders Blog title', () => {
    const blog = blogContainer.querySelector('.blog')
    expect(blog).toHaveTextContent(
      'Component testing is done with react-testing-library'
    )
    expect(blog).toHaveTextContent('jest')
    expect(blog).not.toHaveTextContent('testing url address')
    expect(blog).not.toHaveTextContent('likes: 1')
  })

  test('renders Blog Content', async () => {
    const blog = blogContainer.querySelector('.blog')

    const button = screen.getByText('show')
    await userEvent.click(button)

    expect(blog).toHaveTextContent('testing url address')
    expect(blog).toHaveTextContent('likes: 1')
  })

  test('call Blog Content add like', async () => {
    const mockHandler = jest.fn()
    render(<BlogContent blog={blog} handleAddLike={mockHandler} />)
    const button = screen.getByText('like')
    await userEvent.click(button)
    await userEvent.click(button)
    expect(mockHandler.mock.calls).toHaveLength(2)
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })
})
