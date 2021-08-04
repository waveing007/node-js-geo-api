// Express v4.16.0 and higher
const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const { Client } = require('pg');
client = new Client({
   host: 'localhost',
   db: 'local_map_server',
   user: 'postgres',
   password: 'password',
   port: 5432,
});
client.connect();

app.get('/', (req, res) => {
   return res.send('Welcome to API : Projecgt Geo Map University of phayao')
})

app.get('/map-data', (req, res) => {
   client.query('SELECT * FROM map_2d_data', (err, result) => {
      if (!err) {
         return res.send({ status: 'SUCCESS', data: result.rows })
      } else {
         return res.send({ status: 'FAIL', error: err })
      }

   })
})

app.listen(4200, () => {
   console.log('Start Server running on port : 4200')
})
module.exports = app;