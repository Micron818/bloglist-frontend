import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../reducers/loginReducer'
import { getAll } from '../reducers/userReducer'
import LoginForm from './LoginForm'
import Togglable from './Togglable'

const Users = () => {
  const dispatch = useDispatch()
  const user = useSelector(({ login }) => login.user)
  const users = useSelector(({ users }) => users.users)
  useEffect(() => {
    dispatch(getAll())
  }, [])

  return (
    <>
      {/* {user ? (
        <div>
          <div>{user.name} logged in</div>
          <button onClick={() => dispatch(logout())}>Logout</button>
        </div>
      ) : (
        <Togglable buttonLabel="login">
          <LoginForm />
        </Togglable>
      )} */}
      <h1>Users</h1>

      <table>
        <thead>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

export default Users
