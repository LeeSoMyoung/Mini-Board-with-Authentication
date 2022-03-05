'use strict';

module.exports = {
    vaildPost: (req, res, next) => {
        const title = req.body.title;
        const content = req.body.title;

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
    }
}