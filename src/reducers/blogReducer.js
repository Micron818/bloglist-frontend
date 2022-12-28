import { createSlice } from '@reduxjs/toolkit'
import blogServices from '../services/blogs'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: { message: {}, blogs: [] },
  reducers: {
    setMessage(state, action) {
      state.message = action.payload
    },
    getAll(state, action) {
      const blogs = action.payload.sort((a, b) => b.likes - a.likes)
      state.blogs = blogs
    },
    createBlog(state, action) {
      const createdBlog = action.payload
      state.blogs.push(createdBlog)
    },
    updateBlog(state, action) {
      const updatedBlog = action.payload
      state.blogs = state.blogs.map((blog) =>
        blog.id !== updatedBlog.id ? blog : updatedBlog
      )
    },
    removeBlog(state, action) {
      const blog = action.payload
      if (window.confirm(`remove blog ${blog.title} by ${blog.author}`)) {
        state.blogs = state.blogs.filter((value) => value.id !== blog.id)
      }
    },
  },
})

const getAll = () => {
  return async (dispatch) => {
    const blogs = await blogServices.getAll()
    dispatch(blogSlice.actions.getAll(blogs))
  }
}

const createBlog = (blog) => {
  return async (dispatch) => {
    try {
      const createdBlog = await blogServices.create(blog)
      dispatch(blogSlice.actions.createBlog(createdBlog))
      dispatch(
        blogSlice.actions.setMessage({
          type: 'note',
          message: 'created a new blog!',
        })
      )
    } catch (exception) {
      dispatch(
        blogSlice.actions.setMessage({
          type: 'error',
          message: exception.response.data.error || 'wrong credentials',
        })
      )
    }
  }
}

const removeBlog = (id) => {
  return async (dispatch) => {
    const removedBlog = await blogServices.remove(id)
    dispatch(blogSlice.actions.removeBlog(removedBlog))
  }
}

const updateBlog = (blog) => {
  return async (dispatch) => {
    const updatedBlog = await blogServices.update({
      ...blog,
      user: blog.user ? blog.user.id : null,
    })
    dispatch(blogSlice.actions.updateBlog(updatedBlog))
  }
}

const addComment = (blog, comment) => {
  return async (dispatch) => {
    const comments = await blogServices.addComment(blog.id, comment)
    const updatedBlog = { ...blog, comments }
    dispatch(blogSlice.actions.updateBlog(updatedBlog))
  }
}

export { getAll, createBlog, updateBlog, removeBlog, addComment }
export default blogSlice.reducer
