import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

const User = () => {
  const users = useSelector(({ users }) => users.users)
  const id = useParams().id
  const user = users.find((n) => n.id === id)
  if (!user) {
    return null
  }
  return (
    <>
      <h1>{user.name}</h1>
      <h3>added blogs</h3>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </>
  )
}
export default User
