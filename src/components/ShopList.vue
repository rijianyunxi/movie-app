<template>
  <div v-if="$store.getters.shops.length>0" class="shoplist">
    <div class="shop" v-for="(shop,index) in $store.getters.shops" :key="index">
      <!-- 选择框 -->
      <div class="checkbox">
        <i @click="check(shop.id)" class="iconfont icon-gouxuan" :class="{'checked' : ifCheck(shop.id)}"></i>
      </div>
      <!-- 照片 -->
      <div class="imgbox">
        <img :src="shop.picture" alt />
      </div>
      <!-- 主要内容 标题价格等 -->
      <div class="content">
        <div class="delete">
          <p>{{shop.movie}}</p>
          <i @click="deleteShop(shop.id)" class="iconfont icon-shanchu"></i>
        </div>
        <p @click="information(shop.id)">查案详情>></p>
        <div class="countbox">
          <span>￥{{shop.onePrice}}</span>
          <CountOne :id="parseInt(shop.id)" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from "mint-ui";
import CountOne from "./CountOne";
export default {
  name: "shoplist",
  components: {
    CountOne
  },
  data() {
    return {};
  },
  methods: {
    //未选时点击选中 选中时取消选中
    check(id) {
      if (this.$store.getters.checkedShops.some(r => r.id == id)) {
        this.$store.dispatch("minusShop", {
          shop: this.$store.getters.shops.filter(r => r.id == id),
          place: 1
        });
      } else {
        this.$store.dispatch("addShop", {
          shop: this.$store.getters.shops.filter(r => r.id == id),
          place: 1
        });
      }
    },
    //删除购物车内容
    deleteShop(id) {
      this.$axios
        .post(
          "/deleteShop",
          { id: id },
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token")
            }
          }
        )
        .then(res => {
          let instance = Toast("已删除，含泪告别");
          setTimeout(() => {
            instance.close();
          }, 2000);
        })
        .catch(err => {
          let instance = Toast("token无效，请重新登录");
          localStorage.removeItem('token');
          setTimeout(() => {
            instance.close();
          }, 2000);
        });
      if (this.$store.getters.checkedShops.some(r => r.id == id)) {
        this.$store.dispatch("minusShop", {
          shop: this.$store.getters.shops.filter(r => r.id == id),
          place: 1
        });
      }
      this.$store.dispatch("minusShop", {
        shop: this.$store.getters.shops.filter(r => r.id == id),
        place: 0
      });
    },
    //判断是否选中的
    ifCheck(shopId) {
      return this.$store.getters.checkedShops.some(r => r.id == shopId);
    },
    information(id) {
      this.$router.push({ name: "information", params: { id: id } });
    }
  }
};
</script>

<style scoped>
.shoplist {
  width: 100%;
  margin-top: 50px;
  flex: 1;
  overflow-y: scroll;
}
.shop {
  height: 120px;
  width: 100%;
  padding: 0 15px;
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 5px;
}
.shop .checkbox {
  height: 120px;
  width: 20px;
  text-align: center;
  line-height: 120px;
  font-size: 25px !important;
}
.iconfont {
  font-size: 25px !important;
}
.checked {
  color: #42b983;
}
.shop .imgbox {
  height: 100px;
  width: 70px;
  overflow: hidden;
  margin: 0 15px;
}
.shop img {
  height: 100px;
  /* width: 80px; */
}
.shop .content {
  flex: 1;
  height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
}
.shop .content p:nth-child(2) {
  height: 30px;
  line-height: 30px;
  font-size: 17px;
  color: #42b983;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 100%;
}
.shop .content .delete {
  width: 100%;
  height: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #333;
}

.countbox {
  width: 100%;
  height: 40px;
  color: red;
  font-size: 17px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>