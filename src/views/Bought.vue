<template>
  <div class="bought">
    <Headers :back="true" title="已购买" />
    <div class="list">
      <BoughtList :messages="movies"/>
    </div>
  </div>
</template>

<script>
import Headers from "../components/Headers";
import BoughtList from "../components/BoughtList";
export default {
  name: "bought",
  components: {
    Headers,
   BoughtList
  },
  activated(){
      this.getBoughtMovies()
  },
  data() {
    return {
      movies: []
    };
  },
  methods: {
    getBoughtMovies() {
      this.$axios
        .post(
          "/getShop",
          {
            status:1
          },
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token")
            }
          }
        )
        .then(res => {
            this.movies = res.data.results
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style scoped>
.bought{
    height:100%;
    width:100%;
    overflow-y: scroll;
    background: #f2f2f2;
    }
</style>