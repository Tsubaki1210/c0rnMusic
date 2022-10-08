<template>
  <div>
    <div class="history-search-title">
      <span>历史记录</span>
      <i class="iconfont icon-delete" @click="clear"></i>
    </div>
    <div class="history-search-text">
      <van-button
        size="small"
        plain
        round
        v-for="(item, index) in oldsearchhistory"
        :key="index"
        @click="inputsearch(item)"
      >
        {{ item }}
      </van-button>
    </div>
  </div>
</template>

<script>
// import Vue from "vue";
import { mapState } from "vuex";

import { Dialog } from "vant";

export default {
  name: "HistorySearch",
  components: {
    [Dialog.Component.name]: Dialog.Component,
  },
  data() {
    return {
      //vuex获取的数据存入当前数组,用于判断重复数据及其他
      oldsearchhistory: [],
      historymessage: "",

      SearchHistory: this.$store.state.searchHistory,
    };
  },
  created() {
    this.oldsearchhistory = this.SearchHistory;

    this.$root.bus.$on("realvalue", (data) => {
      let appendHistory = true;

      if (
        this.oldsearchhistory !== null &&
        this.oldsearchhistory !== undefined &&
        this.oldsearchhistory.length > 0
      ) {
        this.oldsearchhistory.forEach((currentData, index) => {
          if (currentData === data) {
            this.oldsearchhistory.splice(index, 1);
            // appendHistory = false;
            // console.log(index);
            // return;
          }
        });
        if (appendHistory === true) {
          if (this.oldsearchhistory.length >= 10) {
            this.oldsearchhistory.unshift(data);
            this.oldsearchhistory.pop();
          } else {
            this.oldsearchhistory.unshift(data);
          }
        }
      } else {
        this.oldsearchhistory = [];
        this.oldsearchhistory.push(data);
      }
      console.log(this.oldsearchhistory);
      this.$store.dispatch("getSearchHistory", this.oldsearchhistory);
    });
  },
  mounted() {},
  computed: {
    ...mapState(["searchHistory"]),
  },
  methods: {
    inputsearch(item) {
      this.historymessage = item;

      setTimeout(() => {
        this.$root.bus.$emit("historySearchValue", this.historymessage);
      }, 20);
    },
    clear() {
      Dialog.confirm({
        message: "是否清空搜索历史纪录",
      })
        .then(() => {
          // on confirm
          this.oldsearchhistory = [];
          localStorage.removeItem("searchHistory");
        })
        .catch(() => {
          // on cancel
        });
    },
  },
  beforeDestroy() {
    //组件销毁时解除事件绑定
    this.$root.bus.$off("realvalue");
  },
};
</script>

<style scoped>
.history-search-title {
  margin: 5px 8px 5px;
  /* display: flex; */
}

.history-search-title span {
  height: 20px;
  line-height: 20px;
  font-size: 12px;
  color: #919191;
}

.history-search-title i {
  font-size: 14px;
  float: right;
  width: 20px;
  height: 20px;
  line-height: 20px;
}

.icon-delete {
  text-align: center;

  position: relative;
  overflow: hidden;
}

.icon-delete:after {
  content: "";
  display: block;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  pointer-events: none;
  background-image: radial-gradient(circle, #666 10%, transparent 10.01%);
  background-repeat: no-repeat;
  background-position: 50%;
  transform: scale(10, 10);
  opacity: 0;
  transition: transform 0.3s, opacity 0.5s;
}

.icon-delete:active:after {
  transform: scale(0, 0);
  opacity: 0.3;
  transition: 0s;
}

.history-search-text {
  margin: 0px 8px;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
}

.van-button {
  margin: 4px 2px;
  color: #000;
  border-color: #bdbdbd;
}
</style>