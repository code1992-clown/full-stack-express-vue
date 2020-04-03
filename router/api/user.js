const express = require('express')
const router =express.Router()
const bcrypt =require('bcrypt')
const User=require('../../model/User')
const gravatar = require('gravatar')
const jwt = require('jsonwebtoken')
const passport =require('passport')
// 返回的请求的json数据
router.get('/test',(req,res)=>{
  res.json({"name":"isasdasfasdf asdfasdfi"})
})

// $route Post api/user/register
// 返回的请求的json数据
router.post('/register',(req,res)=>{
  console.log(req.body);

  // 查询数据库中是否有此邮箱
  User.findOne({
    email:req.body.email
  }).then(user=>{
    if(user){
      return res.status(400).json("邮箱已被注册!")
    }else{
      var avatar = gravatar.url(req.body.email, {s: '200', r: 'pg', d: 'mm'});
      const newuser=new User({
        name:req.body.name,
        password:req.body.password,
        email:req.body.email,
        identity:req.body.identity,
        avatar
      })
      bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(newuser.password, salt, function(err, hash) {
          if(err) throw err
          newuser.password=hash
          newuser.save().then(user=>res.json(user)).catch(err=>console.log(err)
          )
        });
    });
    }
  })
})

  // $route post api/user/login
  // 返回token jwt passport
  router.post('/login',(req,res)=>{
    const email =req.body.email
    const password =req.body.password
    User.findOne({email}).then(user=>{
      if(!user){
        return res.status(404).json('用户不存在！')
      }
      bcrypt.compare(password, user.password).then(isMatch=>{
        if(isMatch){
          const secretOrKey=require('../../config/keys').secretOrKey
          const rule={id:user.id,name:user.name,avatar:user.avatar,identity:user.identity}
          jwt.sign(rule,secretOrKey,{expiresIn:3600},(err,token)=>{
            if(err) throw err
            res.json({
              success:true,
              token:"Bearer "+token
            })
          })
        }else{
          return res.status(400).json('密码错误')
        }
      })
    })
  })


  // $route get api/user/current
  // 返回return user     private
  router.get('/current', passport.authenticate("jwt",{session:false}) ,(req,res)=>{
    res.json({
      id:req.user.id,
      email:req.user.email,
      name:req.user.name,
      identity:req.user.identity
    })
  })
module.exports=router