// const knex = require('knex');
// const path = require('path');
// require('dotenv').config({ path: path.resolve(__dirname) + '/.env' });

const connection = {
  client: 'mysql',
  connection: {
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'locatemedb',
  },
  useNullAsDefault: true
};

export const close = knex => knex.destroy();

export default (connect = connection) => require('knex')(connect);
