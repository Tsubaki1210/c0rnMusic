<template>
  <div>
    <!-- class="block" -->
    <van-swipe class="my-top-swipe" :autoplay="5000" indicator-color="#dc4037">
      <van-swipe-item v-for="(item, index) in topSwipes" :key="index">
        <img :src="item.pic" alt="" />
        <van-tag
          :type="
            item.typeTitle === '独家'
              ? 'danger'
              : item.typeTitle === '新歌首发'
              ? 'danger'
              : item.typeTitle === '活动'
              ? 'danger'
              : 'primary'
          "
          effect="dark"
          class="tag"
        >
          {{ item.typeTitle }}
        </van-tag>
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
import { getHomeTopSwipe } from "network/home.js";

export default {
  name: "HomeTopSwipe",
  data() {
    return {
      topSwipes: [],
    };
  },
  created() {
    this.getHomeTopSwipe();
  },
  methods: {
    //获取轮播图的数据
    getHomeTopSwipe() {
      getHomeTopSwipe().then((res) => {
        this.topSwipes = res.banners;
      });
    },
  },
};
</script>

<style scoped>
/* .block {
  height: 100px;
  background: var(--color-tint);
} */

/* .my-top-swipe {
  height: 7.5rem;
  height: 100%;
} */

.my-top-swipe .van-swipe-item {
  padding: 0 0.3125rem;
}

.my-top-swipe .van-swipe-item img {
  width: 100%;
  border-radius: 0.25rem;
}

.tag {
  position: absolute;
  /* top: 65%; */
  bottom: 3.73px;
  right: 0.3125rem;
  border-radius: 0.25rem 0 0.25rem 0;
  height: 1.1875rem;
  line-height: 1.1875rem;
}
</style>