<template>
  <div class="search">
    <Header :back="true" title="搜索" />
    <div class="search-box">
      <input v-model="searchVal" type="text" placeholder="请搜索影视名、演员名" />
    </div>
    <div class="container">
      <MovieList :movies="movies" :buyShow=true />
      <div class="not-found" v-show="show">
        无搜索结果
      </div>
    </div>
  </div>
</template>

<script>
import Header from "../components/Headers";
import MovieList from "../components/MovieList";
export default {
  name: "search",
  components: {
    Header,
    MovieList
  },
  watch: {
    searchVal() {
      this.$debounce(() => {
        if (this.searchVal) {
          this.$axios
            .post("/searchMovie", { searchVal: this.searchVal })
            .then((res) => {
              if(res.data.length == 0){
                this.show = true;
                this.movies = []
              }else{
                this.show = false;
                this.movies = res.data;
              }
            }).catch(err=>{
              console.log(err);
               this.show = true;
                this.movies = []
            })
        }else{
            this.show = false;
            this.movies = []
        }
      }, 1500);
    }
  },
  data() {
    return {
      searchVal: "",
      movies: [],
      show: false
    };
  },
  methods: {}
};
</script>

<style scoped>
.search {
  height: 100%;
  width: 100%;
  background: #f2f2f2;
  overflow-y: scroll;
}
.search-box {
  height: 30px;
  width: 90%;
  margin: 55px 5% 20px 5%;
  padding: 0 10px;
  background: #fff;
  border-radius: 15px;
}

.search-box input {
  box-sizing: border-box;
  border: 0;
  outline: 0;
  height: 30px;
  line-height: 30px;
  width: 100%;
  color: #333;
  font-size: 15px;
  padding: 0 5px;
}
.not-found{
  height: 200px;
  width: 100%;
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  color: red;
  font-size: 17px;
  font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
}
</style>    