'use strict';

require('dotenv').config();

module.exports = {
    vaildPost: (req, res, next) => {
        const title = req.body.title;
        const content = req.body.content;

        console.log(title, content);

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

    }
}