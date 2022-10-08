<template>
  <div class="nav-bar-item" @click="itemClick">
    <div v-if="!isActive"><slot name="item-icon"></slot></div>
    <div class="active" v-else><slot name="item-icon-active"></slot></div>
  </div>
</template>

<script>
export default {
  name: "NavBarItem",
  props: {
    path: String,
  },
  computed: {
    isActive() {
      return this.$route.path.includes(this.path);
    },
  },
  methods: {
    itemClick() {
      this.$router.replace(this.path);
    },
  },
};
</script>

<style scoped>
.nav-bar-item {
  padding: 0rem 0.625rem;
}

.active .van-icon {
  color: #fff;
}
</style>