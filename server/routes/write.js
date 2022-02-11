'use strict';

const express = require('express');
const router = express.Router();

const db = require('../../src/lib/db.js');
const writeMiddleware = require('../../middlewares/write.js');

router.post('/',(req,res)=>{
    const {title, contents} = req.body;
    
});

module.exports = router;