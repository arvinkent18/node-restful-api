require('dotenv').config();

const express = require('express');

const app = express();

const bodyParser = require('body-parser');

const helmet = require('helmet');

const cors = require('cors');

const morgan = require('morgan');

const compression = require('compression');

const connectToDatabase = require('./config/database');

connectToDatabase();

app.use(helmet());

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use(morgan('combined'));

app.use(compression());

app.use(cors({
  origin: process.env.DOMAIN,
}));

const usersRoutes = require('./routes/users');

app.use('/api/v1/users', usersRoutes);

app.use((req, res, next) => {
  const error = new Error('Not found');
  res.status(404);
  next(error);
});

app.use((err, req, res) => {
  res.status(res.status || 500).json({
    error: {
      message: err.message,
    },
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});
