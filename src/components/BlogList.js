import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAll } from '../reducers/blogReducer'
import Blog from './Blog'

const BlogList = ({ user }) => {
  const dispatch = useDispatch()
  const blogs = useSelector(({ blogs }) => {
    return blogs.blogs
  })
  useEffect(() => {
    dispatch(getAll())
  }, [])

  return (
    <ul>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} user={user} />
      ))}
    </ul>
  )
}

export default BlogList
