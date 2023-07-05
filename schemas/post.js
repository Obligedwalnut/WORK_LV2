// 몽고디비 연결

const mongoose = require("mongoose");
const { Schema } = mongoose;

// 제목 작성자명 비밀번호 작성내용 작성날짜
const postSchema = new Schema(
  {
    user: {
      type : String,
      required : true,
      unique : true
    },
    password: {
      type : String,
      required : true,
      unique : true
    },
    title: {
      type : String,
      required : true,
      unique : true
    },
    content: {
      type : String,
      required : true,
      unique : true
    },    
    createdAt: {
      type : Date,
      default : Date.now
    }
  }  
);

module.exports = mongoose.model("Post", postSchema)