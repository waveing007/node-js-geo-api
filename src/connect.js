
const { Client } = require('pg');
client = new Client({
    host: 'localhost',
    db: 'local_map_server',
    user: 'postgres',
    password: 'password',
    port: 5432,
});
client.connect(function (err) {
    if (err) throw err;
});

module.exports = client;