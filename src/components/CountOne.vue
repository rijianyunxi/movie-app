<template>
  <div v-if="$store.getters.shops" class="buy-box">
    <span @click="minus">-</span>
    <!-- <input v-model="$store.getters.shops.number" type="text" readonly /> -->
    <input v-model="number" type="text" readonly />
    <span @click="add">+</span>
  </div>
</template>

<script>
export default {
  name: "count",
  computed: {
    number() {
      return this.$store.getters.shops.filter(r =>r.id == this.id)[0].number;
    }
  },
  props: {
    id: Number
  },
  data() {
    return {};
  },
  methods: {
    minus() {
      if(this.number>1){
        this.$store.dispatch('minusNumber',this.id);
      }
    },
    add() {
      this.$store.dispatch('addNumber',this.id)
    }
  }
};
</script>

<style scoped>
.buy-box {
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.buy-box span {
  display: block;
  width: 25px;
  height: 25px;
  background: #eee;
  color: #999;
  font-size: 18px;
  line-height: 25px;
  text-align: center;
  margin: 0 2px;
}
.buy-box input {
  width: 35px;
  height: 23px;
  background: #eee;
  border: 0;
  text-align: center;
  outline: none;
}
</style>