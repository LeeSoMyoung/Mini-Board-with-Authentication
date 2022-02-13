'use strict';

const express = require('express');
const router = express.Router();

const db = require('../../src/lib/db.js');
const userMiddleware = require('../middlewares/users.js');

router.post('/',userMiddleware.isLoggedIn,(req,res)=>{
    const {title, contents} = req.body;
    
});

module.exports = router;