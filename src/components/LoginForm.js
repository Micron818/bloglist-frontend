import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { login } from '../reducers/loginReducer'

const LoginForm = () => {
  const [username, setUsername] = useState('hellas')
  const [password, setPassword] = useState('hellas')
  const dispatch = useDispatch()
  const handleLogin = (event) => {
    event.preventDefault()
    dispatch(login(username, password))
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            value={username}
            onChange={({ target }) => {
              setUsername(target.value)
            }}
            id="username"
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            id="password"
          />
        </div>
        <button type="submit" id="login-button">
          login
        </button>
      </form>
    </div>
  )
}
export default LoginForm
