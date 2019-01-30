const repository = require('../common/repository');
const logger = require('../common/logger');


function start(ch, queue) {
  // ch.assertExchange(exchange.name, exchange.type, exchange.options);
  ch.assertQueue(queue.name, queue.options);
  ch.prefetch(1);
  ch.consume(queue.name, async (msg) => {
    try {
      logger.log(' [x] Received %s', msg.content.toString());
      const data = JSON.parse(msg.content.toString());
      logger.log(' [] Getting subscriber view: ', msg.properties.correlationId);

      const clickCount = await repository.getSubscriberViewCount(data);
      logger.log(' [x] sending response on channel: ', msg.properties.replyTo);
      logger.log(' [x] response value: ', clickCount);

      ch.sendToQueue(msg.properties.replyTo,
        Buffer.from(clickCount.toString()),
        { correlationId: msg.properties.correlationId });

      ch.ack(msg);
    } catch (error) {
      logger.error('error in view worker', error);
      ch.reject(msg, true);
    }
  }, { noAck: false });

  logger.log('viewWorker is started');
}

module.exports = {
  start,
};
