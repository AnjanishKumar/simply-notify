const amqp = require('amqplib');
const { EventEmitter } = require('events');
const uuid = require('node-uuid');
const config = require('../../common/config');
const logger = require('../../common/logger');


let amqpChannel = null;
const replyQueue = 'amq.rabbitmq.reply-to';

function createClient() {
  return amqp.connect(config.rabbitmq.url)
    .then(conn => conn.createChannel())
    .then((channel) => {
      channel.responseEmitter = new EventEmitter();
      channel.responseEmitter.setMaxListeners(0);
      channel.consume(replyQueue,
        msg => channel.responseEmitter.emit(msg.properties.correlationId, msg.content),
        { noAck: true });
      amqpChannel = channel;
      return channel;
    });
}

const sendRPCMessage = (channel, message, rpcQueue) => new Promise((resolve) => {
  const correlationId = uuid.v4();
  channel.responseEmitter.once(correlationId, resolve);
  channel.sendToQueue(rpcQueue, Buffer.from(message), {
    correlationId,
    replyTo: replyQueue,
    persistent: true,
  });
});

async function getClickCount(params) {
  const { clickQueue } = config.rabbitmq;
  const message = Buffer.from(JSON.stringify(params));

  amqpChannel.assertQueue(clickQueue.name, clickQueue.options);

  const content = await sendRPCMessage(amqpChannel, message, clickQueue.name);
  const count = parseInt(content.toString(), 10);
  return count;
}

async function getViewCount(params) {
  const viewQueue = config.rabbitmq;
  const message = Buffer.from(JSON.stringify(params));

  amqpChannel.assertQueue(viewQueue.name, viewQueue.options);

  const content = await sendRPCMessage(amqpChannel, message, viewQueue.name);
  const count = parseInt(content.toString(), 10);
  return count;
}

createClient().catch(logger.error);

module.exports = {
  getClickCount,
  getViewCount,
};
