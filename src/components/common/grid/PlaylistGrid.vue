<template>
  <van-grid :border="false">
    <van-grid-item>
      <i class="iconfont icon-pinglunshu"></i>
      <span>{{ this.playlistdataComment }}</span>
    </van-grid-item>
    <van-grid-item>
      <i class="iconfont icon-fenxiang_2"></i>
      <span>{{ this.playlistdataShare }}</span>
    </van-grid-item>
    <van-grid-item icon="music-o" text="下载">
      <i class="iconfont icon-xiazai1"></i>
      <span>下载</span>
    </van-grid-item>
    <van-grid-item icon="bar-chart-o" text="多选">
      <i class="iconfont icon-duoxuan"></i>
      <span>多选</span>
    </van-grid-item>
  </van-grid>
</template>

<script>
import { getPlayList } from "network/playlist";

export default {
  name: "PlaylistGrid",
  data() {
    return {
      playlistid: null,
      //歌单评论数
      playlistdataComment: "",
      //歌单分享数
      playlistdataShare: "",
    };
  },
  created() {
    this.playlistid = this.$route.params.playlistid;

    getPlayList(this.playlistid).then((res) => {
      console.log(res);
      const playlistData = res.playlist;
      this.playlistdataComment = playlistData.commentCount.toString();
      this.playlistdataShare = playlistData.shareCount.toString();
    });
  },
};
</script>

<style scoped>
.van-grid >>> .van-grid-item__content--center {
  /* 设置背景颜色为透明 */
  background-color: unset;
}

.van-grid-item i {
  font-size: 20px;
  color: #646566;
}

.van-grid-item span {
  color: #646566;
  font-size: 12px;
  line-height: 1.5;
  margin-top: 5px;
}
</style>