import axios from 'axios'
const baseUrl = '/api/users'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
}

const addUser = async (userObj) => {
  const response = await axios.post(baseUrl, userObj)
  return response.data
}

export default { getAll, addUser }