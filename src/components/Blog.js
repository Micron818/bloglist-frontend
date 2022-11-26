import { useState } from 'react'
import PropTypes from 'prop-types'
import BlogContent from './BlogContent'
import blogService from '../services/blogs'

const Blog = ({ initBlog, removeBlog, user }) => {
  const [blog, setBlog] = useState(initBlog)
  const [visbleContent, setVisibleContent] = useState(false)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const buttonLabel = visbleContent ? 'hide' : 'show'

  const handleAddLike = async () => {
    const updatedBlog = await blogService.update({
      id: blog.id,
      likes: blog.likes + 1,
    })
    setBlog({ ...blog, likes: updatedBlog.likes })
  }

  return (
    <div style={blogStyle} className="blog">
      <div>
        {blog.title} {blog.author}
        <button onClick={() => setVisibleContent(!visbleContent)}>
          {buttonLabel}
        </button>
      </div>

      {visbleContent && (
        <BlogContent
          blog={blog}
          removeBlog={removeBlog}
          user={user}
          handleAddLike={handleAddLike}
        />
      )}
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.shape({ title: PropTypes.string, author: PropTypes.string }),
}

export default Blog
