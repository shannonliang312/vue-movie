<template>   
  <div>
    <div class="movie-card-box">
      <div class="m-poster">
        <img :src="movieInfo.images.large">
      </div>        
      <div class="m-info">
        <h2>{{movieInfo.title}}</h2>
        <div>原名： {{movieInfo.original_title}}</div>
        <div>类型： {{movieInfo.subtype}}</div>
        <div>上映时间： {{movieInfo.year}}</div>
        <div>导演：<span v-for="director in movieInfo.directors">{{director.name}}&nbsp;&nbsp;</span></div>
        <div>主演：<span class="human" v-for="cast in movieInfo.casts" @click="showCastInfo(cast)">{{cast.name}}&nbsp;&nbsp;</span></div>
        <div>标签：<span v-for="genre in movieInfo.genres">{{genre}}&nbsp;&nbsp;</span></div>
        <div>收藏数量： {{movieInfo.collect_count}}</div>
        <div>评分：
          <el-rate
            style="display: inline-block"
            :max="10"
            v-model="movieRate"
            disabled
            show-text
            text-color="#ff9900"
            text-template="{value}"
          >
          </el-rate>
        </div> 
        <div>
          <button class="detail-button" @click="showDetailInfo">详细信息</button>
        </div>  
      </div>    
    </div>   
  </div>
     
</template>

<script>
  import axios from 'axios'

  export default {
    name: "movie-card",
    props: ["movieInfo"],
    data() {
      return {
      }
    },
    computed: {
      movieRate() {
        return this.movieInfo.rating.average
      }
    },
    methods: {
      showDetailInfo() {
        let url = `https://api.douban.com/v2/movie/subject/${this.movieInfo.id}`;
        
        this.$emit("onDialog", {
            type: "detail",
            url: url,
            title: this.movieInfo.title
          });
      },
      showCastInfo(cast) {
        // console.log(cast);
        let url = `https://api.douban.com/v2/movie/celebrity/${cast.id}`;
        
        this.$emit("onDialog", {
            type: "cast",
            url: url,
            title: cast.name
          });
      }
    },
    components: {
    }
  }  
</script>

<style scoped>
  .movie-card-box {
    position: relative;
  }

  .movie-card-box:before, .movie-card-box:after {
    display: table;
    content: "";
  }

  .movie-card-box:after {
    clear: both;
  }
  
  .m-poster {
    float: left;
    margin: 10px 30px 10px 0;
  }

  img:hover {
    box-shadow: 5px 5px 5px #475669;
    cursor: pointer;
  }

  .m-info {
    margin-top: 10px
  }

  .m-info div {
    margin-bottom: 10px;
  }

  .detail-button {
    padding: 5px 8px;
    background-color: transparent;
    color: white;
    border-radius: 10%;
  }

  .detail-button:hover {
    cursor: pointer;
  }

   .human {
    color:aqua;
  }

  .human:hover {
    cursor: pointer;
  }

  
</style>