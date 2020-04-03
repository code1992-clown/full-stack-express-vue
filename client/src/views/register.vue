<template>
  <div class="register">
    <section class="form_container">
      <div class="manage_tip">
        <span class="title">Mr后台管理系统</span>
        

       <el-form :model="registerUser"  :rules="rules" ref="registerForm" label-width="80px" class="registerForm">

  <el-form-item label="用户名" prop="name">
    <el-input  v-model="registerUser.name" placehoder="请输入用户名"></el-input>
  </el-form-item>

    <el-form-item label="邮箱" prop="email">
    <el-input  v-model="registerUser.email" placehoder="请输入邮箱"></el-input>
  </el-form-item>

    <el-form-item label="密码" prop="password">
    <el-input  type="password" v-model="registerUser.password" placehoder="请输入密码"></el-input>
  </el-form-item>

    <el-form-item label="确认密码" prop="password2">
    <el-input  type="password" v-model="registerUser.password2" placehoder="请确认密码"></el-input>
  </el-form-item>

      <el-form-item label="选择身份" >
    <el-select v-model="registerUser.identity" placehoder="请选择身份" class="se">
      <el-option label="管理员" value="manager"></el-option>
      <el-option label="员工" value="employee"></el-option>
    </el-select>
  </el-form-item>

  <el-form-item>
    <el-button type="primary" class="submit_btn" @click="submitForm('registerForm')">注册</el-button>
  </el-form-item>

</el-form>
      </div>
    </section>
  </div>
</template>

<script>
export default {
name:"register",
components:{},
data(){
  var validatePass2 = (rule, value, callback) => {
    if (value !== this.registerUser.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
  return{
    registerUser:{
      name:'',
      password:'',
      password2:'',
      email:'',
      identity:'',
    },
    rules:{
      name:[{
        required:true,
        message:'用户名不能为空',
        trigger:'blur'
      },
      {
        min:2,
        max:30,
        message:"长度在2-30个字符之间",
        trigger:'blur'

      }],
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
        password2:[
          {
          required:true,
          message:"确认密码不能为空",
          trigger:"blur"
        },
        {
          min:6,
          max:30,
          message:"密码长度在6-30字符之间",
          trigger:"blur"
        },
        {
          validator:validatePass2,
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
      indentity:{},
    }
  }
},
methods:{
  submitForm(formName){
          this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$axios.post('/api/user/register',this.registerUser)
            .then(res=>{
              this.$message({
                message:"账号注册成功",
                type:'success'
              })
            })
          }
        })
        this.$router.push('/login')
  }
}
}
</script >

<style scoped lang="less">
.register{
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
  //  border: 1px solid #ccc;
  width: 40%;
  height: 70%;
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
    .registerForm{
      .submit_btn{
        width: 60%;
      }
      .se{
        float: left;
      }
 
    }
  }
}
}

</style>