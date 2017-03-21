<template>
  <el-col :span="4">
    <el-card :body-style="{padding: '0px'}">
      <img class="image" :src="currentMovieInfo.Poster" alt="">
      <div>
        <span>test</span>
      </div>
    </el-card>
  </el-col>
</template>

<script>
  export default {
    name: "movie-card",
    props: ["currentMovieInfo"],
    data() {
      return {

      }
    }
  }  
</script>

<style scoped>
  .image {
    width: 100%;
    display: block;
  }
</style>