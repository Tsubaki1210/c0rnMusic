<template>
  <div class="main-icon">
    <nav-bar-item path="/user">
      <van-icon slot="item-icon" name="friends-o" />
      <van-icon slot="item-icon-active" name="friends" />
    </nav-bar-item>
    <nav-bar-item path="/home">
      <van-icon slot="item-icon" name="wap-home-o" />
      <van-icon slot="item-icon-active" name="wap-home" />
    </nav-bar-item>
    <nav-bar-item path="/video">
      <van-icon slot="item-icon" name="video-o" />
      <van-icon slot="item-icon-active" name="video" />
    </nav-bar-item>
  </div>
</template>

<script>
import NavBarItem from "components/common/navbar/NavBarItem.vue";

export default {
  name: "NavBarIcon",
  components: {
    NavBarItem,
  },
  data() {
    return {};
  },
  computed: {},
  methods: {},
};
</script>

<style scoped>
.main-icon {
  display: flex;
}

.main-icon .nav-bar-item {
  flex: 1;
}

.van-icon {
  color: #9e9191;
}
</style>