module.exports = {
  app: {
    port: process.env.PORT || '8080',
  },
  db: {
    uri: process.env.DB_URI || 'mongodb://localhost/simply-notify',
    options: {
      autoIndex: process.env.NODE_ENV !== 'production',
      reconnectTries: Number.MAX_VALUE,
      reconnectInterval: 500,
      poolSize: 10,
      bufferMaxEntries: 0,
      connectTimeoutMS: 0,
      socketTimeoutMS: 0,
      keepAlive: true,
      useNewUrlParser: true,
    },
  },
  rabbitmq: {
    url: process.env.RABBITMQ_URL || 'amqp://localhost',
    clickQueue: {
      name: 'subscriber_click',
      options: {
        durable: true,
      },
    },
    viewQueue: {
      name: 'subscriber_view',
      options: {
        durable: true,
      },
    },
  },
};
