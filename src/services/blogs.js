import axios from "axios";
const baseUrl = "/api/blogs";
let config = {};

const setToken = (newToken) => {
  config = {
    headers: { Authorization: newToken },
  };
};

const getAll = async () => {
  const request = await axios.get(baseUrl, config);
  const data= request.data;
  return data;  
};

const create = async (blog) => {
  const response = await axios.post(baseUrl, blog, config);
  return response.data;
};

export default { setToken, getAll, create };
