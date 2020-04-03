<template>
  <div class="home">
    <div class="container">
      <h1 class="title">Mr后台管理系统</h1>
      <p class="lead">专注于线上管理，用心管理生活，用心管理人生！</p>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped lang="less">
.home{
  position: absolute;
  top: 60px;
  left: 205px;
  background-color: #ff0;
  width: 85%;
  height: 90%;
  background: url("https://goss4.veer.com/creative/vcg/veer/612/veer-308619116.jpg") no-repeat;
  background-size: cover;
  .container{
    position: relative;
    background-color: #000;
    opacity: 0.7;
    height: 100%;
    width: 100%;
    text-align: center;
    color: white;
    .title{
      position: absolute;
      top: 30%;
      left: 50%;
      transform: translate(-50%,-50%);
}
.lead{
  position: absolute;
      top: 40%;
      left: 50%;
      transform: translate(-50%,-50%);
}
  }
}
</style>