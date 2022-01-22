require('dotenv').config();
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const app = express();

const port = process.env.PORT || 3000;

// Router 연결
const { signRouter,
    userinfoRouter, 
    commentRouter, 
    followRouter,
    postRouter } = require('./routes')

// Middleware
app.use(
    cors({
      origin: '*',
      credentials: true,
      methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
    })
);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/sign', signRouter);
app.use('/post', postRouter);
app.use('/userinfo', userinfoRouter);
app.use('/follow', followRouter);
app.use('/comment', commentRouter);


app.get('/', (req, res) => {
    res.send('The Crayon Diary Server Works!');
})

app.listen(port, () => {
  console.log(`CrayonDiary Server Running | http://localhost:${port}`);
});

module.exports = app;
