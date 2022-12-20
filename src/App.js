import { useEffect, useRef } from 'react'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'

import BlogList from './components/BlogList'
import { useDispatch, useSelector } from 'react-redux'
import { login, logout } from './reducers/loginReducer'
import { createBlog } from './reducers/blogReducer'
import { setMessage } from './reducers/notificationReducer'
const App = () => {

  const dispatch = useDispatch()

  const user = useSelector(({ login }) => login.user)

  const loginMessage = useSelector(({ login }) => login.message)
  const blogMessage = useSelector((state) => state.blogs.message)

  useEffect(() => {
    dispatch(setMessage(loginMessage))
  }, [loginMessage])

  useEffect(() => {
    dispatch(login())
  }, [])

  useEffect(() => {
    dispatch(setMessage(blogMessage))
  }, [blogMessage])

  const blogFormRef = useRef()

  const addBlog = (blog) => {
    blogFormRef.current.toggleVisibility()
    dispatch(createBlog(blog))
  }

  return (
    <div>
      <h1>Notes</h1>
      <Notification />
      {user ? (
        <div>
          {user.name} logged in
          <button onClick={() => dispatch(logout())}>Logout</button>
          <Togglable buttonLabel="new Blog" ref={blogFormRef}>
            <BlogForm createBlog={addBlog} />
          </Togglable>
        </div>
      ) : (
        <Togglable buttonLabel="login">
          <LoginForm />
        </Togglable>
      )}

      <BlogList />
    </div>
  )
}

export default App
