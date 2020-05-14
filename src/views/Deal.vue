<template>
  <div class="deal">
    <Headers title="支付完成" />
    <div v-if="success" class="success">
      <p @click="$router.push('/me')">感谢你的购买,点我前往查看详情</p> 
    </div>
    <div v-else class="err">
		<p @click="$router.push('/home')" style="color:red">哦吼，发生了点意外，不如再买一次吧</p>
    </div>
  </div>
</template>

<script>
// console.log(window.location)
import Headers from "../components/Headers";
export default {
  name: "deal",
  components: {
    Headers
  },
  activated() {
    this.deal();
  },
	data(){
		return{
			success: true
		}
	},
  methods: {
    deal() {
      console.log(this.$route.query);
      let shops = [];
      let arr = this.$route.query.name.split("AAA");
      arr.forEach(e => {
       shops.push(JSON.parse(e))
      });
      console.log(shops);
      //发起请求处理数据库的信息
      this.$axios
        .post(
          "/deal",
          {
            arr:shops
          },
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token")
            }
          }
        )
        .then(res => {
          if(res.status == 200){
			  this.success = true
		  }else{
			  ths.success = false
		  }
          
        })
        .catch(err => {
		  console.log(err);
		  ths.success = false
        });
    },
  }
};
</script>

<style scoped>
.deal {
  height: 100%;
  width: 100%;
  background: #fff;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
}
.success,.err{
  flex:1;
  width: 100%;
  background:#f2f2f2;
  display: flex;
  justify-content: center;
  align-items: center;
  color: green;
}
</style>