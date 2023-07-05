const express = require('express');
const app = express();


const connect = require("./schemas/index.js")
connect();
// 미들웨어 등록



// 라우트 설정
const indexRouter = require('./routes/index');
const commentsRouter = require('./routes/comments');
const postsRouter = require('./routes/posts');

app.use(express.json());
app.use('/', indexRouter);
app.use('/comments', commentsRouter);
app.use('/posts', postsRouter);

// 서버 시작
app.listen(3000, () => {
  console.log('서버가 시작되었습니다.');
});


// 깃 테스트


