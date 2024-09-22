const { Pool } = require('pg');

// Create a pool instance
const pool = new Pool({
  user: 'adebayophilip',
  host: 'localhost',
  database: 'adebayophilip',
  password: 'password',
  port: 5432,
});




// const connectToDatabase = () => {
//   return new Promise((resolve, reject) => {
//     pool.connect((err, client, release) => {
//       if (err) {
//         reject('Error acquiring client', err.stack);
//       } else {
//         console.log("Connected to PostgreSQL database");
//         resolve({ client, release }); // Return both client and release function
//       }
//     });
//   });
// };

module.exports = pool;
