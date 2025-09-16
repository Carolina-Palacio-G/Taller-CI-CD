const { simulateNotification, getAllNotifications } = require('../services/notify.service');

const sendNotification = (req, res) => {
  const { nombre, email, mensaje } = req.body;
  if (!nombre || !email || !mensaje) {
    return res.status(400).json({ message: 'Faltan datos obligatorios' });
  }
  simulateNotification(nombre, email, mensaje);
  res.status(200).json({ message: 'Notificación enviada' });
};

const listNotifications = (_req, res) => {
  const all = getAllNotifications();
  res.json({ count: all.length, items: all });
};

module.exports = { sendNotification, listNotifications };

