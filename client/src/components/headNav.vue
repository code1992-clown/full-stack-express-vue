<template>
 <header class="head-nav">
<el-row class="el-row">
  <el-col :span="6" class="logo-container">
    <img src="https://goss4.veer.com/creative/vcg/veer/612/veer-133111399.jpg" alt="" class="logo">
    <span class="title">后台管理系统</span>
  </el-col>

  <el-col :span="6" class="user">
    <div class="userinfo">
      <img :src="user.avatar" alt="" class="avatar">
      <div class="welcome">
        <p class="name comename">欢迎</p>
        <p class="name avatarname">{{user.name}}</p>
      </div>
      <span class="username">
        <el-dropdown @command="setDialogInfo" trigger="click" class="drop">
         <span class="el-dropdown-link">
          <i class="el-icon-caret-bottom el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown"  >
        <el-dropdown-item command="info">个人信息</el-dropdown-item>
         <el-dropdown-item command="logout">退出</el-dropdown-item>
         </el-dropdown-menu>
         </el-dropdown>
      </span>
    </div>
  </el-col>
</el-row>
 </header>
</template>

<script>
export default {
  name:'head-nav',
  computed:{
    user(){
      return this.$store.getters.user
    }
  },
  methods:{
   setDialogInfo(cmditem){
console.log(cmditem);
switch(cmditem){
  case "info":
    this.showInfoList()
    break
    case "logout":
      this.logout()
      break
}
   },
   showInfoList(){
this.$router.push('/infoShow')
   },
   logout(){
     localStorage.removeItem("eleToken")
     this.$store.dispatch('clearcurrentstate')
     this.$router.push('/login')
   }
  }
}
</script>

<style scoped lang="less">
.head-nav{
  height: 60px;
  width: 100%;
  background-color: rgb(30, 44, 67);
  
  .el-row{
    display: flex;
    .logo-container{
      display: flex;
      .logo{
        margin-top: 10px;
        margin-left: 10px;
        height: 40px;
        width: 40px;
        border-radius: 50%;
      }
      .title{
        line-height: 60px;
        color: white;
        font-weight: 800;
        letter-spacing: 0.2em;
        margin-left: 2em;
      }
    }
    .user{
      position: absolute;
      right: 10px;
      display: flex;
      justify-content: flex-end;
      height: 100%;
      .userinfo{
        display: flex;
height: 100%;

        .avatar{
          margin-top: 10px;
          width: 40px;
          height: 40px;
          border-radius: 50%;
        }
        .welcome{
          line-height: 1.2;
          margin-left: 10px;
          text-align: center;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
         .name{
            font-weight: 800;
            color: white;
         }
          .avatarname {
          color: turquoise;
        }
   
        }
      }
    }
  }
}

 .username{
      display: block;
      .drop{
        .el-dropdown-link{
          i{
            font-size: 20px;
            color: white;
            margin-top: 20px;
            width: 100px;
            text-align: center;
          }
        }
      }
    }

</style>