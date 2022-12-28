import axios from 'axios'
const baseUrl = '/api/users'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  const data = response.data
  return data
}

const userServices = {
  getAll,
}

export default userServices
