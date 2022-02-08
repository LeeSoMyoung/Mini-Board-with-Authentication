'use strict';

const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const db = require('../src/lib/db.js');
const userMiddleware = require('../middlewares/users.js');

// http://localhost:PORT/signup
router.post('/signup', (req,res, next)=>{

});

// http://localhost:PORT/login
router.post('/login', (req,res, next)=>{

});

//http://localhost:PORT/write

router.post('/write',(reqw,res,next)=>{
    
});