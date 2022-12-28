import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { updateBlog } from '../reducers/blogReducer'

const Blog = () => {
  const dispatch = useDispatch()
  const [comment, setComment] = useState('')
  const blogs = useSelector(({ blogs }) => blogs.blogs)
  const id = useParams().id
  const blog = blogs.find((n) => n.id === id)
  if (!blog) {
    return null
  }
  const onAddComment = () => {
    // dispatch(addComment(blog, comment))
    const comments = blog.comments.concat(comment)
    const updatedBlog = { ...blog, comments }
    dispatch(updateBlog(updatedBlog))
    setComment('')
  }
  const onAddLikes = () => {
    const likes = blog.likes + 1
    const updatedBlog = { ...blog, likes }
    dispatch(updateBlog(updatedBlog))
  }
  return (
    <>
      <h1>{blog.title}</h1>
      <a href={blog.url}>{blog.url}</a>
      <div>
        {blog.likes} likes
        <button onClick={onAddLikes}>likes</button>
      </div>
      <div>added by {blog.user && blog.user.name}</div>

      <h1>comments</h1>
      <div>
        <input
          type="text"
          value={comment}
          onChange={(event) => setComment(event.target.value)}
        />
        <button onClick={onAddComment}>add comment</button>
      </div>
      <ul>
        {blog.comments.map((comment) => (
          <li key={comment}>{comment}</li>
        ))}
      </ul>
    </>
  )
}
export default Blog
