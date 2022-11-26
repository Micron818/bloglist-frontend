import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [blog, setBlog] = useState({ title: '', author: '', url: '' })

  const addBlog = (event) => {
    event.preventDefault()
    createBlog(blog)

    setBlog({ title: '', author: '', url: '' })
  }

  return (
    <div>
      <h2>Create a new Blog</h2>

      <form onSubmit={addBlog}>
        <div>
          title:
          <input
            type="text"
            value={blog.title}
            onChange={({ target }) => setBlog({ ...blog, title: target.value })}
            id="title"
          />
        </div>
        <div>
          author:
          <input
            type="text"
            value={blog.author}
            onChange={({ target }) =>
              setBlog({ ...blog, author: target.value })
            }
            id="author"
          />
        </div>
        <div>
          url:
          <input
            type="text"
            value={blog.url}
            onChange={({ target }) => setBlog({ ...blog, url: target.value })}
            id="url"
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default BlogForm
