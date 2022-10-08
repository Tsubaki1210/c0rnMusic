<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "@better-scroll/core";
// import PullUp from "@better-scroll/pull-up";
import ObserveDOM from "@better-scroll/observe-dom";
import ObserveImage from "@better-scroll/observe-image";

// BScroll.use(PullUp);
BScroll.use(ObserveDOM);
BScroll.use(ObserveImage);

export default {
  name: "Scroll",
  props: {
    probeType: {
      type: Number,
      default: 0,
    },
    pullUpLoad: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      scroll: null,
    };
  },
  mounted() {
    //1.创建BScroll对象
    this.scroll = new BScroll(this.$refs.wrapper, {
      observeDOM: true,
      click: true,
      probeType: this.probeType,
    });

    //2.监听滚动的位置
    // if (this.probeType === 2 || this.probeType === 3) {
    //   this.scroll.on("scroll", (position) => {
    //     this.$emit("scroll", position);
    //   });
    // }

    // //3.监听scroll滚动到底部
    // if (this.pullUpLoad) {
    //   this.scroll.on("pullingUp", () => {
    //     this.$emit("pullingUp");
    //   });
    // }
  },
  methods: {
    // scrollTo(x, y, time = 300) {
    //   this.scroll && this.scroll.scrollTo(x, y, time);
    // },
    // refresh() {
    //   this.scroll && this.scroll.refresh();
    // },
    // finishPullUp() {
    //   this.scroll && this.scroll.finishPullUp();
    // },
    // getScrollY() {
    //   return this.scroll ? this.scroll.y : 0;
    // },
  },
};
</script>

<style>
</style> 