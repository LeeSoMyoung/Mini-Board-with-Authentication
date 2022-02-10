'use strict';

const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const uuid = require('uuid');

const userMiddleware = require('../../middlewares/users.js');
const db = require('../../src/lib/db.js');

router.post("/", userMiddleware.validateRegister, (req, res, next) => {
    console.log('sign up router is working');
    db.query(`
        SELECT id FROM USERS
        WHERE id = ${req.body.id}
    `,
        (err, res) => {
            if (res !== null) {
                // 이미 사용 중인 id여서 리턴되는 id값이 존재할 때
                return res.status(409).send({
                    message: "이미 존재하는 id입니다"
                });
            }
            else {
                // id가 존재하지 않을 때 -> 가입 가능
                bcrypt.hash(req.body.pw, 10, (err, hash) => {
                    if (err) {
                        // 에러 발생 시
                        throw err;
                        return res.status(500).send({
                            message: err
                        });
                    }
                    else {
                        // 비밀번호 해싱 작업이 오류없이 성공했을 시
                        db.query(`
                        INSERT INTO USERS 
                        (uid, id, pw, username)
                        VALUES
                        (${uuid.v4()},
                        '${db.escape(req.body.id)}', 
                        '${hash}', '${db.escape(req.body.username)}')
                    `,
                            (err, res) => {
                                if (err) {
                                    throw err;
                                    return res.status(400).send({
                                        message: err
                                    });
                                }
                                else {
                                    return res.status(201).send({
                                        message: "가입되었습니다"
                                    });
                                }
                            }
                        );
                    }
                });
            }
        }
    );
});

module.exports = router;