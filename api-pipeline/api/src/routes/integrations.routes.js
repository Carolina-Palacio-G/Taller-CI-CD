const express = require('express');
const router = express.Router();

const { registerUser, loginUser } = require('../services/auth.client');
const { sendNotification } = require('../services/notify.client');

router.post('/auth/register', async (req, res) => {
  try {
    const result = await registerUser(req.body);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/auth/login', async (req, res) => {
  try {
    const result = await loginUser(req.body);
    res.status(200).json(result);
  } catch (err) {
    res.status(401).json({ error: err.response?.data?.message || 'Error de login' });
  }
});


router.post('/notify', async (req, res) => {
  try {
    const result = await sendNotification(req.body);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
