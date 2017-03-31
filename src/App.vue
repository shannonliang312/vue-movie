<template>
  <div id="app">
    <div id="bg"><img src="/static/img/bg.jpg" alt=""></div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
#app {
  margin-top: 60px;
}

  #bg {
    position:fixed;
    top:0;
    left:0;
    bottom:0;
    right:0;
    z-index:-999;
    opacity: 0.3;
  }

  #bg > img {
    height:100%;
    width:100%;
    border:0;
  }
</style>
