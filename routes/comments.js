const express = require('express');
const router = express.Router();
const Comment = require('../schemas/comment');

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
router.post('/', async (req, res) => {
  const { postId, user, password, content } = req.body;

  if (!content) {
    return res.status(400).json({ message: '댓글 내용을 입력해주세요.' });
  }

  try {
    const comment = await Comment.create({ postId, user, password, content });
    res.json({ message: '댓글이 작성되었습니다.' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: '댓글 작성에 실패했습니다.' });
  }
});

// 댓글 수정
router.put('/:commentId', async (req, res) => {
  const { commentId } = req.params;
  const { content } = req.body;

  if (!content) {
    return res.status(400).json({ message: '댓글 내용을 입력해주세요.' });
  }

  try {
    const updatedComment = await Comment.findByIdAndUpdate(commentId, { content }, { new: true });

    if (!updatedComment) {
      return res.status(404).json({ message: '댓글을 찾을 수 없습니다.' });
    }

    res.json(updatedComment);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: '댓글 수정에 실패했습니다.' });
  }
});

// 댓글 삭제
router.delete('/:commentId', async (req, res) => {
  const { commentId } = req.params;

  try {
    const deletedComment = await Comment.findByIdAndDelete(commentId);

    if (!deletedComment) {
      return res.status(404).json({ message: '댓글을 찾을 수 없습니다.' });
    }

    res.json({ message: '댓글이 삭제되었습니다.' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: '댓글 삭제에 실패했습니다.' });
  }
});

module.exports = router;