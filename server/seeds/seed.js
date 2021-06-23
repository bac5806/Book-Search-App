const mongoose = require('mongoose');
const db = require('../config/connection');
const { User } = require('../models');

const userData = require('./users.json');

db.once('open', async () => {
  await User.deleteMany({});

  const users = await User.insertMany(userData);

  console.log('Users seeded!');
  process.exit(0);
});
