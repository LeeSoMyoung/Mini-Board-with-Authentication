'use strict';

const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const uuid = require('uuid');

const db = require('../src/lib/db.js');
const userMiddleware = require('../middlewares/users.js');

// http://localhost:PORT/signup
// 회원가입: POST
router.post('/signup', userMiddleware.validateRegister, (req, res, next) => {
    db.query(`SELECT id FROM users WHERE id = ${req.body.id}`, (err, result) => {
        if (result.length) {
            /**
             만약 이미 해당 id가 존재한다면 
             */
            return res.status(400).send({
                message: "이미 존재하는 ID입니다."
            });
        }
        else {
            // id가 중복되지 않는다.
            bcrypt.hash(req.body.pw, 20, (err, hash) => {
                if (err) {
                    return res.status(500).send({
                        message: err
                    });
                }
                else {
                    db.query(`INSERT INTO USERS (uid, id, pw, username) 
                    VALUES ('${uuid.v4()}','${db.escape(req.body.id)}','${hash}','${db.escape(req.body.username)}');`,
                        (err, result) => {
                            if (err) {
                                throw err;
                                return res.status(400).send({
                                    message: err
                                });
                            }
                            return res.status(201).send({
                                message: '가입되었습니다.'
                            });
                        });
                }
            });
        }
    });
});

// http://localhost:PORT/login
// 로그인: POST
router.post('/login', (req, res, next) => {
    db.query(`SELECT * FROM USERS WHERE ID = ${db.escape(req.body.id)}`,
        (err, result) => {
            if (err) {
                throw err;
                return res.status(400).send({
                    message: err
                });
            }
            if (!result.length) {
                return res.status(400).send({
                    message: '아이디나 패스워드가 일치하지 않습니다.'
                });
            }

            bcrypt.compare(req.body.pw, result[0], (bErr, bResult) => {
                if (bErr) {
                    throw bErr;
                    return res.status(400).send({
                        message: '아이디나 패스워드가 일치하지 않습니다.'
                    });
                }
                if (bResult) {
                    // 회원가입되어 있고, 아이디 비밀번호를 제대로 입력했을 시
                    const currentUser = {
                        username: bResult[0].username,
                        userId: bResult[0].id
                    };
                    const accessToken = jwt.sign(currentUser, process.env.ACCESS_TOKEN_SECRET, 
                        { expiresIn: '7d' });
                    
                    return res.status(200).send({
                        message: '로그인 되었습니다',
                        accessToken: accessToken,
                        user: result[0]
                    });
                }
                return res.status(400).send({
                    message: '아이디나 패스워드가 일치하지 않습니다!'
                });
            });
        });
});

//http://localhost:PORT/write
// 게시물 작성: POST
router.post('/write', (req, res, next) => {

});

//http://localhost:PORT/:id
// 게시물 조회 => id에 해당하는 게시물 조회

// http://localhost:PORT
// 메인 화면-> 게시물 리스트(제목만 노출)
router.get('/', (req, res, next) => {

});

module.exports = router;