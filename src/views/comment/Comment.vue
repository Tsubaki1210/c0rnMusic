<template>
  <div>
    <van-popup
      v-model="showComment"
      position="bottom"
      :overlay="false"
      :style="{ height: '100%' }"
      z-index="10"
    >
      <comment-top></comment-top>
      <comment-body></comment-body>
    </van-popup>
  </div>
</template>

<script>
import CommentTop from "components/common/top/comment/CommentTop";
import CommentBody from "views/comment/childComps/CommentBody";

export default {
  name: "Comment",
  components: {
    CommentTop,
    CommentBody,
  },
  data() {
    return {
      showComment: false, //是否显示评论
      openCommentNumber: 0, //打开评论信号
      closeCommentNumber: 0, //关闭评论信号
    };
  },
  created() {
    //接收Player打开评论的信号
    this.$root.bus.$on("emitOpenCommentNum1", (data) => {
      this.openCommentNumber = data;
      if (this.openCommentNumber === 1) {
        this.showComment = true;
      }
    });
    //接收CommentTop关闭评论的信号
    this.$root.bus.$on("emitCloseCommentNum1", (data) => {
      this.closeCommentNumber = data;
      if (this.closeCommentNumber === 1) {
        this.showComment = false;
      }
    });
    console.log(this.showComment);
    console.log(this.openCommentNumber);
  },
  mounted() {},
  beforeDestroy() {
    //组件销毁时解除事件绑定
    this.$root.bus.$off("emitOpenCommentNum1");
    this.$root.bus.$off("emitCloseCommentNum1");
  },
};
</script>

<style scoped>
.color {
  color: #fff;
}
</style>