const express = require('express');
const app = express();
const notifyRoutes = require('./routes/notify.routes');

app.use(express.json());
app.use('/notify', notifyRoutes);

app.get('/health', (_req, res) => res.json({ ok: true, service: 'notification' }));

const PORT = 3002;
app.listen(PORT, () => {
  console.log(`Notification Service running on port ${PORT}`);
});
