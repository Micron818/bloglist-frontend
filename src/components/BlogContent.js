import { useDispatch, useSelector } from 'react-redux'
import { updateBlog, removeBlog } from '../reducers/blogReducer'

const BlogContent = ({ blog }) => {
  const dispatch = useDispatch()
  const user = useSelector(({ login }) => {
    return login.user
  })

  return (
    <div className="blogContent">
      <p>{blog.url} </p>
      <div>
        likes: {blog.likes}{' '}
        <button
          onClick={() =>
            dispatch(updateBlog({ ...blog, likes: blog.likes + 1 }))
          }
        >
          like
        </button>
      </div>
      <p>{blog.user && blog.user.name} </p>
      {user && user.id === (blog.user && blog.user.id) && (
        <button onClick={() => dispatch(removeBlog(blog.id))}>remove</button>
      )}
    </div>
  )
}
export default BlogContent
