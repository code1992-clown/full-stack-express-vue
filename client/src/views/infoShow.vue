<template>
  <div class="infoShow">
    <el-row type="flex" class="row-bg" justify="center">
      <el-col :span="8">
        <div class="user">
          <img :src="user.avatar" alt="" class="avatar">
        </div>
      </el-col>
      <el-col :span="16">
        <div class="userInfo">
          <div class="userItem">
            <i class="fa fa-user"></i>
            <span>{{user.name}}</span>
          </div>

          <div class="userItem1">
            <i class="fa fa-cog"></i>
            <span>{{user.identity=="manager"?"管理员":"员工"}}</span>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
name:"infoshow",
computed:{
  user(){
    return this.$store.getters.user
  }
}
}
</script>

<style scoped>
.infoShow{
  position: absolute;
  top: 60px;
  left: 205px;
  background-color: #ff0;
  width: 85%;
  height: 90%;
  background: url('https://goss1.veer.com/creative/vcg/veer/612/veer-308683238.jpg') no-repeat;
  background-size: cover;
}
.user,.userInfo{
  color: white;
  background-color: #000;
  opacity: 0.8;
  height: 563px;
  border-right: 1px solid white;
}
.userInfo{
  text-align: left;
  border-right: none;

}
.avatar{
  position: absolute;
  top: 50%;
  left: 17%;
  transform: translate(-50%,-50%);
  border-radius: 50%;
}
.userItem{
    position: absolute;
  top: 45%;
  left: 40%;
  transform: translate(-50%,-50%);
  border-radius: 50%;
}
.userItem1{
  position: absolute;
  top: 55%;
  left: 40%;
  transform: translate(-50%,-50%);
  border-radius: 50%;
}

</style>