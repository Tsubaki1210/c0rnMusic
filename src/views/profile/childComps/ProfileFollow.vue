<template>
  <div>
    <nav-bar>
      <template #left>
        <van-icon name="arrow-left" @click="profilefollowback" />
      </template>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import NavBarIcon from "components/common/navbar/NavBarIcon";

export default {
  name: "ProfileFollow",
  components: {
    NavBar,
    NavBarIcon,
  },
  methods: {
    profilefollowback() {
      this.$router.go(-1);
    },
  },
};
</script>

<style scoped>
</style>