const amqp = require('amqplib');
const config = require('../common/config');

// let connection = null;
let channel = null;

function getChannel() {
  if (channel) {
    return Promise.resolve(channel);
  }
  return amqp.connect(config.rabbitmq.url)
    .then(conn => conn.createChannel())
    .then((ch) => {
      channel = ch;
      return channel;
    });
}

module.exports = {
  getChannel,
};
