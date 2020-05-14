<template>
  <div class="buybar">
    <div v-show="ifShowBar" class="bar">
      <div class="price" style="color: red;font-size: 16px;">￥0.01</div>
      <div class="btn">
        <div class="btn-order" @click="openCar">加入购物车</div>
        <div class="btn-buy" @click="open">立刻购买</div>
      </div>
    </div>
    <div @click="close()" v-show="ifShowBuy" class="buy-mengban">
      <div class="buy" @click="$event.cancelBubble = true">
        <img :src="movies[0].picture" alt />
        <span style="color:red">￥{{data.allPrice}}</span>
        <span>{{movies[0].movie}}</span>
        <div class="num">
          <span>购买数量</span>
          <Count :data="data" />
        </div>
        <div v-if="ifPay" class="buyok" @click="goPay">立即购买</div>
        <div v-else class="buyok" @click="addCar">加入购物车</div>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from "mint-ui";
import Count from "../components/Count";
export default {
  name: "buybar",
  props: {
    movies: Array
  },
  components: {
    Count
  },
  data() {
    return {
      ifShowBuy: false,
      ifShowBar: true,
      ifPay: true,
      data: {
        number: 1,
        onePrice: 0.01,
        allPrice: 0.01
      }
    };
  },
  methods: {
    close() {
      this.ifShowBuy = false;
      this.ifShowBar = true;
      this.ifPay = true;
      this.data.number = 1;
    },
    open() {
      this.ifShowBar = false;
      this.ifShowBuy = true;
    },
    goPay() {
      let shop = {
        id: this.movies[0].id,
        movie: this.movies[0].movie,
        picture: this.movies[0].picture,
        number: this.data.number,
        onePrice: this.data.onePrice,
        allPrice: this.data.allPrice,
        checks: 0,
        success: 0
      };

      this.$axios
        .post("/addShop", shop, {
          //添加headers token辨别用户
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token")
          }
        })
        .then(res => {
          this.$store.dispatch("addShop", { shop: [shop], place: 1 });
          // 使购物车的number归0
          this.data.number = 1;
          this.ifShowBuy = false; //关闭
          this.$router.push('/pay');
        }).catch(err=>{
          localStorage.removeItem('token');
          this.$router.push('/login')
          let instance = Toast("token无效，请重新登录");
          setTimeout(() => {
            instance.close();
          }, 2000);
        })

    },
    openCar() {
      this.ifPay = false;
      this.ifShowBuy = true;
    },
    addCar() {
      //要发送的商品信息
      let shop = {
        id: this.movies[0].id,
        movie: this.movies[0].movie,
        picture: this.movies[0].picture,
        number: this.data.number,
        onePrice: this.data.onePrice,
        allPrice: this.data.allPrice,
        checks: 0,
        success: 0
      };

      this.$axios
        .post("/addShop", shop, {
          //添加headers token辨别用户
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token")
          }
        })
        .then(res => {
          this.$store.dispatch("addShop", { shop: [shop], place: 0 });
          let instance = Toast("成功添加到购物车~~");
          setTimeout(() => {
            instance.close();
          }, 2000);
          // 使购物车的number归0
          this.data.number = 1;
          this.ifShowBuy = false; //关闭
        }).catch(err=>{
          localStorage.removeItem('token');
          this.$router.push('/login')
          let instance = Toast("token无效，请重新登录");
          setTimeout(() => {
            instance.close();
          }, 2000);
        })
    }
  }
};
</script>

<style scoped>
.buybar {
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
  user-select: none;
}
.buybar .bar {
  height: 45px;
  width: 100%;
  background: #fff;
  padding: 0 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #fff;
}
.buybar .bar .btn {
  height: 35px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 20px;
  font-size: 14px;
}
.buybar .bar .btn .btn-order {
  height: 35px;
  line-height: 35px;
  padding: 0 8px;
  background: coral;
}
.buybar .bar .btn .btn-buy {
  height: 35px;
  line-height: 35px;
  padding: 0 8px;
  background: orange;
}
.buybar .buy-mengban {
  height: 100vh;
  width: 100%;
  background: rgba(0, 0, 0, 0.8);
}
.buybar .buy-mengban .buy {
  width: 100%;
  padding: 15px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #fff;
  position: fixed;
  bottom: 0;
  left: 0;
}
.buy img {
  height: 250px;
  margin: 20px 0;
}
.buy span {
  margin: 10px 0;
  font-size: 15px;
}
.buy .num {
  width: 70%;
  height: 45px;
  padding: 0 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.buy .buyok {
  height: 30px;
  width: 70%;
  margin: 30px;
  text-align: center;
  line-height: 30px;
  background: #42b983;
  color: #fff;
  cursor: pointer;
}
</style>