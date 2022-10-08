<template>
  <div>
    <div class="base-info-block">
      <div class="base-info-title">基本信息</div>
      <div class="base-info">
        <p>
          村龄：{{ this.$data.years }}年 ({{
            this.userdetails.createTime | showDate
          }})
        </p>
        <p>性别：{{ this.$data.gender }}</p>
        <p>地区：{{ this.$data.province }}</p>
      </div>
      <van-divider />
      <div>
        <p @click="tobaseinfo">查看全部 ></p>
      </div>
    </div>
    <div class="musical-tastes-block">
      <div class="musical-tastes-title">音乐品味</div>
      <div class="musical-tastes-listen">
        <div class="musical-tastes-listen-left-img">
          <img src="~assets/img/listenSongs.jpg" alt="" />
        </div>
        <div class="musical-tastes-listen-text">
          <p class="listen-title">听歌排行</p>
          <p class="listen-text">
            累计听歌{{ this.userdetails.listenSongs }}首
          </p>
        </div>
      </div>
      <div class="musical-tastes-like" v-if="this.playlist[0]">
        <div class="musical-tastes-like-left-img">
          <img :src="this.playlist[0].coverImgUrl" alt="" />
        </div>
        <div class="musical-tastes-like-text">
          <p class="like-title">我喜欢的音乐</p>
          <p class="like-text">
            {{ this.playlist[0].trackCount }}首，播放{{
              this.playlist[0].playCount
            }}次
          </p>
        </div>
      </div>
    </div>
    <div class="created-song-list-block">
      <div class="created-song-list-title">
        创建的歌单
        <span>({{ this.playlistCount.createdPlaylistCount - 1 }}个)</span>
      </div>
      <div
        class="created-song-list"
        v-for="(item, index) in userCreatedPlaylist"
        :key="index"
      >
        <div class="created-song-list-left-img">
          <img :src="item.coverImgUrl" alt="" />
        </div>
        <div class="created-song-list-text">
          <p class="created-list-title">{{ item.name }}</p>
          <p class="created-list-text">
            {{ item.trackCount }}首，播放{{
              item.playCount >= 100000000
                ? (item.playCount / 100000000).toFixed(1) + "亿"
                : item.playCount >= 10000 && item.playCount < 100000000
                ? (item.playCount / 10000).toFixed(1) + "万"
                : item.playCount
            }}次
          </p>
          <!-- v-if判断亿、万的播放量 -->
          <!-- <div>
          <p class="created-list-text" v-if="item.playCount >= 100000000">
            {{ item.trackCount }}首，播放{{
              (item.playCount / 100000000) | countfilter
            }}亿次
          </p>
          <p
            class="created-list-text"
            v-else-if="item.playCount >= 10000 && item.playCount < 100000000"
          >
            {{ item.trackCount }}首，播放{{
              (item.playCount / 10000) | countfilter
            }}万次
          </p>
          <p class="created-list-text" v-else-if="item.playCount < 10000">
            {{ item.trackCount }}首，播放{{ item.playCount }}次
          </p>
          </div> -->
        </div>
      </div>
    </div>
    <div class="collection-song-list-block">
      <div class="collection-song-list-title">
        收藏的歌单
        <span>({{ this.playlistCount.subPlaylistCount }}个)</span>
      </div>
      <div
        class="collection-song-list"
        v-for="(item, index) in userCollectionPlaylist"
        :key="index"
      >
        <div class="collection-song-list-left-img">
          <img :src="item.coverImgUrl" alt="" />
        </div>
        <div class="collection-song-list-text">
          <p class="collection-list-title">{{ item.name }}</p>
          <p class="collection-list-text">
            {{ item.trackCount }}首，By {{ item.creator.nickname }}，播放{{
              item.playCount >= 100000000
                ? (item.playCount / 100000000).toFixed(1) + "亿"
                : item.playCount >= 10000 && item.playCount < 100000000
                ? (item.playCount / 10000).toFixed(1) + "万"
                : item.playCount
            }}次
          </p>
          <!-- v-if判断亿、万的播放量 -->
          <!-- <div>
            <p class="created-list-text" v-if="item.playCount >= 100000000">
              {{ item.trackCount }}首，播放{{
                (item.playCount / 100000000) | countfilter
              }}亿次
            </p>
            <p
              class="collection-list-text"
              v-else-if="item.playCount >= 10000 && item.playCount < 100000000"
            >
              {{ item.trackCount }}首，By {{ item.creator.nickname }}，播放{{
                (item.playCount / 10000) | countfilter
              }}万次
            </p>
            <p class="collection-list-text" v-else-if="item.playCount < 10000">
              {{ item.trackCount }}首，By {{ item.creator.nickname }}，播放{{
                item.playCount
              }}次
            </p>
          </div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

import { mapState } from "vuex";
import { formatDate } from "common/js/utils";
import { baseInfoMixin } from "common/js/mixin";

import { areaList } from "@vant/area-data";

export default {
  name: "Homepage",
  mixins: [baseInfoMixin],
  data() {
    return {
      //用户详情信息
      userdetails: this.$store.state.userDetail,

      //用户的歌单(包括用户喜欢的音乐)
      playlist: {},
      //用户的创建歌单数量
      playlistCount: "",
      //用户创建的歌单
      userCreatedPlaylist: [],
      //用户收藏的歌单
      userCollectionPlaylist: [],
      //省市区数据
      areaList,
    };
  },
  filters: {
    showDate(value) {
      const date = new Date(value);
      return formatDate(date, "yyyy年MM月注册");
    },
    countfilter(value) {
      let count = Number(value).toFixed(1);
      return Number(count);
    },
  },
  created() {
    //获取用户的歌单
    const Id = this.userdetails.profile.userId;

    axios({
      method: "get",
      url: "https://c0rn.top/user/playlist?uid=" + Id,
      withCredentials: true,
    }).then((res) => {
      this.playlist = res.data.playlist;
      console.log(this.playlist);

      //判断用户的歌单是否为自行创建(不包括喜欢的音乐歌单)
      setTimeout(() => {
        const likePlaylist = this.playlist[0].name;

        for (let i = 0; i < this.playlist.length; i++) {
          if (
            this.playlist[i].userId === Id &&
            this.playlist[i].name !== likePlaylist
          ) {
            this.userCreatedPlaylist.push(this.playlist[i]);
          } else if (this.playlist[i].userId !== Id) {
            this.userCollectionPlaylist.push(this.playlist[i]);
          }
        }
        console.log(this.playlist.length);
        console.log(this.userCreatedPlaylist);
        console.log(this.userCollectionPlaylist);
      }, 500);
    });

    //获取用户歌单的数量
    axios({
      method: "get",
      url: "https://c0rn.top/user/subcount",
      withCredentials: true,
    }).then((res) => {
      this.playlistCount = res.data;
      console.log(this.playlistCount);
    });
  },
  computed: {
    ...mapState(["userDetail"]),
  },
  methods: {
    tobaseinfo() {
      this.$router.push({ name: "baseinfo" });
    },
  },
};
</script>

<style scoped>
.base-info-block {
  width: 90%;
  height: 200px;
  background-color: #fdf3f2;
  border-radius: 10px;

  text-align: center;
  margin: 10px auto;
}

.musical-tastes-block {
  width: 90%;
  height: 210px;
  background-color: #fdf3f2;
  border-radius: 10px;

  text-align: center;
  margin: 10px auto;
}

.created-song-list-block {
  width: 90%;
  /* height: 410px; */
  background-color: #fdf3f2;
  border-radius: 10px;

  text-align: center;
  margin: 10px auto;
  padding: 0 0 5px 0;
}

.collection-song-list-block {
  width: 90%;
  /* height: 410px; */
  background-color: #fdf3f2;
  border-radius: 10px;

  text-align: center;
  margin: 10px auto 5px;
  padding: 0 0 5px 0;
}

.base-info-title {
  /* float: left; */
  font-size: 20px;
  font-weight: bolder;
  /* margin: 20px 15px 8px; */
  padding: 20px 15px 8px;
  text-align: left;
}

.musical-tastes-title {
  font-size: 20px;
  font-weight: bolder;
  /* margin: 20px 15px 8px; */
  padding: 20px 15px 8px;
  text-align: left;
}

.created-song-list-title {
  font-size: 20px;
  font-weight: bolder;
  /* margin: 20px 15px 8px; */
  padding: 20px 15px 8px;
  text-align: left;
}

.created-song-list-title span {
  font-size: 14px;
  color: #7c7c7c;
  font-weight: normal;
}

.collection-song-list-title {
  font-size: 20px;
  font-weight: bolder;
  /* margin: 20px 15px 8px; */
  padding: 20px 15px 8px;
  text-align: left;
}

.collection-song-list-title span {
  font-size: 14px;
  color: #7c7c7c;
  font-weight: normal;
}

.base-info {
  /* float: left; */
  margin: 0 15px;
  text-align: left;
}

.base-info p {
  padding: 8px 0;
}

.van-divider {
  margin: 8px 0;
}

.musical-tastes-listen {
  height: 70px;
  margin: 5px 0 5px 15px;
  display: flex;
}

.musical-tastes-listen-left-img {
  float: left;
  height: 70px;
}

.musical-tastes-listen-left-img img {
  width: 70px;
  height: 70px;
  border-radius: 10px;
}

.musical-tastes-listen-text {
  float: left;
  text-align: left;
  margin: auto 10px;
  flex: 1;
}
.listen-title {
  margin: 6px 0;
  font-size: 16px;
}
.listen-text {
  margin: 6px 0;
  font-size: 14px;
  color: #7c7c7c;
}

.musical-tastes-like {
  height: 70px;
  margin: 5px 0 5px 15px;
  display: flex;
}

.musical-tastes-like-left-img {
  float: left;
  height: 70px;
}

.musical-tastes-like-left-img img {
  width: 70px;
  height: 70px;
  border-radius: 10px;
}

.musical-tastes-like-text {
  float: left;
  text-align: left;
  margin: auto 10px;
  flex: 1;
}
.like-title {
  margin: 6px 0;
  font-size: 16px;
}
.like-text {
  margin: 6px 0;
  font-size: 14px;
  color: #7c7c7c;
}

.created-song-list {
  height: 70px;
  margin: 5px 0 5px 15px;
  display: flex;
}

.created-song-list-left-img {
  float: left;
  height: 70px;
}

.created-song-list-left-img img {
  width: 70px;
  height: 70px;
  border-radius: 10px;
}

.created-song-list-text {
  float: left;
  text-align: left;
  margin: auto 10px;
  flex: 1;
}
.created-list-title {
  margin: 6px 0;
  font-size: 16px;
}
.created-list-text {
  margin: 6px 0;
  font-size: 14px;
  color: #7c7c7c;
}

.collection-song-list {
  height: 70px;
  margin: 5px 0 5px 15px;
  display: flex;
}

.collection-song-list-left-img {
  float: left;
  height: 70px;
}

.collection-song-list-left-img img {
  width: 70px;
  height: 70px;
  border-radius: 10px;
}

.collection-song-list-text {
  float: left;
  text-align: left;
  margin: auto 10px;
  flex: 1;
}

.collection-list-title {
  margin: 6px 0;
  font-size: 16px;
}

.collection-list-text {
  margin: 6px 0;
  font-size: 14px;
  color: #7c7c7c;
}
</style>