'use strict';

const express = require('express');
const router = express.Router();

const uuid = require('uuid');

const db = require('../../src/lib/db.js');
const userMiddleware = require('../middlewares/users.js');
const writeMiddleware = require('../middlewares/write.js');

router.post('/', userMiddleware.isLoggedIn, writeMiddleware.vaildPost, (req, res) => {
    const { title, content } = req.body;

    db.query(`
        INSERT INTO POSTS
        (pid, uid, title, content)
        VALUES
        (${db.escape(uuid.v4())}, ${db.escape(req.uid)}, ${db.escape(title)}, ${db.escape(content)})
    `, (dbErr, dbRes) => {

        if (dbErr) {
            // db 업로드 과정에서 에러가 났을 때
            return res.status(500).send({
                message: "게시물을 업로드하지 못했습니다."
            });
        }

        else {
            // 게시물 작성 후 업로드 완료되면 

            return res.status(201).send({
                message: "게시물이 업로드 되었습니다."
            });
        }
    });
});

router.put('/:pid', userMiddleware.isLoggedIn, writeMiddleware.vaildPost, writeMiddleware.validUser, (req, res) => {
    const { title, content, pid } = req.body;

    db.query(
        `
            UPDATE POSTS
            SET 
            title = ${db.escape(title)},
            content = ${db.escape(content)},
            update_date = ${db.escape(new Date())}
            WHERE pid = ${db.escape(pid)}
        `,
        (dbErr, dbRes)=>{
            if(dbErr){
                // DB 업데이트 과정 중 에러가 발생했다면
                throw dbErr;
                return res.status(500).send({
                    message: dbErr
                });
            }
            else{
                return res.status(200).send({
                    message: "게시물이 수정되었습니다."
                });
            }
        }
    );
});

module.exports = router;