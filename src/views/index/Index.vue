<template>
  <div class="index">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>

    <TabBar :tabBarData="tabBarData"></TabBar>
  </div>
</template>

<script>
import TabBar from "../../components/TabBar";
export default {
  name: "index",
  components: {
    TabBar
  },
  data() {
    return {
      tabBarData: [
        { title: "首页", icon: "iconfont icon-shouye-", path: "/home" },
        { title: "推荐", icon: "iconfont icon-tuijian", path: "/tui" },
        { title: "购物车", icon: "iconfont icon-gouwuche", path: "/shopCar" },
        { title: "我的", icon: "iconfont icon-wode", path: "/me" }
      ]
    };
  }
};
</script>

<style scoped>
.index {
  height: calc(100% - 50px);
  width: 100%;
  background: #f2f2f2;
}
</style>