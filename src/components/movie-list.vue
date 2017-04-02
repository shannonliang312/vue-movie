<template>
  <div>    
    <el-row >
      <h3 v-if="searchRes.title" style="padding-left: 150px">{{searchRes.title}}：</h3>
    </el-row>
    <div style="padding: 10px 150px 0 150px">
      <movie-card v-for="item in searchRes.subjects" :key="item.id" :movieInfo="item" @onDialog="showDialog"></movie-card>
    </div>
    <el-dialog v-model="dialogVisible" :title="dialogTitle">
      <el-row v-if="dialogLoading">
        正在加载中...
      </el-row>
      <transition 
        name="custom-classes-transition"
        enter-active-class="animated fadeIn"      
        >
        <div v-if="!dialogLoading">
          <div class="dialog-body" v-if="detailDialogFlag">
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
          <div class="dialog-body" v-if="castDialogFlag">
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
        </div>
      </transition>
    </el-dialog>
  </div>
</template>

<script>
  import axios from 'axios'
  import MovieCard from './movie-card'

  export default {
    name: "movie-list",
    props: ["searchRes"],
    data() {
      return {
        dialogVisible: false,
        dialogLoading: false,
        dialogTitle: "",
        detailDialogFlag: false,
        castDialogFlag: false,
        detailInfo: {},
        castInfo: {}
      }
    },
    methods: {
      showDialog(val) {
        this.dialogVisible = true;
        this.dialogTitle = val.title;
        this.dialogLoading = true;
        
        if(val.type == "detail") {
          this.detailDialogFlag = true;
          this.castDialogFlag = false;

          axios.get(val.url)
            .then((res) => {
              this.detailInfo = res.data;
              this.dialogLoading = false;
            });
        } else {
          this.detailDialogFlag = false;
          this.castDialogFlag = true;

          axios.get(val.url)
            .then((res) => {
              this.castInfo = res.data;
              this.dialogLoading = false;
            });
        }

      }
    },
    components: {
      MovieCard
    }
  }  
</script>

<style>
  img:hover {
    box-shadow: 5px 5px 5px #475669;
    cursor: pointer;
  }

  .dialog-body {
    position: relative;
    padding: 10px 20px;
  }

  .dialog-body > div {
    padding: 10px 0
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