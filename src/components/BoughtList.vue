<template>
  <div class="boughtlist">
    <div v-for="(message,index) in messages" :key="index" style="background: #fff;">
      <div class="message">
        <img :src="message.picture" alt />
        <div class="messagebox">
          <p style="color: #333; font-size: 19px;">{{message.movie}}</p>
          <p>数量：{{message.number}}</p>
          <p>单价：{{message.onePrice}}</p>
          <p>总价：{{message.allPrice}}</p>
          <span @click="getUrl(message.id,index)">查看链接</span>
        </div>
      </div>
      <div class="url" v-show="index == current">
          <div class="urlbox" v-for="(url,index) in urls" :key="index">
              {{url}}
          </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "boughtList",
  props: {
    messages: Array
  },
  data() {
    return {
      current: 9999,
      urls: []
    };
  },
  methods: {
    getUrl(ids, index) {
      this.current = index;
      this.$axios
        .post("/information", { id: ids })
        .then(res => {
          let arr = res.data[0].downloadUrl.split("###");
          //需存数据库所以只要字符串
          var downloadList = [];
          arr.forEach((item, i) => {
            downloadList.push(item.split("$")[1]);
          });
          this.urls = downloadList;
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style scoped>
.boughtlist {
  width: 100%;
  padding: 0 15px;
  margin-top: 55px;
}
.message {
  height: 120px;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 10px 0;
  box-shadow: 5px 5px 10px #999;
}
.message img {
  height: 100px;
  width: 70px;
  margin: 0 15px;
}
.messagebox {
  height: 100px;
  flex: 1;
  position: relative;
}
.messagebox span {
  display: block;
  height: 45px;
  width: 100px;
  line-height: 45px;
  text-align: center;
  position: absolute;
  right: 0;
  bottom: 0;
  color: hsl(212, 78%, 57%);
}
.messagebox p {
  font-size: 17px;
  color: #999;
  margin: 5px 0;
}
.url {
  width: 100%;
  background: #fff;
}
.urlbox{
    height: 35px;
    line-height: 35px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: hsl(212, 78%, 57%);
}
</style>