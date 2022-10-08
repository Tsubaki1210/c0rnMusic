<template>
  <div>
    <van-swipe
      class="my-bottom-swipe"
      :autoplay="5000"
      indicator-color="#dc4037"
    >
      <van-swipe-item v-for="(item, index) in bottomSwipes" :key="index">
        <img :src="item.pic" alt="" />
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
export default {
  name: "HomeBottomSwipe",
};
</script>

<style scoped>
</style>