'use strict';

const express = require('express');
const router = express.Router();

const db = require('../../src/lib/db.js');

router.get('/', (req, res) => {
    db.query(`
        SELECT title FROM POSTS
    `,
        (err, res) => {
            console.log(res);
        }
    );
});

module.exports = router;