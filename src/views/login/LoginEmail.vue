<template>
  <div>
    <nav-bar class="login-navbar">
      <template #left>
        <van-icon name="arrow-left" @click="loginback" />
      </template>
      <template #title>
        <span class="title">网易邮箱登陆</span>
      </template>
    </nav-bar>
    <div class="center">
      <van-form @submit="onSubmit">
        <van-field
          v-model="username"
          name="邮箱"
          left-icon="iconfont icon-youxiang"
          icon-prefix="iconfont icon-youxiang"
          placeholder="邮箱"
          :rules="[{ required: true, message: '请输入邮箱' }]"
        />
        <van-field
          v-model="password"
          type="password"
          name="密码"
          left-icon="iconfont icon-mima"
          icon-prefix="iconfont icon-mima"
          placeholder="密码"
          :rules="[{ required: true, message: '请输入密码' }]"
        />
      </van-form>
      <button class="login">登录</button>
    </div>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import NavBarIcon from "components/common/navbar/NavBarIcon";

export default {
  name: "LoginEmail",
  components: {
    NavBar,
    NavBarIcon,
  },
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    loginback() {
      this.$router.go(-1);
    },
    onSubmit(values) {
      console.log("submit", values);
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