'use strict';

const express = require('express');
const router = express.Router();

const userMiddleware = require('../middlewares/users.js');
const db = require('../../src/lib/db.js');


router.get('/', userMiddleware.isLoggedIn, (req, res) => {
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

router.get('/:pid', userMiddleware.isLoggedIn, (req, res) => {

});


module.exports = router;