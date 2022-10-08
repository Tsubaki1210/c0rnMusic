<template>
  <div ref="CommentTopHeight">
    <nav-bar class="comment-navbar">
      <template #left>
        <van-icon name="arrow-left" @click="commentBack" />
      </template>
      <template #title>
        <span class="title">评论({{ commentCount }})</span>
      </template>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import NavBarIcon from "components/common/navbar/NavBarIcon";

import { debounce } from "common/js/utils";

export default {
  name: "CommentTop",
  components: {
    NavBar,
    NavBarIcon,
  },
  data() {
    return {
      emitCloseCommentNumber: 1, //发送关闭评论信号
      commentCount: 0, //歌曲评论数
      topheight: "",
    };
  },
  created() {
    //接收当前歌曲评论数
    this.$root.bus.$on("emitcommentCount", (data) => {
      this.commentCount = data;
    });
  },
  mounted() {
    // this.$nextTick(() => {
    this.topheight = this.$refs.CommentTopHeight.offsetHeight;
    console.log(this.topheight);
    this.$root.bus.$emit("emitTopHeight", this.topheight);
    // });
  },
  methods: {
    commentBack() {
      this.$router.go(-1);
      this.emitCloseCommentNum();
    },
    //发送关闭评论信号
    emitCloseCommentNum: debounce(function () {
      setTimeout(() => {
        this.$root.bus.$emit(
          "emitCloseCommentNum1",
          this.emitCloseCommentNumber
        );
      }, 20);
    }),
    beforeDestroy() {
      //组件销毁时解除事件绑定
      this.$root.bus.$off("emitcommentCount");
    },
  },
};
</script>

<style scoped>
.comment-navbar >>> .van-nav-bar__title {
  margin: 0 50px;
}
.title {
  color: #fff;
  float: left;
}
</style>