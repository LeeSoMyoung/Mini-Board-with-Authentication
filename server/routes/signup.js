'use strict';

require('dotenv').config();

const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const uuid = require('uuid');

const userMiddleware = require('../../middlewares/users.js');
const db = require('../../src/lib/db.js');

router.post('/', userMiddleware.validateRegister, async (req, res) => {

    console.log(req.body);
    const { id, username } = req.body;

    const hashedPassword = await bcrypt.hash(req.body.pw, process.env.HASHED_NUM);

    db.query(`
        SELECT id FROM USERS
        WHERE id = ${db.escape(id)}
    `,
        (err, result) => {
            if(err){
                throw err;
                return res.status(400).send({
                    message: err
                });
            }
            if (result !== undefined) {
                // 이미 유저가 존재할 때
                return res.status(400).send({
                    message: "이미 존재하는 아이디입니다."
                });
            }
            else {
                db.query(`
                INSERT INTO USERS
                (uid, id, pw, username)
                VALUES (${db.escape(uuid.v4())}, ${db.escape(id)}, ${db.escape(hashedPassword)},${db.escape(username)})
            `, (err, dbRes) => {

                    if (err) {
                        throw err;
                        return res.status(400).send({
                            message: err
                        });
                    }
                    else {
                        return res.status(201).send({
                            message: "가입되었습니다."
                        });
                    }
                });
            }
        });

});

module.exports = router;