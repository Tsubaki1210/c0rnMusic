<template>
  <div id="user">
    <div>
      <user-top></user-top>
      <!-- class="top-user-login-block" -->
      <user-login class="top-user-login"></user-login>
      <user-body></user-body>
    </div>
  </div>
</template>

<script>
import UserTop from "components/common/top/user/UserTop";

import UserLogin from "views/user/childComps/UserLogin";
import UserBody from "views/user/childComps/UserBody";

export default {
  name: "User",
  components: {
    UserTop,
    UserLogin,
    UserBody,
  },
};
</script>

<style scoped>
/* .top-user-login-block {
  height: 100px;
  margin: 0;
  padding: 0;
} */

.top-user-login {
  padding-top: 0.25rem;
}
</style>