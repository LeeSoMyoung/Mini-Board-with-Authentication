'use strict';

const express = require('express');
const router = express.Router();

const userMiddleware = require('../middlewares/users.js');
const db = require('../../src/lib/db.js');

router.get('/', userMiddleware.isLoggedIn);

router.get('/dashboard', userMiddleware.isLoggedIn, (req, res) => {

    db.query(`
        SELECT title FROM POSTS
    `, (dbErr, dbRes) => {
        if (dbErr) {
            // db 쿼리문에서 에러가 발생한다면
            throw dbErr;
            return res.status(500).send({
                message: dbErr
            });
        }

        if (dbRes.length === 0) {
            return res.status(200).send({
                message: "게시물이 존재하지 않습니다."
            });
        }

        else {
            return res.status(200).send({
                message: "게시물들을 성공적으로 불러왔습니다."
            });
        }
    });
});

router.get('/written/:uid', userMiddleware.isLoggedIn, (req, res) => {

    const currentUser = req.params;

    db.query(`
        SELECT * FROM POSTS
        WHERE uid = ${db.escape(currentUser)}
    `,
        (dbErr, dbRes) => {
            if (dbErr) {
                // 데이터베이스에서 해당 유저가 작성한 글을 불러 올때 오류가 발생했다면
                throw dbErr;
                return res.status(500).send({
                    message: dbErr
                });
            }
            else {
                // 해당 유저가 작성한 게시물 목록을 성공적으로 불러온 경우

                const postList = dbRes;

                return res.status(200).send({
                    message: "작성 글 목록을 성공적으로 불러왔습니다.",
                    postList
                });
            }
        });
});


module.exports = router;