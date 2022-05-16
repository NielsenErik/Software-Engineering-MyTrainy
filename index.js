require('dotenv').config();
require('express-async-errors');
const app = require('./app/app.js');
const mongoose = require('mongoose');
const connectDB = require('./db/connect');


const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.DB_URL);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};
start()