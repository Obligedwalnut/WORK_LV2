const express = require('express');
const cookieParser = require("cookie-parser")
const app = express();


const connect = require("./schemas/index.js")
connect();


// 라우트 설정
const indexRouter = require('./routes/index');
const commentsRouter = require('./routes/comments');
const postsRouter = require('./routes/posts');
const signupRouter = require('./routes/signup')
const loginRouter = require('./routes/login')

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser())
app.use('/', indexRouter);
app.use('/comments', commentsRouter);
app.use('/posts', postsRouter);
app.use('/signup', signupRouter)
app.use('/login', loginRouter)


// 서버 시작
app.listen(3000, () => {
  console.log('서버가 시작되었습니다.');
});


// 깃 테스트


