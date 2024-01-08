const express = require('express');
const app = express();
const path = require('path');
const PORT = 3000;
require('dotenv').config();

const mongoose = require('mongoose');
const mongoURI = process.env.mongodb;
mongoose.connect(mongoURI);

app.use(express.json());
app.use(express.urlencoded());

// routes
const mongoDBRouter = require(path.join(__dirname, './routes/mongoDBRouter.js'));
const supabaseRouter = require(path.join(__dirname, './routes/supabaseRouter.js'));

app.use('/api/mongoDB', mongoDBRouter);
app.use('/api/supabase', supabaseRouter);

// error handeling
app.get('*', (req, res) => {
  res.status(404).send('404')});

  app.use((err, req, res, next) => {
    const defaultErr = {
      log: 'Express error handler caught unknown middleware error',
      status: 500,
      message: { err: 'An error occurred' },
    };
    const errorObj = Object.assign({}, defaultErr, err);
    console.log(errorObj.log);
    return res.status(errorObj.status).json(errorObj.message);
  });

  app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}...`);
  });

  module.exports = app;