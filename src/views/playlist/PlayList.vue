<template>
  <div id="playlist">
    <!-- <component :is="playlistTop" /> -->
    <play-list-info @coverheight="setcoverheight($event)"></play-list-info>
    <scroll class="content" ref="scroll" :probe-type="3" :style="styleHeight">
      <play-list-music></play-list-music>
    </scroll>
  </div>
</template>

<script>
import Scroll from "components/common/scroll/Scroll";

import PlayListInfo from "views/playlist/childComps/PlayListInfo";
import PlayListMusic from "views/playlist/childComps/PlayListMusic";

export default {
  name: "PlayList",
  data() {
    return {
      coverheight: "",
    };
  },
  components: {
    Scroll,
    PlayListInfo,
    PlayListMusic,
  },
  created() {
    //接收PlayListInfo组件的总高度
    this.$root.bus.$on("acceptcoverheight", (data) => {
      this.coverheight = data;
      console.log(this.coverheight);
    });
  },
  deactivated() {
    this.$destroy("PlayList");
  },
  computed: {
    //动态获取封面高度,目的是设置playlistmusic组件与顶部的距离
    //自己理解：在所需设置css的标签(第5行)上添加style,通过computed定义，最后在css上用var()获取数据即可
    //作者说的：通过css定义变量的方式，将变量在行内注入，然后在style中使用var()获取我们在行内设置的数据即可
    styleHeight() {
      return {
        "--cover-height": this.coverheight + "px",
      };
    },
  },
  // activated() {
  //     let height = this.$refs.CoverHeight.offsetHeight;
  //     console.log(height);
  // },
};
</script>

<style scoped>
#playlist {
  position: relative;
  height: 100vh;
}

.content {
  overflow: auto;
  position: absolute;
  top: var(--cover-height);
  bottom: 60px;
  left: 0;
  right: 0;
}

.content::-webkit-scrollbar {
  display: none;
}
</style>