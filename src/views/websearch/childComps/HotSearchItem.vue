<template>
  <div class="hot-search-item">
    <van-button size="small" plain round @click="searchButtonValue">
      <!-- @keyup.enter="enterSearch" -->
      {{ hotSearchItem.first }}
      <van-tag type="danger">热</van-tag>
    </van-button>
  </div>
</template>

<script>
export default {
  name: "HotSearchItem",
  props: {
    hotSearchItem: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  methods: {
    // enterSearch() {
    // document.onkeydown = (e) => {
    //   let body = document.getElementsByTagName("body")[0];
    //   //13表示回车键，baseURI是当前页面的地址，为了更严谨，也可以加别的，可以打印e看一下
    //   if (
    //     e.key == "Enter" &&
    //     e.target.baseURI.match(/HotSearchItem/) &&
    //     e.target === body
    //   ) {
    //     //回车后执行搜索方法
    //     this.searchButtonValue();
    //   }
    // };
    // },

    searchButtonValue() {
      setTimeout(() => {
        this.$root.bus.$emit("searchValue", this.hotSearchItem.first);
      }, 20);
    },
  },
};
</script>

<style scoped>
.hot-search-item {
  margin: 4px 2px;

  position: relative;
}

.van-button {
  color: #000;
  border-color: #bdbdbd;
}

.van-button >>> .van-button__text {
  display: flex;
}

.van-tag {
  width: 10px;
  height: 10px;
  font-size: 8px;
  margin-left: 4px;
  padding: 0 1px;
  align-self: center;
}
</style>