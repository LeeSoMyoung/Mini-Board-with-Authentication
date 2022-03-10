'use strict';

require('dotenv').config();

const jwt = require('jsonwebtoken');

module.exports = {
    vaildPost: (req, res, next) => {
        const title = req.body.title;
        const content = req.body.content;

        if (!title) {
            return res.status(400).send({
                message: "게시물 제목이 입력되지 않았습니다."
            });
        }

        if (!content) {
            return res.status(400).send({
                message: "게시물 내용이 입력되지 않았습니다."
            });
        }

        next();
    },

    validUser: (req, res, next) => {
        // 게시물을 수정할때 올바른 유저인지 확인 하는 작업
        const accessToken = req.cookies[process.env.COOKIE_NAME];
        const isValid = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);

        const currentUser = isValid.uid;
        const postUser = req.uid;

        console.log(currentUser, postUser);

        if(currentUser === postUser){
            // 글 작성자와 현재 유저가 같다면 수정작업 진행
            next();
        }
        else{
            // 글 작성자와 현재 유저가 다르다면
            return res.status(403).send({
                message:"수정 권한이 없습니다."
            });
        }
    }
}