const express = require('express');
const router = express.Router();
const fs = require('fs');
const output = require('./output.json');

router.post('/', (req, res) => {
    const body = req.body;
    console.log("TYPE BODY: ", typeof body)
    console.log("CURRENT DIR: ", __dirname);

    fs.writeFile(`${__dirname}/output.json`, JSON.stringify(body), err => {
        if (err) {
            console.error(err);
            return;
        }
        console.log("WRITE FILE SUCCESS!")
        // file written successfully
    });

});

router.get('/', (req, res) => {
    res.send(output);
})

router.get('/:country', (req, res) => {
    const country = req.params.country;
    let resInfor = [];
    for (let i = 0; i < output.length; i++) {
        if (output[i].country === country) {
            resInfor.push(output[i]);
            break;
        }
    }
    res.send(resInfor);
})

router.delete('/delete/:country',(req,res)=>{
    /*
    let Country1 = req.params.country;
    let newData = output.filter((output)=> output.country!=Country1);
    output = newData;
    res.send(output);*/
    const country = String(req.params.country);
    if(!country){
        res.status(500).send('country not found');
    }else{
        for (let i = 0; i < output.length; i++) {
            if (output[i].country === country) {
                //delete output[i];
                output.splice(i,1);
            }
    
        }
        console.log('Delete successful')
        res.send(output);
    }
})

router.get('/v1/data', (req, res) => {
    const pageNumber = parseInt(req.query.pageNumber);
    const pageSize = parseInt(req.query.pageSize);

    const start = (pageNumber -1)*pageSize;
    const end = pageNumber*pageSize;

    const data = output.splice(start,end);

    res.send(data);
})

module.exports = router;