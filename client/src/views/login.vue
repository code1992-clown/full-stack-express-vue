<template>
  <div class="login">
    <section class="form_container">
      <div class="manage_tip">
        <span class="title">Mr后台管理系统</span>
        
       

       <el-form :model="loginUser"  :rules="rules" ref="loginForm" label-width="60px" class="loginForm">

    <el-form-item label="邮箱" prop="email">
    <el-input  v-model="loginUser.email" placehoder="请输入邮箱"></el-input>
  </el-form-item>

    <el-form-item label="密码" prop="password">
    <el-input  type="password" v-model="loginUser.password" placehoder="请输入密码"></el-input>
  </el-form-item>

  <el-form-item>
    <el-button type="primary" class="submit_btn" @click="submitForm('loginForm')">登录</el-button>
  </el-form-item>
<div class="tiparea">
<p>还没有账号？现在<router-link to="/register" class="re">注册</router-link></p>
</div>
</el-form>
      </div>
    </section>
  </div>
</template>

<script>
import jwt_decode from 'jwt-decode'
export default {
name:"login",
components:{},
data(){
  return{
    loginUser:{
      password:'',
      email:''
    },
    rules:{
      password:[
          {
          required:true,
          message:"密码不能为空",
          trigger:"blur"
        },
        {
          min:6,
          max:30,
          message:"密码长度在6-30字符之间",
          trigger:"blur"
        }
      ],
      email:[
        {
          type:"email",
          required:true,
          message:"邮箱格式不正确",
          trigger:"blur"
        }
      ],
    }
  }
},
methods:{
  isEmpty(value){
    return(
      value === undefined || value ===null || (typeof value ==='object' && Object.keys(value).length===0)
      || (typeof value ==='string' && value.trim().length===0)
    )
  },
  submitForm(formName){
          this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$axios.post('/api/user/login',this.loginUser)
            .then(res=>{
              const { token }=res.data
              localStorage.setItem('eleToken',token)
              const decoded=jwt_decode(token)
              this.$store.dispatch('setAuthenticated',!this.isEmpty(decoded))
              this.$store.dispatch('setUser',decoded)
              this.$router.push('/index')
            })
          }
        })
        this.$router.push('/index')
  }
}
}
</script >

<style scoped lang="less">
.login{
  color: white;
  width: 100%;
  height: 100%;
 background: url('https://goss3.veer.com/creative/vcg/veer/612/veer-158574291.jpg') no-repeat;
 background-size: 100vw 100vh;
 .form_container{
      background-color: #000;
   opacity: 0.85;
   border-radius: 10px;
   padding: 25px 15px;
  width: 40%;
  height: 60%;
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  text-align: center;
  .manage_tip{
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    .title{
      font-weight: 800;
    }
    .loginForm{
      .submit_btn{
        width: 60%;
      }
      .tiparea{
        float: right;
        color: white;
        p{
          .re{
            text-decoration: none;
            color: white;
            font-weight: 900;
            font-size: 1.2em;
            margin-left: 0.3em;
          }
        }
      }
    }
  }
}
}

</style>