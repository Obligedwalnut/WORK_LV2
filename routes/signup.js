const express = require('express')
const router = express.Router()
const User = require('../schemas/user')


router.post('/', async (req,res) => {
const {nickname, password, confirmPassword}  = req.body

try {
    if(!nickname || !password || !confirmPassword){
        return res.status(400).json({ message : "닉네임과 비밀번호를 모두 입력해주세요."})
    }

    // 닉네임 길이 확인
    if (nickname.length < 3) {
        return res.status(400).json({ message: '닉네임은 최소 3자 이상이어야 합니다.' });
      }
  
      // 닉네임 정규식 검사
      if (!/^[a-zA-Z0-9]+$/.test(nickname)) {
        return res.status(400).json({ message: '닉네임은 알파벳 대소문자와 숫자로만 구성되어야 합니다.' });
      }
  
      // 비밀번호 길이 확인
      if (password.length < 4) {
        return res.status(400).json({ message: '비밀번호는 최소 4자 이상이어야 합니다.' });
      }
  
      // 비밀번호 확인
      if (password !== confirmPassword) {
        return res.status(400).json({ message: '비밀번호가 일치하지 않습니다.' });
      }
  
      // 중복된 닉네임인지 확인
      const existingUser = await User.findOne({ nickname });
      if (existingUser) {
        return res.status(409).json({ message: '중복된 닉네임입니다.' });
      }
  
      // 회원 생성
      const user = await User.create({ nickname, password });
      return res.status(201).json({ message: '회원 가입에 성공했습니다.' });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: '서버 오류가 발생했습니다.' });
    }
  });
  
  module.exports = router;