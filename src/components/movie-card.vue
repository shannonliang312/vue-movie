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
        <div>导演：<span class="human" v-for="director in movieInfo.directors">{{director.name}}&nbsp;&nbsp;</span></div>
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
          <!--el-button size="small" @click="showDetailInfo">详细信息</el-button-->
          <button class="detail-button" @click="showDetailInfo">详细信息</button>
        </div>  
      </div>    
    </div>
    <el-dialog id="detail-dialog" class="dialog-box" v-model="detailDialogVisible" :title="movieInfo.title">
      <el-row v-if="dialogLoadingFlag">
        正在加载中...
      </el-row>
      <div class="dialog-body" v-if="!dialogLoadingFlag">
        <div>国家：<span v-for="country in detailInfo.countries">{{country}}&nbsp;&nbsp;</span></div>
        <div v-if="detailInfo.episodes_count">本季集数：{{detailInfo.episodes_count}}集</div>
        <div>简介：
          <p>{{detailInfo.summary}}</p>
        </div>
        <div>
          <div v-for="cast in detailInfo.casts" class="detail-dialog-avatar">
            <img style="border-radius: 50%;"  :src="cast.avatars.medium">
            <div>{{cast.name}}</div>
          </div>          
        </div>
      </div>      
    </el-dialog>
    <el-dialog id="cast-dialog" class="dialog-box" v-model="castDialogVisible" :title="castInfo.name">
      <el-row v-if="dialogLoadingFlag">
        正在加载中...
      </el-row>
      <div class="dialog-body" v-if="!dialogLoadingFlag">
        <div class="cast-dialog-avatar">
          <img :src="castInfo.avatars.medium" style="border-radius: 20%;">
        </div>
        <div class="cast-dialog-info">
          <div v-if="castInfo.name_en">英文名：{{castInfo.name_en}}</div>
          <div>性别：{{castInfo.gender}}</div>
          <div>出生地：{{castInfo.born_place}}</div>
          <div>主要作品：<span v-for="work in castInfo.works">{{work.subject.title}}&nbsp;&nbsp;</span></div>
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
        dialogLoadingFlag: true,
        detailInfo: {},
        castInfo: {},
        detailDialogVisible: false,
        castDialogVisible: false,
        directorDialogVisible: false
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
        this.detailDialogVisible = true;        
        this.dialogLoadingFlag = true;

        axios.get(url)
          .then((res)=>{
            // console.log(res.data);
            this.detailInfo = res.data;
            this.dialogLoadingFlag = false;
          });
      },
      showCastInfo(cast) {
        // console.log(cast);
        let url = `https://api.douban.com/v2/movie/celebrity/${cast.id}`;
        this.castDialogVisible = true;
        this.dialogLoadingFlag = true;

        axios.get(url)
          .then((res) => {
            this.castInfo = res.data;
            this.dialogLoadingFlag = false;
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

  .dialog-body {
    position: relative;
    padding: 10px 20px;
  }

  .dialog-body > div {
    padding: 10px 0
  }

  .human {
    color:aqua;
  }

  .human:hover {
    cursor: pointer;
  }

  .detail-dialog-avatar {
    display: inline-block; 
    text-align: center;
    margin-left: 18px;
  }

  .cast-dialog-avatar {
    float: left;
    margin-right: 50px;
  }

  .cast-dialog-info > div {
    margin-bottom: 15px;
  }
</style>