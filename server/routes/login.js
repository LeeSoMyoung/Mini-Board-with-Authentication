'use strict';

require('dotenv').config();

const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const db = require('../../src/lib/db.js');

router.post('/', (req, res, next) => {
    console.log('login router is working!');
    db.query(`
        SELECT * FROM USERS
        WHERE ID = ${db.escape(req.body.id)}
    `,
    (err,res)=>{
        if(err){
            throw err;
            return res.status(400).send({
                message: err
            });
        }
        if(!res.length){
            // 존재하지 않는 유저라면
            return res.status(401).send({
                message: "아이디나 비밀번호가 잘못되었습니다."
            });
        }

        bcrypt.compare(req.body.pw, res[0]['pw'],
        (bErr, bRes)=>{
            if(bErr){
                // 비밀번호가 틀렸다면
                throw bErr;
                return res.status(401).send({
                    message: "아이디나 패스워드가 일치하지 않습니다"
                });
            }

            if(bRes){
                const user = {
                    id: res[0].id,
                    username: res[0].username
                };
                const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET,{expiresIn:"7d"});

                return res.status(200).send({
                    message: "로그인에 성공하였습니다.",
                    accessToken: accessToken,
                    user: res[0]
                });
            }
        });
    });
});


module.exports = router;