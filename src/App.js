import { useEffect } from 'react'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'

import BlogList from './components/BlogList'
import { useDispatch, useSelector } from 'react-redux'
import { login, logout } from './reducers/loginReducer'
import { setMessage } from './reducers/notificationReducer'
import { Link, Route, Routes } from 'react-router-dom'
import Users from './components/Users'
import User from './components/User'
import Blog from './components/Blog'
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

  const padding = { padding: 5 }

  return (
    <div>
      <div>
        <Link style={padding} to="/">
          blogs
        </Link>
        <Link style={padding} to="/users">
          users
        </Link>
        {user ? (
          <>
            {user.name} logged in
            <button onClick={() => dispatch(logout())}>Logout</button>
          </>
        ) : (
          <Togglable buttonLabel="login">
            <LoginForm />
          </Togglable>
        )}
      </div>
      <h1>Blogs</h1>
      <Notification />

      <Routes>
        <Route path="/users/:id" element={<User />} />
        <Route path="/users" element={<Users />} />
        <Route path="/blogs/:id" element={<Blog />} />
        <Route path="/blogs/new" element={<BlogForm />} />
        <Route path="/" element={<BlogList />} />
      </Routes>
    </div>
  )
}

export default App
