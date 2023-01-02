import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
}

const create = async (newBlog) => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

const like = async (likeObj) => {
  // blog id and likes
  const response = await axios.put(`${baseUrl}/${likeObj.id}`, { likes: likeObj.likes + 1 })
  return response.data
}

const remove = async (blogId) => {
  // blog id
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.delete(`${baseUrl}/${blogId}`, config)
  return response.data
}

const comment = async (commentObj) => {
  const response = await axios.post(`${baseUrl}/${commentObj.id}/comments`, commentObj)
  return response.data
}

export default { getAll, setToken, create, like, remove, comment }