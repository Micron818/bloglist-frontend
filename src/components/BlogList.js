import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { getAll } from '../reducers/blogReducer'

const BlogList = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const blogs = useSelector(({ blogs }) => blogs.blogs)
  useEffect(() => {
    dispatch(getAll())
  }, [])

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  return (
    <>
      <button onClick={() => navigate('/blogs/new')}>create new</button>

      <ul>
        {blogs.map((blog) => (
          <div key={blog.id} style={blogStyle}>
            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
          </div>
        ))}
      </ul>
    </>
  )
}

export default BlogList
