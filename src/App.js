import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'

import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState({})
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then((allBlogs) => {
      blogService.sortByLikes(allBlogs)
      setBlogs(allBlogs)
      setMessage({ type: 'note', message: 'got all blogs' })
    })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setMessage({ type: 'note', message: 'login and got all blogs' })
    } catch (exception) {
      setMessage({
        type: 'error',
        message: exception.response.data.error || 'wrong credentials',
      })
    }
  }

  const blogFormRef = useRef()

  const addBlog = async (blog) => {
    blogFormRef.current.toggleVisibility()
    try {
      const addedBlog = await blogService.create(blog)
      const resultBlog = await blogService.getById(addedBlog.id)

      setBlogs([...blogs, resultBlog])
      setMessage({ type: 'note', message: 'created a new blog!' })
    } catch (exception) {
      setMessage({
        type: 'error',
        message: exception.response.data.error || 'wrong credentials',
      })
    }
  }

  const removeBlog = async (blog) => {
    if (window.confirm(`remove blog ${blog.title} by ${blog.author}`)) {
      await blogService.remove(blog.id)
      setBlogs(blogs.filter((value) => value.id !== blog.id))
    }
  }

  const handleLogout = async () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
    setMessage({ type: 'note', message: 'login out' })
  }

  return (
    <div>
      <h1>Notes</h1>
      <Notification messageObj={message} />

      {user ? (
        <div>
          {user.name} logged in
          <button onClick={handleLogout}>Logout</button>
          <Togglable buttonLabel="new Blog" ref={blogFormRef}>
            <BlogForm createBlog={addBlog} />
          </Togglable>
        </div>
      ) : (
        <Togglable buttonLabel="login">
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
        </Togglable>
      )}

      <ul>
        {blogs.map((blog) => (
          <Blog
            key={blog.id}
            initBlog={blog}
            removeBlog={() => removeBlog(blog)}
            user={user}
          />
        ))}
      </ul>
    </div>
  )
}

export default App
