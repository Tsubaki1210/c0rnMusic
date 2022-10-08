<template>
  <div class="body">
    <div class="top">
      <van-icon name="arrow-left" @click="loginback" />
    </div>
    <div class="center">
      <div>
        <button class="loginphone" @click="loginphone">手机号登录</button>
      </div>
      <div>
        <button class="loginemail" @click="loginemail">网易邮箱登录</button>
      </div>
      <span>没有账号? 立即注册</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  methods: {
    loginback() {
      this.$router.go(-1);
    },
    loginphone() {
      this.$router.push({ name: "loginphone" });
    },
    loginemail() {
      this.$router.push({ name: "loginemail" });
    },
  },
  beforeRouteEnter(to, from, next) {
    //设置背景色
    document
      .querySelector("body")
      .setAttribute("style", "background-color: var(--color-tint)");
    next();
  },
  beforeRouteLeave(to, from, next) {
    //离开时清除背景色
    document.querySelector("body").setAttribute("style", "");
    next();
  },
};
</script>

<style scoped>
.body {
  /* width: 100%; */
  height: 100vh;
}

.top {
  height: 44px;
}

.van-icon {
  color: #fff;
  line-height: 44px;
  left: 12px;
}

.center {
  position: relative;
  top: calc(50% - 44px);
  transform: translateY(-50%);
  text-align: center;
}

.loginphone {
  width: 80%;
  background-color: var(--color-tint);
  color: #fff;
  font-size: 18px;
  margin: 4px 0;
  padding: 8px 0;
  border: 1px solid #fff;
  border-radius: 20px;
}

.loginemail {
  width: 80%;
  background-color: var(--color-tint);
  color: #fff;
  font-size: 18px;
  margin: 4px 0;
  padding: 8px 0;
  border: 1px solid #fff;
  border-radius: 20px;
}
</style>