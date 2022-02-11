'use strict';

require('dotenv').config();

const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const db = require('../../src/lib/db.js');
const userMiddleware = require('../../middlewares/users.js');

router.post('/',(req, res) => {
    db.query(`
        SELECT * FROM USERS
        WHERE ID = ${db.escape(req.body.id)}
    `,
    (err,result)=>{
        if(err){
            throw err;
            return res.status(400).send({
                message: err
            });
        }
        if(result===undefined){
            // 존재하지 않는 유저라면
            return res.status(401).send({
                message: "아이디나 비밀번호가 잘못되었습니다."
            });
        }

       bcrypt.compare(req.body.pw, result[0]['pw'],
       (err,result)=>{
           if(err){
               // 에러가 발생했다면
               throw err;
               return res.status(401).send({
                   message: "아이디나 패스워드가 일치하지 않습니다."
               });
           }
           // 비번이 일치하면 res에 true, 일치하지 않으면 false가 담긴다.
           if(result){
               // 비밀번호가 일치한다면
               return res.status(200).send({
                   message: "로그인 성공"
               });
           }
           else{
               return res.status(403).send({
                   message: "아이디나 비밀번호가 일치하지 않습니다."
               });
           }
       });
    });
});


module.exports = router;