<template>
  <div>
    <div class="shezhi">
      <i class="iconfont icon-shezhi" @click="show = true"></i>
    </div>
    <div class="collapse">
      <van-collapse v-model="activeNames">
        <van-collapse-item name="1">
          <template #icon>
            <van-action-sheet
              v-model="show"
              :actions="actions"
              description="创建的歌单"
              close-on-click-action
            />
          </template>
          <template #title>
            <div class="collapse-title">创建的歌单</div>
          </template>
          <van-cell title="我喜欢的音乐" label="0首" class="cell-padding">
            <template #icon>
              <img src="~assets/img/favorite-music.jpg" alt="" />
            </template>
            <template #right-icon>
              <i class="iconfont icon-sangediandian"></i>
            </template>
          </van-cell>
        </van-collapse-item>
      </van-collapse>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserPlaylist",
  data() {
    return {
      activeNames: ["1"],
      show: false,
      actions: [
        { name: "创建新歌单" },
        { name: "歌单管理" },
        { name: "截图导入歌单" },
        { name: "恢复歌单" },
      ],
    };
  },
};
</script>

<style scoped>
.collapse {
  position: relative;
}

.collapse-title {
  padding-left: 29px;
}

.shezhi {
  width: 20px;
  height: 20px;
  display: block;
}

/* .icon-shezhi {
  color: gray;
  margin-right: 10px;
  float: left;
  position: absolute;
  top: 14px;
  left: 16px;
  z-index: 9;
} */

.icon-sangediandian {
  margin: auto;
}

.van-collapse-item >>> .van-collapse-item__content {
  padding: 0;
}

.cell-padding {
  padding: 0;
}

.cell-padding >>> .van-cell__title {
  margin: auto;
  padding-left: 5px;
}

.van-cell img {
  width: 60px;
  height: 60px;
  border-radius: 5%;
  margin: 4px;
}

.van-icon {
  height: 24px;
  line-height: 24px;
}

.arrowTransform {
  transition: 0.2s;
  transform-origin: center;
  transform: rotateZ(0deg);
}

.arrowTransformReturn {
  transition: 0.2s;
  transform-origin: center;
  transform: rotateZ(-90deg);
}
</style>