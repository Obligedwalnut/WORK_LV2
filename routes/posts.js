const express = require('express');
const router = express.Router();
const Post = require("../schemas/post")

// 전체 게시글 목록 조회
// GET
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find({});
    res.json(posts)
  } catch (error) {
    console.log(error)
  }  
});

// 게시글 작성
router.post('/', async (req, res) => {
  try {
  const { user, password, title, content, } = req.body;
  const post = await Post.create({
    user,password,title,content
  }) 
  res.json({message : "r게시글을 작성하였습니다."})
  } catch (error){
    console.log(error)
  }
});

// 게시글 상세 조회
router.get('/:postId', async (req, res) => {
  const { postId } = req.params;

  try {
    const post = await Post.findById(postId)

    if (!post){
      return res.status(404).json({ message : "게시글을 찾을 수 없습니다."})
    } res.json(post)
  } catch(error){
    console.log(error)
  }
  // const post = postSchema.getPostById(postId);
  // if (!post) {
  //   return res.status(404).json({ message: '게시글을 찾을 수 없습니다.' });
  // }
  // res.json(post);
});

// 게시글 수정
router.put('/:postId', async (req, res) => {
  const { postId } = req.params;
  const { title, content } = req.body;
  try {
    const updatedPost = await Post.findByIdAndUpdate(postId, { title, content }, { new: true });
    
    if (!updatedPost) {
      return res.status(404).json({ message : '게시글을 찾을 수 없습니다.' });
    }
    
    res.json(updatedPost);
  } catch (error) {
    console.log(error);
  }
});


// 게시글 삭제
router.delete('/:postId', async (req, res) => {
  const { postId } = req.params;
  try {
    const deletedPost = await Post.findByIdAndDelete(postId);
    
    if (!deletedPost) {
      return res.status(404).json({ message : '게시글을 찾을 수 없습니다.' });
    }
    
    res.json({ message: '게시글이 삭제되었습니다.' });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;