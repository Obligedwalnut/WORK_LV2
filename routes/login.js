const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../schemas/user');

// 로그인 API
router.post('/', async (req, res) => {
  const { nickname, password } = req.body;

  try {
    // 닉네임과 비밀번호가 존재하는지 확인
    if (!nickname || !password) {
      return res.status(400).json({ message: '닉네임과 비밀번호를 모두 입력해주세요.' });
    }

    // 유저 조회
    const user = await User.findOne({ nickname, password });
    if (!user) {
      return res.status(401).json({ message: '닉네임 또는 비밀번호를 확인해주세요.' });
    }

    // JWT 토큰 생성 ////my secret key 개념이 뭐임 대체
    const token = jwt.sign({ nickname: user.nickname }, 'my-secret-key');

    // 클라이언트에게 토큰을 쿠키로 전달
    res.cookie('token', token, { httpOnly: true });

    return res.status(200).json({ message: '로그인에 성공했습니다.' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: '서버 오류가 발생했습니다.' });
  }
});

module.exports = router;