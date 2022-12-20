import { createSlice } from '@reduxjs/toolkit'
import blogServices from '../services/blogs'
import loginService from '../services/login'

const loginSlice = createSlice({
  name: 'login',
  initialState: {},
  reducers: {
    setMessage(state, action) {
      state.message = action.payload
    },
    setUser(state, action) {
      const user = action.payload
      blogServices.setToken(user.token)
      state.user = user
      state.message = { type: 'note', message: 'login and got all blogs' }
    },

    logout(state, action) {
      window.localStorage.removeItem('loggedBlogappUser')
      state.user = null
      state.message = { type: 'note', message: 'login out' }
    },
  },
})

const login = (username, password) => {
  const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
  if (loggedUserJSON) {
    const user = JSON.parse(loggedUserJSON)
    return (dispatch) => dispatch(loginSlice.actions.setUser(user))
  }

  return async (dispatch) => {
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      dispatch(loginSlice.actions.setUser(user))
    } catch (exception) {
      dispatch(
        loginSlice.actions.setMessage({
          type: 'error',
          message: exception.response.data.error || 'wrong credentials',
        })
      )
    }
  }
}

export { login }

export const { setMessage, logout } = loginSlice.actions

export default loginSlice.reducer
