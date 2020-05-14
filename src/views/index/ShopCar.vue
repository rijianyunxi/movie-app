<template>
  <div class="shopcar">
    <Headers title="购物车" />
    <ShopList v-if="this.$store.getters.shops.length>0" />
    <div v-else class="empty">购物车空的雅痞~~~</div>
    <div class="pay">
      <i @click="allCheck" class="iconfont icon-gouxuan" :class="{'checked' :  ifCheck}"></i>
      <span style="color:red">￥{{$store.getters.totalPrice}}</span>
      <div class="gopay">
        <span @click="pay">结算</span>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from "mint-ui";
import Headers from "../../components/Headers";
import ShopList from "../../components/ShopList";
export default {
  name: "shopcar",
  components: {
    Headers,
    ShopList
  },
  computed: {
    ifCheck() {
      return this.$store.getters.checkedShops.length ==
        this.$store.getters.shops.length &&
        this.$store.getters.shops.length != 0
        ? true
        : false;
    }
  },
  created() {
    this.getShop();
  },
  // activated() {},
  methods: {
    //拉取数据库的订单信息 通过加token来辨别用户
    getShop() {
      this.$axios
        .post(
          "/getShop",
          {
            status: 0
          },
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token")
            }
          }
        )
        .then(res => {
          if (res.data.results.length > 0) {
            this.$store.dispatch("addShop", {
              shop: res.data.results,
              place: 0
            });
          }
        })
        .catch(err => {
          localStorage.removeItem("username");
          localStorage.removeItem("token");
          let instance = Toast("token无效，请重新登录");
          setTimeout(() => {
            instance.close();
          }, 2000);
          this.$router.push("/login");
        });
    },
    //全选或全不选
    allCheck() {
      if (
        this.$store.getters.checkedShops.length ==
        this.$store.getters.shops.length
      ) {
        this.$store.dispatch("minusShop", {
          shop: [2],
          place: 2
        });
      } else {
        this.$store.dispatch("addShop", {
          shop: [2],
          place: 2
        });
      }
    },
    //进入支付界面
    pay() {
      if (this.$store.getters.checkedShops.length > 0) {
        this.$router.push("/pay");
      } else {
        let instance = Toast("请选择商品");
        setTimeout(() => {
          instance.close();
        }, 2000);
      }
    }
  }
};
</script>

<style scoped>
.shopcar {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}
.shopcar .empty {
  margin-top: 45px;
  width: 100%;
  height: 100px;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 17px;
  color: #888;
}
.list {
  margin-top: 100px;
  height: 100px;
  background: cadetblue;
}
.pay {
  height: 45px;
  width: 100%;
  background: #fff;
  padding: 0 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #999;
}
.iconfont {
  font-size: 25px !important;
  margin-right: 15px;
  /* color: #42b983; */
}
.checked {
  color: #42b983;
}
.gopay {
  flex: 1;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.gopay span {
  display: block;
  height: 45px;
  width: 70px;
  background: #42b983;
  line-height: 45px;
  text-align: center;
  color: #fff;
}
</style>