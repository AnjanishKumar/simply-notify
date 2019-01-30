const config = require('../common/config');
const clickWorker = require('./clickWorker');
const viewWorker = require('./viewWorker');
const logger = require('../common/logger');
const rabbitMQ = require('./rabbitMq');

require('../common/db')();

rabbitMQ.getChannel()
  .then((ch) => {
    clickWorker.start(ch, config.rabbitmq.clickQueue);
    viewWorker.start(ch, config.rabbitmq.viewQueue);
  })
  .catch((err) => {
    logger.error(err);
    process.exit(1);
  });
