'use strict';

const express = require('express');
const router = express.Router();

const db = require('../../src/lib/db.js');

router.get('/', (req, res) => {
    db.query(`
        SELECT * FROM POSTS
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
                    message: "성공적으로 게시물을 불러왔습니다."
                });
            }
        }
    );
});

module.exports = router;