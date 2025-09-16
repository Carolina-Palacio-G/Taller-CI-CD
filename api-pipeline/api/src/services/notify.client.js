const axios = require('axios');

const NOTIFY_BASE_URL = 'http://localhost:3002/notify';

async function sendNotification(data) {
  const response = await axios.post(`${NOTIFY_BASE_URL}/send`, data);
  return response.data;
}

module.exports = { sendNotification };
