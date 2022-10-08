<template>
  <div>
    <nav-bar>
      <template #left>
        <van-icon name="arrow-left" @click="profilemainback" />
      </template>
    </nav-bar>
    <scroll class="content" ref="scroll" :probe-type="3">
      <div class="top-bottom">
        <div class="info">
          <div class="infoblock">
            <div class="avatar">
              <img :src="this.userdetails.profile.avatarUrl" alt="" />
            </div>
            <div class="nickname">
              <span>{{ this.userdetails.profile.nickname }}</span>
            </div>
            <div class="follow">
              <span @click="follow"
                >关注 {{ this.userdetails.profile.follows }}</span
              >
              <i>|</i>
              <span>粉丝 {{ this.userdetails.profile.followeds }}</span>
              <i>|</i>
              <span>Lv. {{ this.userdetails.level }}</span>
            </div>
            <div class="yearsAndCity">
              <span>村龄{{ this.$data.years }}年</span>
              <span>{{ this.$data.province }}</span>
            </div>
            <div class="updateInfo">
              <button @click="updateInfo">编辑资料</button>
            </div>
          </div>
        </div>
        <div>
          <profile-tab @getProfileTabName="showProfileTabName"></profile-tab>
          <component :is="currentBody" />
        </div>
      </div>
    </scroll>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import ProfileTab from "components/content/tab/profile/ProfileTab";
import Scroll from "components/common/scroll/Scroll";

import Homepage from "views/profile/childHome/homepage/Homepage";
import Dynamics from "views/profile/childHome/dynamics/Dynamics";
import Blog from "views/profile/childHome/blog/Blog";

import { mapState } from "vuex";
import { areaList } from "@vant/area-data";
import { baseInfoMixin } from "common/js/mixin";

export default {
  name: "ProfileMain",
  components: {
    NavBar,
    ProfileTab,
    Scroll,
    Homepage,
    Dynamics,
    Blog,
  },
  mixins: [baseInfoMixin],
  data() {
    return {
      currentBody: "",

      //省市区数据
      areaList,

      userdetails: this.$store.state.userDetail,

      path: "/profile/homepage",
    };
  },
  activated() {
    this.$router.push(this.path);
  },
  beforeRouteLeave(to, from, next) {
    this.path = this.$route.path;
    next();
  },
  computed: {
    ...mapState(["userDetail"]),
  },
  created() {},
  mounted() {
    console.log(this.$store.state);
  },
  methods: {
    updateInfo() {
      this.$router.push({ name: "profiledata" });
    },
    profilemainback() {
      this.$router.push("/user");
    },
    follow() {
      this.$router.push({ name: "profilefollow" });
    },
    showProfileTabName(name) {
      //左为data内的，右name是HomeTop中data的name
      this.currentBody = name;
      console.log(name);
    },
  },
};
</script>

<style scoped>
.top-bottom {
  padding-bottom: 5px;
}

.info {
  height: 240px;
}

.infoblock {
  width: 90%;
  height: 180px;
  margin: auto;
  background-color: #fdf3f2;
  border-radius: 10px;

  /* position: relative; */
  /* top: calc(50% - 44px); */
  transform: translateY(30%);
  text-align: center;
}

.avatar {
  height: 40px;
}

.avatar img {
  width: 80px;
  height: 80px;
  margin: -40px auto;
  border-radius: 50%;
  display: inline-block;
  vertical-align: top;
  position: relative;
}

.nickname {
  margin: 10px auto;

  font-size: 18px;
  font-weight: bolder;
}

.follow span {
  margin: 0 10px;
}

.follow i {
  opacity: 0.2;
}

.yearsAndCity {
  margin: 10px 0;
}

.yearsAndCity span {
  display: inline-block;

  background-color: var(--color-tint);
  /* width: 65px; */
  height: 25px;
  line-height: 25px;
  margin: 0 8px;
  padding: 0 6px;
  border-radius: 5px;
  text-align: center;
}

.updateInfo {
  margin: 10px;
  text-align: center;
}

.updateInfo button {
  background-color: #fdf3f2;
  color: var(--color-tint);
  font-size: 12px;
  padding: 6px 8px 4px;
  border: 1px solid var(--color-tint);
  border-radius: 20px;

  position: relative;
}

.content {
  overflow: auto;
  position: absolute;
  top: 46px;
  /* padding-bottom: 10px; */
  bottom: 0px;
  left: 0;
  right: 0;
}

.content::-webkit-scrollbar {
  display: none;
}
</style>