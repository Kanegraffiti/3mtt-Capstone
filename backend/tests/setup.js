const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

let mongo;

beforeAll(async () => {
  mongo = await MongoMemoryServer.create();
  process.env.MONGO_URI = mongo.getUri();
  process.env.JWT_SECRET = 'testsecret';
  process.env.TMDB_API_KEY = 'dummy';
});

afterAll(async () => {
  await mongoose.connection.close();
  await mongo.stop();
});
