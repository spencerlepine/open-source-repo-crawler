const config = require('./config');

module.exports = async (callback) => {
  const redis = require('redis');
  const redisOptions = {
    socket: {
      host: config.REDIS_ENDPOINT,
      port: config.REDIS_PORT
    },
    password: config.REDIS_PASSWORD
  };
  const client = redis.createClient(redisOptions);

  client.on('error', err => {
    callback(err, {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*', // Required for CORS support to work
      },
      body: { error: err },
    });
  });

  await client.connect()

  return client;
}
