// Express v4.16.0 and higher
const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//connect DB
const http = require('./connect');

app.get('/', (req, res) => {
   return res.send('Welcome to API : Projecgt Geo Map University of phayao')
})

app.get('/map-data', (req, res) => {
   http.query('SELECT * FROM map_2d_data', (err, result) => {
      if (!err) {
         return res.send({ status: 'SUCCESS', data: result.rows })
      } else {
         return res.send({ status: 'FAIL', error: err })
      }

   })
})

app.post("/upload", async (req, res) => {
   let dataReq = req.body;
   let status;
   await dataReq.forEach((element, index) => {
      const sql = `INSERT INTO map_2d_data (longitude, latitude, deep, year ) VALUES (${element.longitude}, ${element.latitude},${element.deep},${element.year})`;
      http.query(sql, function (err, result) {
         if (err) throw err;
      });
   });
   return res.send({ status: 'SUCCESS' });
});

app.listen(4200, () => {
   console.log('Start Server running on port : 4200')
})
module.exports = app;