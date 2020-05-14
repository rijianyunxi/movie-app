<template>
  <div class="tabbar">
    <div class="route">
      <router-link v-for="(item,index) in tabBarData" :key="index" :to="item.path">
        <i :class="item.icon"></i>
        {{item.title}}
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "tabbar",
  props: {
    tabBarData: Array
  }
};
</script>

<style scoped>
.tabbar {
  height: 50px;
  width: 100%;
  position: fixed;
  left: 0;
  bottom: 0%;
  z-index: 999;
}
.tabbar .route {
  height: 50px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fff;

}
.tabbar .route a {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  color: #333;
}
.tabbar .route a i {
  padding: 5px 0;
}
.tabbar .route a.router-link-exact-active {
  color: #42b983;
}
</style>