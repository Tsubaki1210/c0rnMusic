<template>
  <div id="app">
    <keep-alive>
      <!-- <router-view v-if="RouterState"></router-view> -->
      <router-view></router-view>
    </keep-alive>
    <!-- <player v-show="!(path === '/login')" v-if="RouterState"></player> -->
    <!-- <keep-alive> -->
    <player v-show="isShowPlayer" v-if="RouterState"></player>
    <!-- </keep-alive> -->
  </div>
</template>

<script>
import Player from "components/content/player/Player.vue";
// import Player from "components/content/player/Player3.vue";

export default {
  name: "App",
  created() {
    console.log("若原生写出播放器，则卸载@moefe/vue-aplayer");
  },
  components: {
    Player,
  },
  provide() {
    return {
      reload: this.reload,
    };
  },
  data() {
    return {
      RouterState: true,
      isShowPlayer: true,
      path: "",
    };
  },
  mounted() {
    this.path = this.$route.path;
  },
  watch: {
    $route(to, from) {
      this.path = to.path;
      //v-show多条件判断，只能移出来
      if (this.path === "/login") {
        this.isShowPlayer = false;
      } else if (this.path === "/login/phone") {
        this.isShowPlayer = false;
      } else if (this.path === "/login/email") {
        this.isShowPlayer = false;
      } else {
        this.isShowPlayer = true;
      }
    },
  },
  methods: {
    reload() {
      this.RouterState = false;
      this.$nextTick(() => {
        this.RouterState = true;
      });
    },
  },
};
</script>

<style scoped>
@import "./assets/css/base.css";
</style>
