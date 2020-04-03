<template>
  <div class="index">
    <headNav></headNav>
    <leftMenu></leftMenu>
    <router-view></router-view>
  </div>
</template>

<script>
import headNav from '@/components/headNav.vue'
import leftMenu from '@/components/leftMenu.vue'
export default {
name:"index",
components:{
  headNav,
  leftMenu
}
}
</script>

<style >

</style>