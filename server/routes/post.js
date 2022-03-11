'use strict';

require('dotenv').config();

const express = require('express');
const router = express.Router();

const db = require('../../src/lib/db.js');

const userMiddleware = require('../middlewares/users.js');
const writeMiddleware = require('../middlewares/write.js');

router.get('/', userMiddleware.isLoggedIn, (req, res) => {
    db.query(`
        SELECT * FROM POSTS
        ORDER BY date
    `,
        (err, result) => {
            if (err) {
                // DB에서 불러오는데 오류가 생겼다면
                throw err;
                return res.status(500).send({
                    message: "게시물을 불러오는데 실패하였습니다."
                });
                console.log(err);
            }
            else {
                // DB에서 포스팅 정보를 불러오는데 오류가 없었다면

                const postList = result;

                return res.status(200).send({
                    message: "성공적으로 게시물을 불러왔습니다.",
                    postList
                });
            }
        }
    );
});

router.get('/:pid', async (req, res) => {
    const { pid } = req.params; // 게시물 pid를 가져온다.

    await db.query(`
        SELECT * FROM POSTS
        WHERE pid = ${db.escape(pid)}
    `,
        (dbErr, dbRes) => {

            if (dbErr) {
                // db에서 해당 포스트를 불러오는 데 실패했다면
                throw dbErr;
                return res.status(500).send({
                    message: dbErr
                });
            }

            if (dbRes) {
                // 정상적으로 결과를 가져왔다면

                if (!dbRes.length) {
                    // 해당 pid가 존재하지 않는다면

                    return res.status(404).send({
                        message: "삭제되었거나 존재하지 않는 게시물입니다."
                    });
                }

                else {

                    const uid = dbRes[0]['uid'];

                    db.query(`
                        SELECT username FROM USERS
                        WHERE uid = ${db.escape(uid)}
                    `,
                        (usernameErr, usernameRes) => {
                            if (usernameErr) {
                                throw usernameErr;
                                return res.status(500).send({
                                    message: "유저 이름을 불러오는데 실패하였습니다."
                                });
                            }
                            else {
                                // 유저 이름을 성공적으로 불러왔을 경우
                                const currentPost = {
                                    pid: dbRes[0]['pid'],
                                    uid,
                                    content: dbRes[0]['content'],
                                    username: usernameRes[0]['username'],
                                    title: dbRes[0]['title'],
                                    date: dbRes[0]['date']
                                }

                                return res.status(200).send({
                                    message: "성공적으로 포스팅을 불러왔습니다",
                                    currentPost
                                });
                            }
                        });

                }

            }
        });
});

router.delete('/:pid', userMiddleware.isLoggedIn, writeMiddleware.validUser, (req, res) => {

    const pid = req.params;

    db.query(
        `DELETE FROM POSTS WHERE POSTS.pid =${db.escape(pid)}`
        ,
        (dbErr, dbRes) => {
            if (dbErr) {
                throw dbErr;
                return res.status(500).send({
                    message: dbErr
                });
            }

            else {
                return res.status(204).send({
                    message: "게시물이 성공적으로 삭제되었습니다."
                });
            }
        }
    );
        
});

module.exports = router;