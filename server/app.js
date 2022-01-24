require('dotenv').config();
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const app = express();

const port = process.env.PORT || 3000;

// Router 연결
const signRouter = require('./routes/SignRouter');
const userinfoRouter = require('./routes/UserinfoRouter');
const commentRouter = require('./routes/CommentRouter');
const followRouter = require('./routes/FollowRouter');
const postRouter = require('./routes/PostRouter');
const feedsRouter = require('./routes/FeedsRouter');

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

app.use('/api/sign', signRouter);
app.use('/api/post', postRouter);
app.use('/api/userinfo', userinfoRouter);
app.use('/api/follow', followRouter);
app.use('/api/comment', commentRouter);
app.use('/api/feeds', feedsRouter);

app.get('/', (req, res) => {
    res.send('The Crayon Diary Server Works!');
})

app.listen(port, () => {
  console.log(`CrayonDiary Server Running | http://localhost:${port}`);
});

module.exports = app;
