const jwt = require('jsonwebtoken');

// JWT 토큰 생성 함수
const generateToken = (nickname) => {
  const token = jwt.sign({ nickname }, 'my-secret-key');
  return token;
};

// JWT 토큰 검증 함수
const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, 'my-secret-key');
    return decoded;
  } catch (err) {
    throw new Error('유효하지 않은 토큰입니다.');
  }
};

module.exports = { generateToken, verifyToken };