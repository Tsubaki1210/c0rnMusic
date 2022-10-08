<template>
  <div>
    <radio-top-swipe class="top-swipe"></radio-top-swipe>
  </div>
</template>

<script>
import RadioTopSwipe from "components/common/swipe/RadioTopSwipe";

export default {
  name: "Radio",
  components: {
    RadioTopSwipe,
  },
};
</script>

<style scoped>
.top-swipe {
  /* height: 160px; */
  padding: 5px 0px;
}
</style>