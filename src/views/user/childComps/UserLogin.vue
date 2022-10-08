<template>
  <div>
    <!-- class="block" -->
    <div v-if="this.loginstatus.code == null">
      <div class="user-info">
        <div class="login-info-left" @click="login">
          <span class="iconfont icon-touxiang"></span>
          <span class="user-nickname">未登录</span>
        </div>
        <div class="login-info-right">
          <!-- <van-button round plain color="red" type="info" size="small"
          >开通会员</van-button
        > -->
          <button class="vip">开通会员</button>
        </div>
      </div>
    </div>
    <div v-else-if="this.loginstatus.code == 200">
      <div class="user-info">
        <div class="login-info-left" @click="userdetail">
          <img :src="this.userdetails.profile.avatarUrl" alt="" />
          <span class="user-nickname">{{
            this.userdetails.profile.nickname
          }}</span>
        </div>
        <div
          class="login-info-right"
          v-if="this.userdetails.profile.vipType == 0"
        >
          <button class="vip">开通会员</button>
        </div>
        <div
          class="login-info-right"
          v-else-if="this.userdetails.profile.vipType == 1"
        >
          <button class="vip">续费会员</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "UserLogin",
  data() {
    return {
      loginstatus: this.$store.state.loginStatus,

      //用户详情信息
      userdetails: this.$store.state.userDetail,
    };
  },
  mounted() {
    // this.$refs.music.toggle(this.music);
    // console.log(this.music);
    console.log(this.$store.state);
  },
  computed: {
    ...mapState(["loginStatus"]),
    ...mapState(["userDetail"]),
  },
  methods: {
    login() {
      this.$router.push("/login");
    },
    userdetail() {
      const userId = this.userdetails.profile.userId;

      // this.$router.push({ name: "Profile", query: { id: userId } });
      // this.$router.push({ path: "profile", query: { id: userId } });
      this.$router.push("/profile");
    },
  },
};
</script>

<style scoped>
/* .block {
  height: 40px;
  background: var(--color-tint);
} */

.user-info {
  height: 65px;
  background-color: #fdf3f2;
  margin: 0 0.25rem;
  border-radius: 6px;
}

.login-info-left {
  float: left;
  width: 150px;
  height: 100%;

  display: flex;
  align-items: center;
  margin-left: 15px;
}

.user-nickname {
  /* font-weight: bold; */
  padding-left: 10px;
}

.login-info-right {
  float: right;
  height: 100%;

  display: flex;
  align-items: center;
  margin-right: 15px;
}

/* .van-button {
  background-color: #fdf3f2;
} */

.vip {
  background-color: #fdf3f2;
  color: var(--color-tint);
  font-size: 12px;
  padding: 6px 8px 4px;
  border: 1px solid var(--color-tint);
  border-radius: 20px;
}

.icon-touxiang {
  font-size: 45px;
  color: #b4b3b3;
}

.login-info-left img {
  /* font-size: 45px; */
  height: 45px;
  width: 45px;
  border-radius: 50%;
  /* color: #d6d8da; */
}
</style>