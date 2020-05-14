<template>
  <div class="tui">
    <Headers title="推荐"/>
    <div class="box">
        <p>此项目API地址：</p>
        <a href="https://api.songjintao.cn" target="_blank">https://api.songjintao.cn</a>
        <p>我的博客地址：</p>
        <a href="https://songjintao.cn" target="_blank">https://songjintao.cn</a>
        <p>我的Githb地址：</p>
        <a href="https://github.com/rijianyunxi" target="_blank">https://github.com/rijianyunxi</a>
    </div>
  </div>
</template>

<script>
import Headers from "../../components/Headers";
export default {
  name: "tui",
  components:{
    Headers
  }
};
</script>

<style scoped>
.tui {
  height: 100%;
  width: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}
.box{
  flex:1;
  width: 100%;
  font-size: 20px;
  color: red;
  line-height: 30px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>