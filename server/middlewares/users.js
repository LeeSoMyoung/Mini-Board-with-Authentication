'use strict';

require('dotenv').config();

const jwt = require('jsonwebtoken');

module.exports = {
    validateRegister: (req, res, next) => {
        // 회원가입할 때 유효한 제출인지 확인
        if (!req.body.id || req.body.id.length < 3) {
            return res.status(400).send({
                message: "아이디가 입력되지 않았거나 너무 짧습니다."
            });
        }

        // 비밀번호가 6글자 이상
        if (!req.body.pw || req.body.pw.length < 6) {
            return res.status(400).send({
                message: "비밀번호가 입력되지 않았거나 너무 짧습니다."
            });
        }

        // 확인 비밀번호가 맞지 않을때
        if (!req.body.pw_repeat || req.body.pw_repeat !== req.body.pw) {
            return res.status(400).send({
                message: "비밀번호가 알맞지 않습니다."
            });
        }

        if (!req.body.username) {
            return res.status(400).send({
                message: "이름이 입력되지 않았습니다."
            });
        }
        next();
    },

    isLoggedIn: (req, res, next) => {

        const accessToken = req.cookies[process.env.COOKIE_NAME];

        if(!accessToken){
            // access token이 존재하지 않는다면
            res.redirect(`http://localhost:${process.env.PORT}/login`);
        }
        else{
            // access token이 존재한다면
            // 유효성 검사
            try{
                const isValid = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
                req.username = isValid.username;
                req.uid = isValid.uid;
                req.id = isValid.id;
                next();
            }
            catch(err){
                throw new Error(err.message);
                return res.status(403).send({
                   message:"유효하지 않은 토큰입니다." 
                });
            }
        }
    }
}