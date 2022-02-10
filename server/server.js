'use strict';

require('dotenv').config();

const express = require('express');
const app = express();
const path = require('path');

const PORT = process.env.PORT || 8081;

const login = require('./routes/login.js');
const signup = require('./routes/signup.js');
const write = require('./routes/write.js');
const post = require('./routes/post.js');

app.use('/src', express.static(path.resolve(__dirname, '..', 'src')));
app.use(express.json());

app.use('/signup', signup);
app.use('/login', login);
app.use('/write', write);
app.use('/post', post);

app.get('/*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'src', 'static', 'html', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = app;
