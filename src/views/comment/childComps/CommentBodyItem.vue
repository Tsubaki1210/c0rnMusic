<template>
  <div class="comment">
    <div class="userInfo">
      <div class="userInfo-avatar">
        <img :src="commentBodyItem.user.avatarUrl" alt="" />
      </div>
      <div class="userInfo-info">
        <div class="userInfo-info-base">
          <div class="userInfo-info-base-info">
            <div class="userInfo-info-base-info-nickname">
              {{ commentBodyItem.user.nickname }}
            </div>
            <div class="userInfo-info-base-info-showtime">
              {{ commentBodyItem.time | showDate }}
            </div>
          </div>
          <div>
            <div v-show="good" class="userInfo-info-base-like" @click="isGood">
              <span>{{ commentBodyItem.likedCount }}</span>
              <van-icon name="good-job-o" />
            </div>
            <div v-show="!good" class="userInfo-info-base-like" @click="isGood">
              <span>{{ commentBodyItem.likedCount }}</span>
              <van-icon name="good-job" :style="{ color: '#FF0000' }" />
            </div>
          </div>
        </div>
        <div class="userInfo-info-commentcontent">
          {{ commentBodyItem.content }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { formatDate } from "common/js/utils";

import { mapState } from "vuex";

export default {
  name: "CommentBodyItem",
  data() {
    return {
      usertoken: null,

      good: true, //点赞icon实心和空心切换
    };
  },
  props: {
    commentBodyItem: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  created() {
    //用户登录信息token
    this.usertoken = this.$store.state.userToken;
  },
  methods: {
    isGood() {
      //判断用户是否登录
      if (this.usertoken === null || undefined) {
        this.$router.push("/login");
      } else {
        if (this.good === true) {
          this.good = false;
        } else if (this.good === false) {
          this.good = true;
        }
      }
    },
  },
  computed: {
    //  ...mapState(["loginStatus"]),
    ...mapState(["userToken"]),
  },
  filters: {
    showDate(value) {
      let bir = Number(value);
      if (!isNaN(bir)) {
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const showDate = new Date(value);
        const showYear = showDate.getFullYear();
        if (currentYear > showYear) {
          return formatDate(showDate, "yyyy-MM-dd");
        } else {
          return formatDate(showDate, "MM-dd");
        }
      } else {
        return value;
      }
    },
  },
};
</script>

<style scoped>
.comment {
  margin-top: 5px;
}

.userInfo {
  display: flex;
}

.userInfo-avatar {
  width: 15%;
  display: flex;
  justify-content: center;
}

.userInfo-avatar img {
  width: 35px;
  height: 35px;
  border-radius: 50%;
}

.userInfo-info {
  flex: 1;
  border-bottom: 1px solid #aaaaaa;
  padding-bottom: 5px;
}

.userInfo-info-base {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.userInfo-info-base-info-nickname {
  margin: 3px 0;
  font-size: 14px;
}

.userInfo-info-base-info-showtime {
  color: #5e5e5e;
  font-size: 12px;
}

.userInfo-info-base-like {
  color: #5e5e5e;
  font-size: 14px;
  margin-right: 10px;
}

.userInfo-info-commentcontent {
  white-space: pre-line;
  margin-top: 5px;
  margin-right: 25px;
  font-size: 15px;
}
</style>