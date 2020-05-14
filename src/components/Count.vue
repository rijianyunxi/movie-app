<template>
  <div class="buy-box">
    <span @click="jian">-</span>
    <input v-model="data.number" type="text" readonly />
    <span @click="add">+</span>
  </div>
</template>

<script>
export default {
  name: 'count',
  props:{
      data: Object
  },
  data() {
    return {
      
    };
  },
  methods: {
    jian() {
      if (this.data.number > 1) {
        this.data.number--;
        this.data.allPrice = this.data.number * this.data.onePrice;
      } else {
        return;
      }
    },
    add() {
      this.data.number++;
      this.data.allPrice = this.data.number * this.data.onePrice;
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