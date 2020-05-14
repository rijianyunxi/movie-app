<template>
  <div class="pay">
    <Headers :back="true" title="结算" />
    <!-- 待结算商品列表 -->
    <div class="shopList">
      <div v-for="(shop,index) in $store.getters.checkedShops" :key="index" class="shop">
        <span>{{shop.movie}}</span>
        <span>X {{shop.number}}</span>
        <span>￥ {{shop.allPrice}}</span>
      </div>
      <div
        class="total"
        style="justify-content: flex-end;color:green;"
      >合计￥{{$store.getters.totalPrice}}</div>
    </div>
    <!-- 支付 -->
    <div class="paymethods">
      <div @click="check(index)" v-for="(method,index) in pay" :key="index" class="methods">
        <span>{{method.text}}</span>
        <i class="iconfont icon-gouxuan" :class="{'checked' : currentIndex ==index}"></i>
      </div>
      <div @click="goPay" class="goPay">支付</div>
    </div>
  </div>
</template>

<script>
import Headers from "../components/Headers";
export default {
  name: "pay",
  components: {
    Headers
  },
  data() {
    return {
      pay: [
        { text: "支付宝", type: "alipay" },
        { text: "微信", type: "wxpay" },
        { text: "QQ", type: "qqpay" }
      ],
      way: "alipay",
      currentIndex: 0
    };
  },
  activated() {
    this.back();
  },
  methods: {
    check(index) {
      this.currentIndex = index;
      this.way = this.pay[index].type;
      console.log(this.way);
    },
    back() {
      if (this.$store.getters.checkedShops.length == 0) {
        alert("缺少参数");
        this.$router.push("/shopCar");
      }
    },
    goPay() {
      let shops = [];
      this.$store.getters.checkedShops.map(r => {
        let shop = {
          id: r.id,
          number: r.number,
          onePrice: r.onePrice,
          allPrice: r.allPrice
        };
        shops.push(JSON.stringify(shop));
      });

      this.$axios
        .post(
          "/pay",
          {
            name: shops.join('AAA'),
            totalPrice: this.$store.getters.totalPrice,
            type: this.way
          },
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token")
            }
          }
        )
        .then(res => {
          console.log(res);
          window.location.href = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style scoped>
.pay {
  background: #f2f2f2;
  height: 100%;
  width: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  /* align-items: center; */
}
.shopList {
  flex: 1;
  margin-top: 50px;
  overflow-y: scroll;
}
.shop,
.total {
  height: 45px;
  width: 100%;
  padding: 0 15px;
  margin: 5px 0;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
}
.shop span {
  flex: 1;
  text-align: center;
  color: #333;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.paymethods {
  margin-top: 30px;
}
.methods {
  height: 45px;
  width: 100%;
  padding: 0 25px;
  background: #fff;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.iconfont {
  font-size: 23px !important;
}
.checked {
  color: green;
}
.goPay {
  height: 45px;
  width: 80%;
  background: #42b983;
  margin: 10px 10%;
  line-height: 45px;
  text-align: center;
  color: #fff;
}
</style>