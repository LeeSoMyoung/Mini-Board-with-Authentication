'use strict';

const jwt = require('jsonwebtoken');

module.exports={
    validateRegister: (req, res, next) =>{ // 회원가입할 때 유효한 제출인지 확인
        if(!req.body.id||req.body.id.length<3){
            return res.status(400).send({
                message: "아이디가 입력되지 않았거나 너무 짧습니다."
            });
        }

        // 비밀번호가 6글자 이상
        if(!req.body.pw||req.body.pw.length<6){
            return res.status(400).send({
                message:"비밀번호가 입력되지 않았거나 너무 짧습니다."
            });
        }

        // 확인 비밀번호가 맞지 않을때
        if(!req.body.pw_repeat|| req.body.pw_repeat!==req.body.pw){
            return res.status(400).send({
                message:"비밀번호가 알맞지 않습니다."
            });
        }
        next();
    },
    isLoggedIn: ()=>{

    }
}