const { Client } = require('pg')
const client = new Client({
  user: 'adebayophilip',
  host: 'localhost',
  database: 'postgres',
  password: 'password',
  port: 5432,
})
client.connect(function(err) {
  if (err) throw err;
  console.log("Connected to database");
});