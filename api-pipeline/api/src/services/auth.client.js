const axios = require('axios');

const AUTH_BASE_URL = 'http://localhost:3001/auth';

async function registerUser(data) {
  const response = await axios.post(`${AUTH_BASE_URL}/register`, data);
  return response.data;
}

async function loginUser(data) {
  const response = await axios.post(`${AUTH_BASE_URL}/login`, data);
  return response.data;
}

module.exports = { registerUser, loginUser };