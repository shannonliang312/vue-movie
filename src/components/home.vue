<template>
  <div>
    <h1>Find your favorate movie!</h1>
    <el-row>
      <el-col  :span="12" :offset="6">
        <el-input v-model="keywords" @keyup.native.enter="onSearch" placeholder="请输入">
          <el-button slot="append" icon="search" @click="onSearch"></el-button>
        </el-input>
      </el-col>
    </el-row>    
    <div v-if="loadingFlag" style="text-align: center;">
      <h3 >正在加载中...</h3>
    </div>
    <div id="movie-list"  style="padding: 50px">
      <MovieList :searchRes="searchRes"></MovieList>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import MovieList from './movie-list'

  export default {
    name: "home",
    created: function() {
      
    },
    data() {
      return {
        keywords: "",
        searchRes: {},
        searchType: "",
        loadingFlag: false
      }
    },
    methods: {
      onSearch() {
        let self = this;
        let url = 'https:/api.douban.com/v2/movie/search?count=4&q=' + this.keywords;
        this.loadingFlag = true;
        this.searchRes = {};
        axios.get(url)
          .then(function(res) {
            self.loadingFlag = false;
            self.searchRes = res.data;
            console.log(res.data);
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