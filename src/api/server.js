const express = require('express');
const bodyParser = require('body-parser');
const config = require('../common/config');
const apiRouter = require('../api/routes');
const logger = require('../common/logger');
require('../common/db')();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  logger.log(`${req.method} ${req.url}`);
  next();
});

app.use('/api', apiRouter);

app.use((err, req, res, next) => {
  logger.error(err);
  res.status(500).json({
    error: {
      message: 'Internal Server Error',
    },
  });
});

app.listen(config.app.port, (err) => {
  if (err) {
    logger.error(`Failed to start server on port ${config.app.port}`, err);
    process.exit(1);
  }
  logger.log(`Server is listening on port ${config.app.port}`);
});
