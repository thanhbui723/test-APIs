const { Pool, Client } = require('pg');

const connectionString = 
`postgresql://postgres:jgspNO5iEBrZdzseAea7@database-1.c9qrogir5qab.ap-southeast-1.rds.amazonaws.com:5432/ThanhBui`
/*
const connectionString = `
postgresql://username:password@
127.0.0.1:5432/default_database`
*/
const client = new Client({
  connectionString,
})
client.connect();
module.exports = client
