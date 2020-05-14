<template>
  <div class="home">
    <Headers title="首页"/>
    <div class="search-box" @click="$router.push('/search')">
      <div class="search">请搜索电影名或演员名</div>
    </div>
    <div class="swper-box">
      <div class="swper">
        <mt-swipe :auto="4000">
          <mt-swipe-item v-for="(img,index) in imgs" :key="index">
            <img :src="img" alt />
          </mt-swipe-item>
        </mt-swipe>
      </div>
    </div>
    <div class="tag">
      <ul>
        <li
          :class="{'checked' : index==currentIndex}"
          v-for="(tag,index) in tags"
          :key="index"
          @click="check(index)"
        >{{tag}}</li>
      </ul>
    </div>
    <MovieList :movies="movies" :buyShow=true />
  </div>
</template>

<script>
import MovieList from "../../components/MovieList";
import { Swipe, SwipeItem } from "mint-ui";
import Headers from "../../components/Headers";
export default {
  name: "home",
  components: {
    Headers,
    MovieList
  },
  created() {
    this.getMovie(0);
  },
  data() {
    return {
      imgs: [
        "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1392403833,353777295&fm=26&gp=0.jpg",
        "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1584376759655&di=fa018e1ff2eb93c8dfcfe4320cd2052a&imgtype=jpg&src=http%3A%2F%2Fimg0.imgtn.bdimg.com%2Fit%2Fu%3D1302168280%2C731917272%26fm%3D214%26gp%3D0.jpg",
        "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=58584233,2406690191&fm=26&gp=0.jpg"
      ],
      tags: ["剧情","恐怖", "战争","科幻", "爱情", "动作",'纪录'],
      currentIndex: 0,
      movies: []
    };
  },
  methods: {
    check(index) {
      this.movies = [];
      this.currentIndex = index;
      this.getMovie(index)
    },
    getMovie(index) {
      this.$axios.post("/getMovie",{index:index}).then((res, err) => {
        if (err) {
          console.log(err);
        } else {
          this.movies = res.data;
        }
      });
    }
  }
};
</script>

<style scoped>
.home {
  /* height: calc(100% - 1px); */
  height: 100%;
  width: 100%;
  overflow: scroll;
  background: #f2f2f2;
}
.home .search-box {
  margin-top: 45px;
  height: 40px;
  width: 100%;
  background: #42b983;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
  position: sticky;
  top: 44px;
  left: 0;
}
.home .search-box .search {
  height: 30px;
  width: 80%;
  background: #fff;
  font-size: 14px;
  border-radius: 15px;
  line-height: 30px;
  text-align: center;
  color: #999;
}
.home .swper-box {
  height: 90px;
  width: 100%;
  padding: 10px 0;
  background: #42b983;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
  display: flex;
  justify-content: center;
}
.home .swper-box .swper {
  height: 120px;
  width: 90%;
  background: #fff;
  border-radius: 20px;
  overflow: hidden;
  z-index: 9;
}
.home .swper-box .swper img {
  height: 120px;
  width: 100%;
  /* display: block; */
  vertical-align: middle;
}
.tag {
  margin-top: 50px;
  height: 48px;
  background: #42b983;
  font-size: 15px;
  color: #fff;
  overflow-x: scroll;
  overflow-y: hidden;
  white-space: nowrap;
  display: flex;
  align-items: center;
  position: sticky;
  top: 80px;
  left: 0;
}
.tag ul li {
  height: 40px;
  width: 60px;
  line-height: 40px;
  text-align: center;
  display: inline-block;
  cursor: pointer;
}
.checked {
  font-size: 18px;
  font-weight: bold;
}
</style>