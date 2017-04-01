<template>
  <div>
    <div>国家：<span v-for="country in detailInfo.countries">{{country}}&nbsp;&nbsp;</span></div>
    <div v-if="detailInfo.episodes_count">本季集数：{{detailInfo.episodes_count}}集</div>
    <div >简介：
      <p>{{detailInfo.summary}}</p>
    </div>
  </div>
</template>

<script>
  export default {
    name: "detail-card",
    props: ["detailInfo"],
    data() {
      return {

      }
    },

  }
</script>