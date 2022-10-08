<template>
  <div>
    <van-nav-bar v-model="active" ref="navbar" :border="false">
      <!-- @click-right="search" -->
      <slot slot="left" name="left"></slot>
      <slot slot="title" name="title"></slot>
      <slot slot="right" name="right"></slot>
    </van-nav-bar>
    <!-- <van-button type="default" @click="btnClick">默认按钮</van-button> -->
  </div>
</template>

<script>
export default {
  name: "NavBar",
  data() {
    return {
      active: 0,
    };
  },
  computed: {},
  mounted() {
    // this.showdot = true;
  },
  methods: {
    // search() {
    //   this.$router.replace("/websearch");
    // },
  },
};
</script>

<style scoped>
.van-nav-bar {
  background-color: var(--color-tint);
}
/* .van-nav-bar .van-icon {
  color: #fff;
} */
.main-icon .van-icon {
  padding: 0rem 0.625rem;
}

.van-hairline--bottom:after {
  border-bottom-width: 0;
}
</style>