'use strict';

require('dotenv').config();

const express = require('express');
const app = express();
const path = require('path');

const PORT = process.env.PORT || 8081;

const loginRouter = require('./routes/login.js');
const signupRouter = require('./routes/signup.js');
const writeRouter = require('./routes/write.js');
const postRouter = require('./routes/post.js');
const mainRouter = require('./routes/main.js');

app.use('/src', express.static(path.resolve(__dirname, '..', 'src')));
app.use(express.json());

app.use('/signup', signupRouter);
app.use('/login', loginRouter);
app.use('/write', writeRouter);
app.use('/post', postRouter);
app.use('/', mainRouter);

app.get('/*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'src', 'static', 'html', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = app;
