<template>
  <div>
    <div class="commentTitle" ref="CommentTitleHeight">
      <span>评论区</span>
      <comment-tab></comment-tab>
    </div>
    <scroll class="content" ref="scroll" :probe-type="3" :style="Height">
      <comment-body-item
        v-for="(item, index) in commentUser"
        :key="index"
        :index="index"
        :comment-body-item="item"
      ></comment-body-item>
    </scroll>
  </div>
</template>

<script>
import Scroll from "components/common/scroll/Scroll";

import CommentTab from "components/content/tab/comment/CommentTab";

import CommentBodyItem from "views/comment/childComps/CommentBodyItem";

import { getSongsComment } from "network/song.js";

export default {
  name: "CommentBody",
  components: {
    Scroll,
    CommentBodyItem,
    CommentTab,
  },
  data() {
    return {
      commentUser: {}, //评论存放
      commenttabName: "recommendCooment",
      musicid: 0, //歌曲ID
      commentType: 0, //资源类型,对应歌曲(0),mv(1),歌单(2),专辑(3),电台(4),视频(5),动态(6)
      commentSortType: 1, //排序方式, 1:按推荐排序, 2:按热度排序, 3:按时间排序

      topheight: "",
      titleheight: "",
    };
  },
  mounted() {
    // this.$nextTick(() => {
    this.titleheight = this.$refs.CommentTitleHeight.offsetHeight;
    console.log(this.titleheight);
    // });
  },
  created() {
    //接收Player当前歌曲ID
    this.$root.bus.$on("emitmusicId", (data) => {
      this.musicid = data;
      console.log(this.musicid);
      //初始化歌曲评论
      this.getSongsComment();
    });
    //接收tab的名字
    this.$root.bus.$on("emitCommentTabName", (data) => {
      this.commenttabName = data;
      this.commentUser = {};
      console.log(this.commenttabName);
      this.getSongsComment();
    });
    this.$root.bus.$on("emitTopHeight", (data) => {
      this.topheight = data;
      console.log(this.topheight);
    });
  },
  methods: {
    getSongsComment() {
      if (this.commenttabName === "recommendCooment") {
        this.commentSortType = 1;
        getSongsComment(
          this.musicid,
          this.commentType,
          this.commentSortType
        ).then((res) => {
          console.log(res);
          if (res.code === 200) {
            this.commentUser = res.data.comments;
            console.log(this.commentUser);
          }
        });
      } else if (this.commenttabName === "hotComment") {
        this.commentSortType = 2;
        getSongsComment(
          this.musicid,
          this.commentType,
          this.commentSortType
        ).then((res) => {
          console.log(res);
          if (res.code === 200) {
            this.commentUser = res.data.comments;
            console.log(this.commentUser);
          }
        });
      } else if (this.commenttabName === "newComment") {
        this.commentSortType = 3;
        getSongsComment(
          this.musicid,
          this.commentType,
          this.commentSortType
        ).then((res) => {
          console.log(res);
          if (res.code === 200) {
            this.commentUser = res.data.comments;
            console.log(this.commentUser);
          }
        });
      }
    },
  },
  computed: {
    Height() {
      const height = this.topheight + this.titleheight;
      console.log(height);
      const commentTopandTitleHeight = height + "px";
      return {
        "--top-height": commentTopandTitleHeight,
      };
    },
  },
  beforeDestroy() {
    //组件销毁时解除事件绑定
    this.$root.bus.$off("emitmusicId");
    this.$root.bus.$off("emitCommentTabName");
  },
};
</script>

<style scoped>
.commentTitle {
  height: 100%;
  display: flex;
  align-items: center;
}

.commentTitle span {
  font-size: 14px;
  margin-left: 10px;
}

.van-tabs {
  width: 30%;
  margin-right: 10px;
  margin-left: auto;
}

.content {
  overflow: auto;
  position: absolute;
  top: var(--top-height);
  /* padding-bottom: 10px; */
  bottom: 0px;
  left: 0;
  right: 0;
}

.content::-webkit-scrollbar {
  display: none;
}
</style>