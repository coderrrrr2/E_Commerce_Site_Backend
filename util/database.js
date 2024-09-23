

const Sequelize = require('sequelize');


const sequelize = new Sequelize({
  dialect: PostgresDialect,
  database: 'adebayophilip',
  user: 'adebayophilip',
  password: 'password',
  host: 'localhost',
  port: 5432,
  clientMinMessages: 'notice',
})

module.exports = sequelize;