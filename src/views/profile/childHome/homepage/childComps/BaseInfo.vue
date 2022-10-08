<template>
  <div>
    <nav-bar class="baseinfo-navbar">
      <template #left>
        <van-icon name="arrow-left" @click="baseinfoback" />
      </template>
      <template #title>
        <span class="title">基本信息</span>
      </template>
    </nav-bar>
    <div>1111111</div>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";

export default {
  name: "BaseInfo",
  components: {
    NavBar,
  },
  methods: {
    baseinfoback() {
      this.$router.go(-1);
    },
  },
};
</script>

<style scoped>
.baseinfo-navbar >>> .van-nav-bar__title {
  /* width: 180px; */
  margin: 0 50px;
  /* text-align: left; */
}

.title {
  color: #fff;
  float: left;
}
</style>