'use strict';

require('dotenv').config();

const express = require('express');
const router = express.Router();

router.get('/',(req,res)=>{
    res.clearCookie(process.env.COOKIE_NAME);
});

module.exports = router;