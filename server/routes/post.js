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
                    message: "성공적으로 게시물을 불러왔습니다.",
                    postList
                });
            }
        }
    );
});

router.get('/:pid', async (req, res) => {
    const { pid } = req.params; // 게시물 pid를 가져온다.

    db.query(`
        SELECT * FROM POSTS
        WHERE pid = ${db.escape(pid)}
    `,
    (dbErr, dbRes)=>{
        
        if(dbErr){
            // db에서 해당 포스트를 불러오는 데 실패했다면
            throw dbErr;
            return res.status(500).send({
                message: dbErr
            });
        }

        if(dbRes){
            // 정상적으로 결과를 가져왔다면

            if(!dbRes.length){
                // 해당 pid가 존재하지 않는다면
                
                return res.status(404).send({
                    message: "삭제되었거나 존재하지 않는 게시물입니다."
                });
            }

            else{
                
                const currentPost = {
                    pid: dbRes[0]['pid'],
                    uid: dbRes[0]['uid'],
                    content: dbRes[0]['content'],
                    title: dbRes[0]['title']
                }

                return res.status(200).send({
                    message: "성공적으로 포스팅을 불러왔습니다",
                    currentPost
                });
            }

        }
    });
});

module.exports = router;