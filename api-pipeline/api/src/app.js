const express = require('express');
const cors = require('cors');

const usersRoutes = require('./routes/users.routes');
const postsRoutes = require('./routes/posts.routes');

const integrationRoutes = require('./routes/integrations.routes');

const errorMiddleware = require('./middlewares/error.middleware');

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/users', usersRoutes);
app.use('/api/posts', postsRoutes);

app.use('/api', integrationRoutes);

app.use(errorMiddleware);

module.exports = app;
