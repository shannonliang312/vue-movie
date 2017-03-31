<template>
  <div>    
    <el-row >
      <h3 v-if="searchRes.title">{{searchRes.title}}：</h3>
    </el-row>
    <div style="padding: 10px 150px 0 150px">
      <movie-card v-for="item in searchRes.subjects" :key="item.id" :movieInfo="item"></movie-card>
    </div>
  </div>
</template>

<script>
  import MovieCard from './movie-card'

  export default {
    name: "movie-list",
    props: ["searchRes"],
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