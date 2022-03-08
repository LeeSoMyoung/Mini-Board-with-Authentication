'use strict';

const db = require('../../src/lib/db.js');

const express = require('express');
const router = express.Router();

const userMiddleware = require('../middlewares/users.js');

router.get('/:uid', userMiddleware.isLoggedIn,(req,res)=>{
    const currentUser = req.params;

    db.query(`
        SELECT * FROM POSTS
        WHERE uid = ${db.escape(currentUser)}
    `, (dbErr, dbRes)=>{

        if(dbErr){
            throw dbErr;
            return res.status(500).send({
                message:dbErr
            });
        }

        else{
            const userPostList = dbRes;

            return res.status(200).send({
                message:"성공적으로 유저가 작성한 글 목록을 불러왔습니다.",
                postList: userPostList
            });
        }
    });
});

module.exports = router;