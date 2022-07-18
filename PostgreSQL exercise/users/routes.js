const express = require('express');
const router = express.Router();
const users = require('./user-data.json');
const client = require('../database/pg');

router.post('/create-user', async (req, res) => {
  const body = req.body;
  const result = await client.query(`
    INSERT INTO users(name, age, address)
    VALUES ('${body.name}', ${body.age}, '${body.address}')
  `);
  res.send(result);
});

router.get('/', async(req, res) => {
  const result = await client.query(`
    SELECT *
    FROM users
  `);
  res.send(result.rows);
});

// TODO: Update user with parameter user's id

// TODO: Delete user with parameter user's id

module.exports = router;