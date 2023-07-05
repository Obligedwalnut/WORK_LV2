const mongoose = require("mongoose");
const { Schema } = mongoose;


const userSchema = new Schema({
  nickname : {
    type : String,
    required : true,
    unique : true,
    minlegnth : 3,
    validate : {
        validator:function(value){
            return /^[a-zA-Z0-9]+$/.test(value)
        },
        message : '닉네임은 알파벳 대소문자와 숫자로만 구성되어야 합니다.'
    }///유효성 검사
  },
  password : {
    type : String,
    required : true,
    minlength : 4
  }
});

module.exports = mongoose.model("User", userSchema);
