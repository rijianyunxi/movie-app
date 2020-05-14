<template>
  <div class="me">
    <Headers title="我的" />
    <!-- 如果登录 展示名字  -->
    <div v-show="ifLogin" class="my">
      <div class="imgbox">
        <img src="http://img3.imgtn.bdimg.com/it/u=1060068824,3550270001&fm=26&gp=0.jpg" alt />
      </div>
      <div class="conbox">
        <p style="font-size: 18px;">{{username}}</p>
        <p>这家伙很懒，什么都没留下~~</p>
      </div>
    </div>
    <!-- 如果没登录 点击登录  -->
    <div
      @click="$router.push('/login')"
      v-show="!ifLogin"
      class="login"
      style="justify-content: center;font-size: 18px;color: #fff;"
    >请登录</div>
    <div class="msgbuy">
      <div @click="$router.push('/shopCar')" class="shopcar">
        <p>购物车</p>
        <p>0</p>
      </div>
      <div @click="$router.push('/bought')" class="buy">
        <p>已购买</p>
        <p>0</p>
      </div>
    </div>
    <!-- 广告位 -->
    <div class="banner">
      <img
        src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3439462162,862317409&fm=11&gp=0.jpg"
        alt
      />
    </div>
    <!-- 我的信息 -->
    <div class="mymsg">
      我的地址
      <i class="iconfont icon-youjiantou"></i>
    </div>
    <!-- 账户安全 -->
    <div class="secure">
      账户安全
      <i class="iconfont icon-youjiantou"></i>
    </div>
    <!-- 退出登录 -->
    <div v-if="ifLogin" @click="logout" class="logout" style="justify-content:center">退出登录</div>
  </div>
</template>

<script>
import Headers from "../../components/Headers";
export default {
  name: "me",
  components: {
    Headers
  },
  activated() {
    this.checkLogin();
  },
  data() {
    return {
      ifLogin: false,
      username:localStorage.getItem('username')
    };
  },
  methods: {
    checkLogin() {
      if (localStorage.getItem("token")) {
        this.$axios
          .post(
            "/refresh",
            {},
            {
              headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
              }
            }
          )
          .then(res => {
            this.ifLogin = true;
          })
          .catch(err => {
            this.ifLogin = false;
          });
      } else {
        this.ifLogin = false;
      }
    },
    logout() {
      localStorage.removeItem("username");
      localStorage.removeItem("token");
      this.$router.push("/login");
    },
  }
};
</script>

<style scoped>
.me {
  height: 100%;
  width: 100%;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}
.my,
.login {
  margin-top: 44px;
  height: 100px;
  width: 100%;
  padding: 15px;
  background: #42b983;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
/* .login{

} */
.my .imgbox {
  width: 75px;
  height: 75px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 15px;
}
.my .imgbox img {
  width: 75px;
  height: 75px;
  background-position: center;
}
.my .conbox p {
  color: #fff;
  font-size: 13px;
  margin-bottom: 7px;
}
.msgbuy {
  height: 90px;
  width: 100%;
  padding: 15px;
  background: #42b983;
  display: flex;
  color: #fff;
  justify-content: center;
  align-items: center;
}
.msgbuy p {
  height: 20px;
  line-height: 20px;
  margin-bottom: 5px;
  font-size: 17px;
  font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
}
.msgbuy .shopcar {
  height: 60px;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-right: 1px solid #fff;
}
.msgbuy .buy {
  height: 60px;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.banner {
  height: 120px;
  width: 90%;
  margin: 20px 5%;
  border-radius: 10px;
  overflow: hidden;
}
.banner img {
  height: 120px;
  width: 100%;
}
.mymsg,
.secure,
.logout {
  height: 50px;
  width: 90%;
  padding: 15px;
  background: #42b983;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  font-size: 17px;
  color: #fff;
  border-radius: 5px;
}
</style>