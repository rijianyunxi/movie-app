<template>
  <!-- main -->
  <div class="container">
    <div class="movielist" v-for="(movie,index) in movies" :key="index">
      <!-- picture -->
      <div class="movieimg">
        <img :src="movie.picture" alt />
      </div>
      <!-- content -->
      <div class="moviecontent">
        <p>{{movie.movie}}</p>
        <p>{{movie.auth}}</p>
        <p>评分：{{movie.rate}}</p>
        <p>{{movie.tag}}</p>
        <p>年份：{{movie.year}}</p>
      </div>
      <!-- buy -->
      <div v-show="buyShow" class="buy">
        <span @click="detial(movie.id)">详情</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "movielist",
  props: {
    movies: Array,
    buyShow: Boolean
  },
  methods: {
    detial(id){
      this.$router.push({
        name:'information',
        params:{
          id: id
        }
      })
    }
  }
};
</script>

<style scoped>
.container {
  display: flex;
  /* justify-content: center; */
  flex-direction: column;
  align-items: center;
  padding: 15px 0px 0px 0px;
}
.container .movielist {
  height: 150px;
  width: 100%;
  background: #fff;
  padding: 0 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 15px;
  border-bottom: 2px solid #eee;
  color: #999;
}
.container .movielist .movieimg {
  height: 120px;
  width: 85px;
  margin-right: 15px;
}
.container .movielist .movieimg img {
  height: 120px;
  width: 85px;
}
.container .movielist .buy {
  height: 120px;
  width: 50px;
  display: flex;
  justify-content: center;
  align-items: flex-end;
}
.container .movielist .buy span {
  height: 30px;
  width: 50px;
  line-height: 30px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  background: #42b983;
  color: #fff;
}
.container .movielist .moviecontent {
  height: 120px;
  flex: 1;
}
.container .movielist .moviecontent p {
  margin-bottom: 8px;
}
.container .movielist .moviecontent p:nth-child(1) {
  color: #333;
  font-size: 17px;
}
.container .movielist .moviecontent p:nth-child(2) {
  width: 180px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>