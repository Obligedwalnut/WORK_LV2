// middlewares/auth-middleware.js

const jwt = require("jsonwebtoken");
const User = require("../schemas/user");

// 사용자 인증 미들웨어
const verifyToken = async (req, res, next) => {
  const { Authorization } = req.cookies;
  const [authType, authToken] = (Authorization ?? "").split(" ");
  console.log(req.cookies)
  console.log(authType)
  console.log(authToken)
  if (!authToken || authType !== "Bearer") {
    res.status(401).send({
      errorMessage: "로그인 후 이용 가능한 기능입니다.",
    });
    return;
  } 

  try {
    const { userId } = jwt.verify(authToken, 'my-secret-key');
    const user = await User.findById(userId);
    res.locals.user = user;
    console.log(user)
    next();
  } catch (err) {
    console.error(err);
    res.status(401).send({
      errorMessage: "로그인 후 이용 가능한 기능입니다.",
    });
  }
};

module.exports = verifyToken;