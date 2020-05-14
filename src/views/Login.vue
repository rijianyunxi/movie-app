<template>
  <div class="main">
    <div class="login" v-if="ifLogin">
      <div class="top">
        <p>登录Movie</p>
        <p>发现更多美好的事物</p>
        <!-- <span class="iconfont icon-cuo" @click="$router.push('/me')"></span> -->
      </div>
      <div class="from">
        <div class="input">
          <input v-model="username" type="text" placeholder="请输入账号" />
        </div>
        <div class="input">
          <input v-model="password" type="password" placeholder="请输入密码" />
        </div>
        <div class="err" v-show="error.login.status">{{error.login.msg}}</div>
        <div class="tip">点击登录即同意《Movie协议》，《隐私保护指引》</div>
        <div class="submits" @click="login">登录</div>
        <div @click="change" class="have">没有账号？前往注册</div>
      </div>
    </div>
    <div class="login" v-else>
      <div class="top">
        <p>注册Movie</p>
        <p>发现更多美好的事物</p>
        <!-- <span class="iconfont icon-cuo" @click="$router.push('/Me')"></span> -->
      </div>
      <div class="from">
        <div class="input">
          <input @blur="checkUser" v-model="username" type="text" placeholder="请输入您的用户名" />
        </div>
        <div class="err" v-show="error.username.status">{{error.username.msg}}</div>
        <div class="input">
          <input v-model="mail" type="text" placeholder="请输入您的邮箱" />
        </div>
        <div class="err" v-show="error.mail.status">{{error.mail.msg}}</div>
        <div class="mail">
          <div class="mailinput">
            <input v-model="mailCode" type="text" placeholder="邮箱验证码" />
          </div>
          <div class="getmail" @click="getCode">
            <button :disabled="disabled">{{btnTitle}}</button>
          </div>
        </div>
        <div class="err" v-show="error.mailCode">请输入正确的验证码</div>
        <div class="input">
          <input v-model="password" type="password" placeholder="请输入您的密码" />
        </div>
        <div class="input">
          <input @blur="checkPassword" v-model="password1" type="password" placeholder="请再次输入密码" />
        </div>
        <div class="err" v-show="error.password.status">{{error.password.msg}}</div>
        <div class="err" v-show="error.register.status">{{error.register.msg}}</div>
        <div class="tip">点击注册即同意《Movie协议》，《隐私保护指引》</div>
        <div class="submits" @click="register">注册</div>
        <div @click="change" class="have">我有账号？前往登录</div>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from "mint-ui";
export default {
  name: "login",
 activated() {
    this.checkLogin();
  },
  data() {
    return {
      username: "",
      mail: "",
      mailCode: "",
      btnTitle: "获取验证码",
      disabled: false,
      password: "",
      password1: "",
      ifLogin: true,
      error: {
        username: {
          status: false,
          msg: ""
        },
        mail: {
          status: false,
          msg: ""
        },
        password: {
          status: false,
          msg: ""
        },
        login: {
          status: false,
          msg: ""
        },
        register: {
          status: false,
          msg: ""
        }
      }
    };
  },
  methods: {
    checkLogin() {
      let token = localStorage.getItem("token");
      if (localStorage.getItem("token")) {
        let instance = Toast("你已经登录成功");
        setTimeout(() => {
          this.$router.go(-1);
          instance.close();
        }, 2000);
      }
    },
    change() {
      this.ifLogin = !this.ifLogin;
    },
    login() {
      if (this.username && this.password) {
        this.error.login.status = false;
        this.$axios
          .post("/login", {
            username: this.username,
            password: this.password
          })
          .then((res, err) => {
            console.log(res);
            if (res.data.status == 200) {
              let instance = Toast("登录成功");
              setTimeout(() => {
                instance.close();
              }, 2000);
              localStorage.setItem("token", res.data.token);
              localStorage.setItem("username", res.data.username);
              this.$router.push('/home');
            }  else {
              this.error.login.status = true;
              this.error.login.msg = "账号或密码错误";
            }
          });
      } else {
        this.error.login.status = true;
        this.error.login.msg = "用户名或密码不能为空";
      }
    },
    checkUser() {
      let reg = /^[A-Za-z0-9\u4e00-\u9fa5]{5,14}/;
      let result = reg.test(this.username);
      if (!this.username) {
        this.error.username.status = false;
        this.error.username.msg = "用户名不能为空";
      } else if (!result) {
        this.error.username.status = true;
        this.error.username.msg = "格式不正确，5-14位英文或数字";
      } else {
        this.$axios
          .post("/checkUser", { username: this.username })
          .then((res, err) => {
            if (res.data.status == 202) {
              this.error.username.status = true;
              this.error.username.msg = res.data.msg;
            } else if (res.data.status == 504) {
              this.error.username.status = true;
              this.error.username.msg = res.data.msg;
            } else {
              this.error.username.status = false;
              this.error.username.msg = "";
            }
          });
      }
    },
    checkMail() {
      let reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
      let result = reg.test(this.mail);
      if (!this.mail) {
        this.error.mail.status = true;
        this.error.mail.msg = "邮箱不能为空";
      } else if (!result) {
        this.error.mail.status = true;
        this.error.mail.msg = "邮箱格式不正确";
      } else {
        this.error.mail.status = false;
        this.error.mail.msg = "";
        return true;
      }
    },
    getCode() {
      if (this.checkMail()) {
        this.$axios.post("/sendMail", { mail: this.mail }).then((res, err) => {
          if (res.data.status == 200) {
            let time = 120;
            let timer = setInterval(() => {
              time--;
              this.disabled = true;
              if (time >= 1) {
                this.btnTitle = `${time}后重新获取`;
              } else {
                this.btnTitle = `获取验证码`;
                this.disabled = false;
                clearInterval(timer);
              }
            }, 1000);
          }
        });
      }
    },
    checkPassword() {
      if (this.password != this.password1) {
        this.error.password.status = true;
        this.error.password.msg = "两次密码不一致";
      } else {
        this.error.password.status = false;
        this.error.password.msg = "";
      }
    },
    register() {
      if (
        this.password &&
        this.password1 &&
        this.username &&
        this.mail &&
        this.mailCode &&
        !this.error.username.status &&
        !this.error.mail.status &&
        !this.error.password.status
      ) {
        this.$axios
          .post("/register", {
            username: this.username,
            mail: this.mail,
            mailCode: this.mailCode,
            password: this.password
          })
          .then((res, err) => {
            if (res.status == 203) {
              this.error.register.status = true;
              this.error.register.msg = res.data.msg;
            }else if (res.status == 202) {
              this.error.register.status = true;
              this.error.register.msg = res.data.msg;
            } else {
              this.error.register.status = false;
              this.error.register.msg = "";
              let instance = Toast("注册成功,请登录");
              setTimeout(() => {
                instance.close();
              }, 2000);
              this.ifLogin = true;
            }
          });
      } else {
        this.error.register.status = true;
        this.error.register.msg = "请检查内容是否完整";
      }
    }
  }
};
</script>

<style scoped>
.main {
  height: 100%;
  width: 100%;
  background-color: #fff;
}
.login .top {
  height: 120px;
  background: #42b983;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  color: #fff;
  position: relative;
}
/* .login .top span {
  position: absolute;
  right: 25px;
  top: 25px;
  font-size: 18px;
} */
.login .top p:nth-child(1) {
  font-size: 20px;
  padding: 8px 0;
}
.login .from {
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #fff;
}

.login .from .input {
  width: 80%;
  margin-bottom: 15px;
  border-bottom: 2px solid #ebebeb;
}
.login .from input {
  height: 40px;
  width: 100%;
  border: 0;
  outline: 0;
  background: transparent;
  font-size: 16px;
  color: #333;
}
.login .from .mail {
  width: 80%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}
.login .from .mail .mailinput {
  width: 40%;
  border-bottom: 2px solid #ebebeb;
}
.login .from .mail .getmail {
  width: 40%;
  height: 35px;
  line-height: 35px;
  text-align: center;
  font-size: 15px;
  color: #333;
  padding: o 10px;
  border-radius: 2px;
}
.login .from .mail .getmail button {
  width: 100%;
  height: 100%;
  border: 0;
  outline: none;
}
.login .from .err {
  height: 30px;
  line-height: 30px;
  width: 80%;
  font-size: 13px;
  color: red;
}
.login .from .tip {
  height: 40px;
  line-height: 40px;
  width: 70%;
  font-size: 11px;
  color: #999;
}
.login .from .submits {
  height: 35px;
  width: 80%;
  border-radius: 4px;
  background: #42b983;
  line-height: 35px;
  text-align: center;
  color: #fff;
  font-size: 17px;
  margin-top: 15px;
}
.login .from .have {
  height: 35px;
  width: 60%;
  font-size: 14px;
  color: #42b983;
  margin-top: 15px;
  line-height: 35px;
  text-align: center;
}
</style>