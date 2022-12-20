import { useState } from 'react'
import BlogContent from './BlogContent'

const Blog = ({ blog }) => {
  const [visbleContent, setVisibleContent] = useState(false)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const buttonLabel = visbleContent ? 'hide' : 'show'

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
          // user={user}
        />
      )}
    </div>
  )
}

export default Blog
