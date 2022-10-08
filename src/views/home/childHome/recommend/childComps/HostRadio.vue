<template>
  <div>
    <div class="host-radio-title">
      <span>主播电台</span>
      <van-icon name="arrow" />
    </div>
    <div class="host-radio">
      <host-radio-item
        v-for="(item, index) in radios"
        :key="index"
        :host-radio-item="item"
      ></host-radio-item>
    </div>
  </div>
</template>

<script>
import HostRadioItem from "views/home/childHome/recommend/childComps/HostRadioItem";

import { getHostRadio } from "network/home.js";

export default {
  name: "HostRadio",
  components: {
    HostRadioItem,
  },
  data() {
    return {
      radios: {},
    };
  },
  created() {
    this.getHostRadio();
  },
  computed: {},
  methods: {
    //获取近6条主播电台数据
    getHostRadio() {
      getHostRadio().then((res) => {
        this.radios = res.djRadios;
        console.log(this.radios);
      });
    },
  },
};
</script>

<style scoped>
.host-radio-title {
  margin: 1.25rem 0.3125rem 0.3125rem 0.3125rem;
  font-size: 0.8125rem;
  font-weight: bolder;
}

.host-radio {
  margin: 0.3125rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
</style>