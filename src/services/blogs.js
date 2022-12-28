import axios from 'axios'
const baseUrl = '/api/blogs'
let config = {}

const setToken = (newToken) => {
  config = {
    headers: { Authorization: newToken },
  }
}

const getAll = async () => {
  const response = await axios.get(baseUrl, config)
  const data = response.data
  return data
}

const getById = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`, config)
  const data = response.data
  return data
}

const update = async (blog) => {
  const response = await axios.put(`${baseUrl}/${blog.id}`, blog, config)
  return response.data
}

const create = async (blog) => {
  const response = await axios.post(baseUrl, blog, config)
  return response.data
}

const remove = async (id) => {
  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response.data
}

const sortByLikes = async (blogs) => {
  const compareFn = (a, b) => {
    return b.likes - a.likes
  }
  blogs = blogs.sort(compareFn)
  return blogs
}

const addComent = async (id, comment) => {
  const response = await axios.put(
    `${baseUrl}/${id}/comments`,
    { comment },
    config
  )
  const comments = response.data.comments
  comments.push(comment)
  return comments
}

const blogServices = {
  setToken,
  getAll,
  create,
  getById,
  update,
  remove,
  sortByLikes,
  addComment: addComent,
}

export default blogServices
