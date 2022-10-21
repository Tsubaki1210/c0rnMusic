<template>
  <form action="/" class="search-top" ref="searchHeight">
    <van-search
      v-model="value"
      show-action
      background="var(--color-tint)"
      :placeholder="showmessage"
      @search="valueName"
      @cancel="back"
      @keyup.enter.native="valueName"
    >
    </van-search>
  </form>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Search",
  data() {
    return {
      value: "",
      showmessage: "",
      realmessage: "",
      historymessage: "",
      data: "",
      searchRes: false, //根据搜索结果页面是否存在来判断"取消"按钮是返回还是恢复搜索页面
      searchheight: "", //此组件的高度
    };
  },
  created() {
    //接收search默认占位文字
    this.$root.bus.$on("showsearchName", (data) => {
      this.showmessage = data;
      console.log(this.showmessage);
    });

    //接收search的真实搜索文字
    this.$root.bus.$on("realsearchName", (data) => {
      this.realmessage = data;
      console.log(this.realmessage);
    });

    //接收WebSearch组件的按钮文字
    this.$root.bus.$on("searchValue", (data) => {
      this.value = data;
      this.valueName();
      console.log(this.value);
    });

    //接收HistorySearch的文字
    this.$root.bus.$on("historySearchValue", (data) => {
      this.historymessage = data;
      this.value = this.historymessage;
      this.valueName();
      console.log(this.value);
    });
  },
  mounted() {},
  activated() {
    this.searchheight = this.$refs.searchHeight.offsetHeight;
    this.$root.bus.$emit("acceptsearchheight", this.searchheight);
  },
  methods: {
    back() {
      if (this.searchRes === false) {
        this.$router.go(-1);
      } else if (this.searchRes === true) {
        let searchresult = true;
        this.searchRes = false;
        this.$root.bus.$emit("searchvalue", searchresult);
        localStorage.removeItem("searchKeyword");
        localStorage.removeItem("searchHeight");
        localStorage.removeItem("searchTabHeight");
        localStorage.removeItem("miniPlayerHeight");
      }
    },
    valueName() {
      //当处于WebSearch组件时且value值为空,直接回车键搜索将默认占位的真实搜索文字传到value
      if (this.value.length == 0) {
        this.value = this.realmessage;
      }
      setTimeout(() => {
        this.$root.bus.$emit("realvalue", this.value);
        let searchresult = false;
        this.searchRes = true;
        this.$root.bus.$emit("searchvalue", searchresult);
        //点击热门搜索按钮后直接触发enter事件
        // setTimeout(() => {
        //   document.getElementById = (e) => {
        //     if ((e.key = "Enter")) {
        //       return true;
        //     } else {
        //       return false;
        //     }
        //   };
        // }, 10);
      }, 20);
    },
  },
  computed: {
    ...mapState(["searchKeyword"]),
    ...mapState(["searchHeight"]),
    ...mapState(["searchTabHeight"]),
    ...mapState(["miniPlayerHeight"]),
  },
  beforeDestroy() {
    //组件销毁时解除事件绑定
    this.$root.bus.$off("showsearchName");
    this.$root.bus.$off("realsearchName");
    this.$root.bus.$off("searchValue");
    this.$root.bus.$off("historySearchValue");
    this.$root.bus.$off("searchheight");
  },
};
</script>

<style scoped>
/* .search-top {
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  z-index: 9;
} */

.van-search >>> .van-search__content {
  background-color: var(--color-tint);
}

.van-search >>> .van-cell--borderless {
  border-bottom: 1px solid #fff;
}

.van-search >>> .van-field__left-icon,
.van-search__action {
  color: #fff;
}

.van-search >>> .van-field__control {
  color: #fff;
}

.van-search >>> .van-search__action:active {
  background-color: var(--color-tint);
  color: #969696;
}
</style>