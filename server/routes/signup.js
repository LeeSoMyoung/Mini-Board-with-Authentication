'use strict';

require('dotenv').config();

const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const uuid = require('uuid');

const userMiddleware = require('../middlewares/users.js');
const db = require('../../src/lib/db.js');

router.post('/', userMiddleware.validateRegister, async (req, res) => {

    const { id, username } = req.body;

    db.query(`
        SELECT id FROM USERS
        WHERE id = ${db.escape(id)}
    `,
        (err, result) => {
            if (err) {
                throw err;
                return res.status(500).send({
                    message: err
                });
            }

            if (result.length > 0) {
                // 이미 유저가 존재할 때
                return res.status(400).send({
                    message: "이미 존재하는 아이디입니다."
                });
            }
            else {
                bcrypt.hash(req.body.pw, parseInt(process.env.BCRYPT_NUM),
                    (bErr, bRes) => {
                        if (bErr) {
                            throw bErr;
                            return res.status(500).send({
                                message: bErr
                            });
                        }
                        else {
                            db.query(`
                                INSERT INTO USERS
                                (uid, id, pw, username)
                                VALUES
                                (${db.escape(uuid.v4())}, ${db.escape(id)}, ${db.escape(bRes)}, ${db.escape(username)})
                            `,
                                (insertErr, insertRes) => {
                                    if (insertErr) {
                                        throw insertErr;
                                        return res.status(500).send({
                                            message: insertErr
                                        });
                                    }
                                    else {
                                        return res.status(201).send({
                                            message: "회원가입 되었습니다."
                                        });
                                    }
                                });
                        }
                    });
            }
        });
});

module.exports = router;