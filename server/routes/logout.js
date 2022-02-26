'use strict';

require('dotenv').config();

const express = require('express');
const router = express.Router();

const userMiddleware = require('../middlewares/users.js');

router.get('/', userMiddleware.isLoggedIn, (req, res) => {
    res.clearCookie(process.env.COOKIE_NAME).status(200).send({
        message: "로그아웃 되었습니다."
    });

    res.redirect(`http://localhost:${process.env.PORT}`);
});

module.exports = router;