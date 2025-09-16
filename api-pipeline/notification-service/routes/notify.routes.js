const express = require('express');
const router = express.Router();
const { sendNotification, listNotifications } = require('../controllers/notify.controller');

router.post('/send', sendNotification);
router.get('/all', listNotifications);

module.exports = router;
