<template>
  <div>    
    <el-row >
      <movie-card v-for="item in movieInfo" :key="item" :currentMovieInfo="item"></movie-card>
    </el-row>
    <pre>{{movieInfo}}</pre>
  </div>
</template>

<script>
  import MovieCard from './movie-card'

  export default {
    name: "movie-list",
    props: ["movieInfo"],
    data() {
      return {

      }
    },
    methods: {
      
    },
    components: {
      MovieCard
    }
  }  
</script>

<style>

</style>