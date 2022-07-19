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
  res.status(201).send('add user successfully');
});

router.get('/', async(req, res) => {
  const result = await client.query(`
    SELECT *
    FROM users
  `);
  res.send(result.rows);
});

// TODO: Update user with parameter user's id
router.put('/update-user/:id',async (req,res) => {
  const id = parseInt(req.params.id);
  const body = req.body;
  const result = await client.query(
    'UPDATE users SET name = $1,age = $2, address = $3 WHERE id=$4',
    [body.name,body.age,body.address,id]);
  res.status(201).send('update user successfully');
})

// TODO: Delete user with parameter user's id
router.delete('/delete-user/:id', async(req,res)=>{
  const id = parseInt(req.params.id);
  const body = req.body;
  const result = await client.query(
    'DELETE FROM users WHERE id = $1',[id]
  );
  res.status(201).send('delete user successfully');
})
module.exports = router;