<template>
  <div>
    <!-- :index="index" 将v-for的数组值传给子组件 -->
    <play-list-music-item
      v-for="(item, index) in playlistSongsDetail"
      :key="index"
      :index="index"
      :play-list-music-item="item"
      @emitPlayListNum="savePlayList"
    ></play-list-music-item>
  </div>
</template>

<script>
import PlayListMusicItem from "views/playlist/childComps/PlayListMusicItem";

import { getPlayList } from "network/playlist";
import { getSongsDetail } from "network/song";

export default {
  name: "PlayListMusic",
  components: {
    PlayListMusicItem,
  },
  data() {
    return {
      playlistid: null,
      //歌单歌曲的ID
      playlistPrivilege: {},
      //歌曲详情
      playlistSongsDetail: {},
      //歌曲多id
      playlistSongsIds: "",
    };
  },
  created() {
    //存入传入的id(写到activated最好)
    this.playlistid = this.$route.params.playlistid;

    //请求歌曲ID值  获取歌单详情
    getPlayList(this.playlistid).then((res) => {
      this.playlistPrivilege = res.privileges;
      console.log(this.playlistPrivilege);
      //将歌单的多歌曲id变成字符串，目的一次性获取多个歌曲详情
      this.playlistSongsIds = this.playlistPrivilege
        .map((item) => item.id)
        .toString();
      console.log(this.playlistSongsIds);

      //请求歌曲详情
      this.getSongsDetail(this.playlistSongsIds);
    });
  },
  methods: {
    //获取歌曲详情
    getSongsDetail() {
      getSongsDetail(this.playlistSongsIds).then((res) => {
        this.playlistSongsDetail = res.songs;
        console.log(this.playlistSongsDetail);
      });
    },
    //接收到信号将当前歌单所有歌曲存入vuex
    savePlayList(data) {
      if (data === 1) {
        this.$store.dispatch("getMusicPlayer", this.playlistSongsDetail);
      }
    },
  },
};
</script>

<style scoped>
</style>