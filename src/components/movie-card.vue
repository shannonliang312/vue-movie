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
        <div>主演：<span v-for="cast in movieInfo.casts">{{cast.name}}&nbsp;&nbsp;</span></div>
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
          <el-button size="small" @click="showDetail">详细信息</el-button>
        </div>  
      </div>    
    </div>
    <el-dialog id="detail-box" v-model="dialogVisible" :title="movieInfo.title">
      <el-row v-if="detailLoadingFlag">
        正在加载中...
      </el-row>
      <div v-if="!detailLoadingFlag">
        <div>国家：<span v-for="country in detailInfo.countries">{{country}}&nbsp;&nbsp;</span></div>
        <div v-if="detailInfo.episodes_count">本季集数：{{detailInfo.episodes_count}}集</div>
        <div >简介：
          <p>{{detailInfo.summary}}</p>
        </div>
      </div>
      
    </el-dialog>
  </div>
     
</template>

<script>
  import axios from 'axios'

  export default {
    name: "movie-card",
    props: ["movieInfo"],
    data() {
      return {
        dialogVisible: false,
        detailLoadingFlag: true,
        detailInfo: {}
      }
    },
    computed: {
      movieRate() {
        return this.movieInfo.rating.average
      }
    },
    methods: {
      showDetail() {
        let url = `https://api.douban.com/v2/movie/subject/${this.movieInfo.id}`;
        this.dialogVisible = true;

        axios.get(url)
          .then((res)=>{
            // console.log(res.data);
            this.detailInfo = res.data;
            this.detailLoadingFlag = false;
          });
      }
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

  .m-info {
    margin-top: 10px
  }

  .m-info div {
    margin-bottom: 10px;
  }

  #detail-box div {
    padding: 10px 20px;
  }
</style>