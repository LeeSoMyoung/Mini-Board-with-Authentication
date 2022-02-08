'use strict';

require('dotenv').config();

const mysql = require('mysql');

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DATABASE,
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

module.exports = db;