require('dotenv').config();

var knex = require('knex')({
    client: 'mysql2',
    connection: {
      host : '127.0.0.1',
      user : 'root',
      password : process.env.PASSWORD_DATABASE,
      database : 'apiusers'
    }
  });

module.exports = knex