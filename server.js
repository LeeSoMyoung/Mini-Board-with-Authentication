'use strict';

require('dotenv').config();

const express = require('express');
const app = express();
const path = require('path');
const mysql = require('mysql');

const PORT = process.env.PORT||8081;

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DATABASE,
});

app.use('/src',express.static(path.resolve(__dirname,'src')));

app.get('/*',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'src','static','html','index.html'));
});

db.connect((error)=>{
    if(error){
        // DB 연결에 실패했을 시
        console.log(error);
    }
    else{
        // 정상적으로 DB와 연결되었을 시
        console.log('MySQL Connected');
    }
});
app.listen(PORT, ()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
});