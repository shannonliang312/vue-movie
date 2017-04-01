<template>
  <div>    
    <transition 
      appear
      name="custom-classes-transition"
      enter-active-class="animated rotateIn"      
      >
      <h1>Find your favorate TV show!</h1>
    </transition>
    
    <el-row>
      <el-col  :span="12" :offset="6">
        <input type="text" @keyup.enter="onSearch" v-model="keywords" placeholder="" id="searchInput">
        <i class="fa fa-search fa-2x search-icon" aria-hidden="true" @click="onSearch"></i>   
      </el-col>
    </el-row>    
    <div v-if="loadingFlag" style="text-align: center;">
      <h3 >正在加载中...</h3>
    </div>
    <div v-if="exceptionFlag" style="text-align: center; margin-top: 20px;">
      <span class="oops">Oops!</span>
      <h2>{{exceptionInfo}}</h2>
    </div>
    <div id="movie-list"  style="padding: 50px">
      <MovieList :searchRes="searchRes"></MovieList>
    </div>
    <infinite-loading :on-infinite="onInfinite" ref="infiniteLoading" v-if="searchRes.count"></infinite-loading>
  </div>
</template>

<script>
  import axios from 'axios'
  import InfiniteLoading from 'vue-infinite-loading';
  import MovieList from './movie-list'

  export default {
    name: "home",
    mounted: function() {
      document.getElementById("searchInput").focus();
    },
    data() {
      return {
        keywords: "",
        searchRes: {},
        searchType: "",
        loadingFlag: false,
        nextStart: 0,
        exceptionFlag: false,
        exceptionInfo: ""
      }
    },
    methods: {
      onSearch() {
        this.nextStart = 0;
        this.exceptionFlag = false;

        let url = `https:/api.douban.com/v2/movie/search?start=${this.nextStart}&count=4&q=` + this.keywords;
        this.loadingFlag = true;
        this.searchRes = {};

        axios.get(url)
          .then((res) => {
            this.loadingFlag = false;
            if (res.data.subjects.length != 0) {
              this.searchRes = res.data;
              this.exceptionFlag = false;
            }
            else {
              this.loadingFlag = false;
              this.exceptionFlag = true;
              this.exceptionInfo = "没有找到您要搜索的资源";
            }
            
          })
          .catch((err) => {
            if(err.response) {
              this.loadingFlag = false;
              this.exceptionFlag = true;
              if (err.response.status == 400) {
                this.exceptionInfo = "请求过于频繁，请稍后再试";
              }
              
            }
          })
      },
      onInfinite() {
        this.nextStart += 4;
        let url = `https://api.douban.com/v2/movie/search?start=${this.nextStart}&count=4&q=` + this.keywords;

        axios.get(url)
          .then((res) => {
            this.searchRes.subjects = this.searchRes.subjects.concat(res.data.subjects);
            if (res.data.subjects.length != 0) {
              this.$refs.infiniteLoading.$emit('$InfiniteLoading:loaded');
            }
            else {
              this.$refs.infiniteLoading.$emit('$InfiniteLoading:complete');
            }            
          })
          .catch((err) => {
            console.log(err);
          })
      },
    },
    components: {
      MovieList,
      InfiniteLoading
    }
  }
</script>

<style scoped>
  @font-face {
    font-family: Chewy;
    src: url(../assets/font/Chewy.ttf);
  }

  h1 {
    width: 80%;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 30px;
    font-family: Chewy;
    text-align: center;
    font-size: 4em;
    overflow-x: hidden;
  }

  .oops {
    font-family: Chewy;
    font-size: 5em;
  }

  input {
    outline: none;
    color: white;
    font-size: 2em;
    text-align: center;
    background-color: transparent;
    width: 90%;
    border: 0;
    border-bottom: white 1px solid; 
  }

  .search-icon:hover {
    cursor: pointer;
  }

  ::-webkit-input-placeholder { /* WebKit browsers */
    color:    #C0CCDA;
    font-style:italic;
    font-size: 1em;
  }
  :-moz-placeholder { /* Mozilla Firefox 4 to 18 */
      color:    #C0CCDA;
      font-style:italic;
      font-size: 1em;
  }
  ::-moz-placeholder { /* Mozilla Firefox 19+ */
      color:    #C0CCDA;
      font-style:italic;
      font-size: 1em;
  }
  :-ms-input-placeholder { /* Internet Explorer 10+ */
      color:    #C0CCDA;
      font-style:italic;
      font-size: 1em;
  }

</style>