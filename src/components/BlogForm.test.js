import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

describe('<BlogForm />', () => {
  test('updates parent state and calls onSubMit', async () => {
    const createBlog = jest.fn()

    const { container } = render(<BlogForm createBlog={createBlog} />)

    const title = container.querySelector('#title')
    const author = container.querySelector('#author')
    const url = container.querySelector('#url')
    const createButton = screen.getByText('create')

    await userEvent.type(title, 'testing title')
    await userEvent.type(author, 'jest demo')
    await userEvent.type(url, 'testing url')

    await userEvent.click(createButton)

    screen.debug(title)
    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].title).toBe('testing title')
    expect(createBlog.mock.calls[0][0].author).toBe('jest demo')
    expect(createBlog.mock.calls[0][0].url).toBe('testing url')
  })
})
