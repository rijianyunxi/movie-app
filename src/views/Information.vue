<template>
  <div class="information">
    <Header :back="true" title="详情" />
    <MovieList :buyShow="false" :movies="movies" />
    <div v-if="movies[0]" class="desc">
      <p>{{movies[0].area}}</p>
      <span>{{movies[0].movieDesc}}</span>
    </div>
    <BuyBar v-if="movies[0]" :movies="movies" />
  </div>
</template>

<script>
import Header from "../components/Headers";
import MovieList from "../components/MovieList";
import BuyBar from "../components/BuyBar";
export default {
  name: "information",
  components: {
    Header,
    MovieList,
    BuyBar
  },
  activated() {
    this.getData();
  },
  data() {
    return {
      movies: []
    };
  },
  methods: {
    getData() {
      let id = this.$route.params.id;
      if (id) {
        this.$axios
          .post("/information", { id: id })
          .then(res => {
            this.movies = res.data;
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        alert("缺少参数Id");
      }
    }
  }
};
</script>

<style scoped>
.information {
  height: calc(100% - 45px);
  width: 100%;
  background: #f2f2f2;
  overflow-y: scroll;
}
.container {
  margin-top: 40px;
}
.desc {
  /* margin-top: 240px; */
  padding: 15px;
  font-size: 16px;
  background: #fff;
  color: #999;
  line-height: 25px;
}
</style>