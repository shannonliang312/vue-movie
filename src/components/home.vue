<template>
  <div>
    <h1>Find your favorate movie!</h1>
    <el-row>
      <el-col  :span="12" :offset="6">
        <el-input v-model="keywords" @keyup.native.enter="onSearch">
          <el-button slot="append" icon="search" @click="onSearch"></el-button>
        </el-input>
      </el-col>
    </el-row>
    <div id="movie-list"  style="margin-top: 30px">
      <MovieList :movieInfo="movieInfo.Search"></MovieList>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import MovieList from './movie-list'

  export default {
    name: "home",
    data() {
      return {
        keywords: "",
        movieInfo: null
      }
    },
    methods: {
      onSearch() {
        let self = this;
        let url = 'http://www.omdbapi.com/?s=' + this.keywords;
        // console.log(this.keywords);
        axios.get(url)
          .then(function(res) {
            console.log(res.data);
            self.movieInfo = res.data;
          })
      }
    },
    components: {
      MovieList
    }
  }
</script>

<style scoped>
  @font-face {
    font-family: Chewy;
    src: url(../assets/font/Chewy.ttf);
  }

  h1 {
    margin-bottom: 30px;
    font-family: Chewy;
    text-align: center;
    font-size: 4em;
  }
</style>