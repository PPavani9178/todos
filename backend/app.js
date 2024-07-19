const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const taskRoutes = require('./routes/taskRoutes');

const app = express();

app.use(bodyParser.json());
app.use('/api/users', userRoutes);
app.use('/api/tasks', taskRoutes);

module.exports = app;
