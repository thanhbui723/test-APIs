const express = require('express')
const app = express()
const port = 8000
const dataRouter=require('./routes/routes')

app.use(express.json());
app.use(express.urlencoded({
    extended: true,
}));

app.use('/', dataRouter);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})