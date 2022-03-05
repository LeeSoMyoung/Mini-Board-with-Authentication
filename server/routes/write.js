'use strict';

const express = require('express');
const router = express.Router();

const uuid = require('uuid');

const db = require('../../src/lib/db.js');
const userMiddleware = require('../middlewares/users.js');
const writeMiddleware = require('../middlewares/write.js');

router.post('/', userMiddleware.isLoggedIn, writeMiddleware.vaildPost, (req, res) => {
    const { title, content } = req.body;

    console.log(req.uid);

    db.query(`
        INSERT INTO POSTS
        (pid, uid, title, content)
        VALUES
        (${db.escape(uuid.v4())}, ${req.uid}, ${db.escape(title)}, ${db.escape(content)})
    `, (dbErr, dbRes) => {

        if (dbErr) {
            // db 업로드 과정에서 에러가 났을 때
            return res.status(500).send({
                message: "게시물을 업로드하지 못했습니다."
            });
        }

        else {
            // 게시물 작성 후 업로드 완료되면 
            res.redirect(`http://localhost:${process.env.PORT}`);

            return res.status(201).send({
                message: "게시물이 업로드 되었습니다."
            });
        }
    });
});

module.exports = router;