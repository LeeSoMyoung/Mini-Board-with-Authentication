'use strict';

require('dotenv').config();

const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const db = require('../../src/lib/db.js');
const userMiddleware = require('../middlewares/users.js');

router.post('/', (req, res) => {
    db.query(`
        SELECT * FROM USERS
        WHERE ID = ${db.escape(req.body.id)}
    `,
        (err, result) => {
            if (err) {
                throw err;
                return res.status(400).send({
                    message: err
                });
            }
            if (!result.length) {
                // 존재하지 않는 유저라면
                return res.status(401).send({
                    message: "존재하지 않는 유저입니다."
                });
            }
            else {
                bcrypt.compare(req.body.pw, result[0]['pw'],
                    (bErr, bRes) => {
                        if (bErr) {
                            // 에러가 발생했다면
                            throw bErr;
                            return res.status(401).send({
                                message: "아이디나 패스워드가 일치하지 않습니다."
                            });
                        }
                        // 비번이 일치하면 res에 true, 일치하지 않으면 false가 담긴다.
                        if (bRes) {
                            // 비밀번호가 일치한다면
                            const currentUser = {
                                uid: result[0]['uid'],
                                username: result[0]['username'],
                                id: result[0]['id']
                            };

                            const accessToken = jwt.sign(
                                currentUser,
                                process.env.ACCESS_TOKEN_SECRET,
                                { expiresIn: "15d" }
                            );

                            // 쿠키를 세팅한다.
                            res.cookie(process.env.COOKIE_NAME, accessToken);

                            return res.status(200).send({
                                message: "로그인 성공",
                                accessToken
                            });
                        }
                        else {
                            return res.status(403).send({
                                message: "아이디나 비밀번호가 일치하지 않습니다."
                            });
                        }
                    });
            }
        });
});

module.exports = router;