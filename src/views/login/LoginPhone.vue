<template>
  <div>
    <nav-bar class="login-navbar">
      <template #left>
        <van-icon name="arrow-left" @click="loginback" />
      </template>
      <template #title>
        <span class="title">手机号登陆</span>
      </template>
    </nav-bar>
    <div class="center">
      <van-form>
        <!-- @submit="onSubmit" -->
        <van-field
          v-model="phonenumber"
          name="手机号"
          left-icon="iconfont icon-shouji"
          icon-prefix="iconfont icon-shouji"
          placeholder="请输入手机号"
          maxlength="11"
          :rules="[{ validator: CheckPhone }]"
        />
        <van-field
          v-model="captcha"
          type="captcha"
          name="验证码"
          left-icon="iconfont icon-yanzhengma"
          icon-prefix="iconfont icon-yanzhengma"
          placeholder="请输入验证码"
          center
          clearable
          :rules="[{ validator: CheckCaptcha }]"
        >
          <template #button>
            <button class="captcha" @click="getCaptcha" :disabled="flag">
              {{ content }}
            </button>
          </template>
        </van-field>
      </van-form>
      <button class="login" @click="login">登录</button>
    </div>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import NavBarIcon from "components/common/navbar/NavBarIcon";

// import { getLoginStatus } from "network/login.js";
import { mapState } from "vuex";

import axios from "axios";

export default {
  name: "LoginPhone",
  components: {
    NavBar,
    NavBarIcon,
  },
  data() {
    return {
      phonenumber: "",
      captcha: "",

      //校验手机号码
      checkphone: "",

      //校验验证码
      checkcaptcha: "",

      //验证码按钮
      flag: false, //按钮是否可取
      content: "点击获取",
      totalTime: 60, //倒计时时间

      //登录状态
      loginstatus: {},
      //用户详情信息
      userdetails: {},
    };
  },
  created() {
    // this.getLoginStatus();
  },
  computed: {
    ...mapState(["loginStatus"]),
    ...mapState(["userDetail"]),
  },
  methods: {
    loginback() {
      this.$router.go(-1);
    },
    // onSubmit(values) {
    //   console.log("submit", values);
    // },
    //检验手机号是否规范
    CheckPhone(phonenumber) {
      if (!/^1(3|4|5|6|7|8|9)\d{9}$/.test(phonenumber)) {
        this.checkphone = false;
      } else {
        this.checkphone = true;
      }
    },
    //检验验证码是否规范
    CheckCaptcha(captcha) {
      if (!/^\d{4}$/.test(captcha)) {
        this.checkcaptcha = false;
      } else {
        this.checkcaptcha = true;
      }
    },
    //获取验证码
    getCaptcha() {
      if (this.checkphone == true) {
        this.flag = true; //点击后该按钮不可取
        this.content = this.totalTime + "s";
        let clock = window.setInterval(() => {
          this.totalTime--;
          this.content = this.totalTime + "s";
          if (this.totalTime < 0) {
            window.clearInterval(clock);
            this.content = "重新获取";
            this.totalTime = 60;
            this.flag = false;
          }
        }, 1000);
        axios({
          method: "get",
          url:
            // "https://c0rn-music-api.vercel.app/captcha/sent?phone=" +
            "https://c0rn.top/captcha/sent?phone=" + this.phonenumber,
        })
          .then((res) => {
            console.log(res);
            //判断验证码的code码
            if (res.data.code === 200) {
              this.$toast.success("验证码已发送");
            } else {
              this.$toast.fail("发生错误");
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        this.$toast.fail("请输入正确的手机号码");
        console.log(this.phonenumber);
      }
    },
    login() {
      if (this.checkcaptcha == true) {
        console.log(this.checkcaptcha);
        //检验手机号与验证码是否正确
        axios({
          method: "get",
          url:
            // "https://c0rn-music-api.vercel.app/captcha/verify?phone=" +
            "https://c0rn.top/captcha/verify?phone=" +
            this.phonenumber +
            "&captcha=" +
            this.captcha,
        })
          .then((res) => {
            console.log(res);
            //判断检验code码
            if (res.data.code === 200) {
              //手机号与验证码检验正确后请求登录
              axios({
                method: "get",
                url:
                  // "https://c0rn-music-api.vercel.app/login/cellphone?phone=" +
                  "https://c0rn.top/login/cellphone?phone=" +
                  this.phonenumber +
                  "&captcha=" +
                  this.captcha,
                //  +
                // "&countrycode=86",
                withCredentials: true,
              })
                .then((res) => {
                  //判断登录code码
                  if (res.data.code === 200) {
                    //登录成功后将登录信息存入vuex
                    this.loginstatus = res.data;
                    console.log(this.loginstatus);
                    this.$store.dispatch("getLoginStatus", this.loginstatus);
                    this.$store.dispatch(
                      "getUserToken",
                      this.loginstatus.token
                    );
                    this.$store.dispatch(
                      "getUserCookie",
                      this.loginstatus.cookie
                    );
                    const userId = this.loginstatus.profile.userId;

                    //登录成功后获取用户的详情信息并存入vuex
                    axios({
                      method: "get",
                      url:
                        // "https://c0rn-music-api.vercel.app/user/detail?uid=" +
                        "https://c0rn.top/user/detail?uid=" + userId,
                      withCredentials: true,
                    }).then((res) => {
                      this.userdetails = res.data;
                      console.log(res);
                      console.log(this.userdetails);
                      this.$store.dispatch("getUserDetail", this.userdetails);
                      this.$toast.success("登录成功");
                      this.$router.push("/user");
                      window.location.reload();
                    });
                  } else {
                    this.$toast.fail("发生错误");
                  }
                })
                .catch((err) => {
                  console.log(err);
                  if (err.request.status !== 200) {
                    // let data = JSON.parse(err.request.response);
                    this.$toast.fail(err.request.response.message);
                  }
                });
            } else {
              this.$toast.fail("发生错误");
            }
          })
          .catch((err) => {
            // this.$toast(err.message);
            if (err.request.status === 503) {
              this.$toast.fail("验证码错误");
              console.log(err.request.status);
            }
          });
      } else {
        this.$toast.fail("输入的验证码格式错误");
        console.log(this.checkcaptcha);
      }
    },
  },
};
</script>

<style scoped>
.login-navbar >>> .van-nav-bar__title {
  /* width: 180px; */
  margin: 0 50px;
  /* text-align: left; */
}

.title {
  color: #fff;
  float: left;
}

.center {
  text-align: center;
}

.van-cell >>> .van-field__value {
  margin-left: 10px;
}

.captcha {
  background-color: #fff;
  color: var(--color-tint);
  font-size: 12px;
  width: 65px;
  padding: 4px;
  border: 1px solid var(--color-tint);
  border-radius: 20px;
}

.login {
  width: 90%;
  background-color: var(--color-tint);
  color: #fff;
  font-size: 16px;
  padding: 8px 0;
  border: 1px solid #fff;
  border-radius: 20px;
}
</style>