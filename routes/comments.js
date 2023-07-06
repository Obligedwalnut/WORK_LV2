const express = require('express');
const router = express.Router();
const Comment = require('../schemas/comment');
const verifyToken = require("../middlewares/auth_middleware")

// 댓글 목록 조회
router.get('/:postId', async (req, res) => {
  const { postId } = req.params;
  
  try {
    const comments = await Comment.find({ postId }).sort({ createdAt: -1 });
    res.json(comments);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: '댓글 목록 조회에 실패했습니다.' });
  }
});

// 댓글 작성
router.post('/:postId/comments', verifyToken, async (req, res) => {
  const { postId } = req.params;
  const { content } = req.body;
  const nickname = req.user.nickname;
  
  try {
    const post = await Post.findById(postId);
    
    if (!post) {
      return res.status(404).json({ message: '게시글을 찾을 수 없습니다.' });
    }
    
    if (!content) {
      return res.status(400).json({ message: '댓글 내용을 입력해주세요.' });
    }
    
    post.comments.push({ content, nickname });
    await post.save();
    
    res.status(201).json({ message: '댓글이 작성되었습니다.' });
  } catch (error) {
    console.log(error)
  }
});

// 댓글 수정 /// 고마워요 GPT
router.patch('/:postId/comments/:commentId', verifyToken, async (req, res) => {
  const { postId, commentId } = req.params;
  const { content } = req.body;
  const nickname = req.user.nickname;
  
  try {
    const post = await Post.findById(postId);
    
    if (!post) {
      return res.status(404).json({ message: '게시글을 찾을 수 없습니다.' });
    }
    
    const comment = post.comments.id(commentId);
    
    if (!comment) {
      return res.status(404).json({ message: '댓글을 찾을 수 없습니다.' });
    }
    
    if (comment.nickname !== nickname) {
      return res.status(403).json({ message: '권한이 없습니다.' });
    }
    
    comment.content = content;
    await post.save();
    
    res.json({ message: '댓글이 수정되었습니다.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '서버 오류가 발생했습니다.' });
  }
});

// 댓글 삭제
router.delete('/:postId/comments/:commentId', verifyToken, async (req, res) => {
  const { postId, commentId } = req.params;
  const nickname = req.user.nickname;
  
  try {
    const post = await Post.findById(postId);
    
    if (!post) {
      return res.status(404).json({ message: '게시글을 찾을 수 없습니다.' });
    }
    
    const comment = post.comments.id(commentId);
    
    if (!comment) {
      return res.status(404).json({ message: '댓글을 찾을 수 없습니다.' });
    }
    
    if (comment.nickname !== nickname) {
      return res.status(403).json({ message: '권한이 없습니다.' });
    }
    
    comment.remove();
    await post.save();
    
    res.json({ message: '댓글이 삭제되었습니다.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '서버 오류가 발생했습니다.' });
  }
});

module.exports = router;