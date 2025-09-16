const express = require('express');
const app = express();
const authRoutes = require('./routes/auth.routes');

app.use(express.json());
app.use('/auth', authRoutes);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Auth Service running on port ${PORT}`);
});
