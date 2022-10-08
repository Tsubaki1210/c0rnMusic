<template>
  <div class="new-music-item">
    <img v-lazy="showImage" alt="" />
    <div class="song">
      <span>{{ newMusicItem.name }}</span>
    </div>
    <div class="singer">
      <span v-for="(item, index) in newMusicSinger" :key="index"
        >{{ item.name
        }}<template v-if="index < newMusicSinger.length - 1">
          <span>/</span>
        </template>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "NewMusicItem",
  data() {
    return {
      newMusicSinger: {},
    };
  },
  props: {
    newMusicItem: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  created() {
    this.newMusicSinger = this.newMusicItem.song.artists;
    console.log(this.newMusicSinger);
  },
  computed: {
    showImage() {
      return this.newMusicItem.picUrl;
    },
  },
};
</script>

<style scoped>
.new-music-item {
  padding-bottom: 5px;
  position: relative;
  width: 33%; /* 102px */
}

.new-music-item img {
  margin-top: 5px;
  width: 100%;

  border-radius: 0.25rem;
}

img[lazy="loading"] {
  height: 102px;
}

.song {
  font-size: 12px;
  margin: auto;
  margin-left: 2px;
  margin-right: 2px;
  text-align: left;
  /* 文本过长时显示省略号 */
  /* 不溢出当前屏幕,即会自动换行的文字的css */
  /* display: -webkit-box;
  -webkit-line-clamp: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical; */
  /* 溢出屏幕的文字,让自动换行的文字变成单行的css */
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.singer {
  color: #929292;
  font-size: 11px;
  margin: auto;
  margin-left: 2px;
  margin-right: 2px;
  margin-top: 2px;
  text-align: left;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>