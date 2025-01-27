const express = require('express');
const app = express();
const path = require('path');
app.use(express.json());

// app.use('/db', require('./db'));

app.use((err, req, res, next)=> {
  console.log(err);
  res.status(err.status || 500).send({ error: err.message });
});

// const authRoutes = require('./routes/auth');
// app.use('/api/auth', authRoutes);
const routes = require('../db/routes');
app.use('/api', routes);
module.exports = app;