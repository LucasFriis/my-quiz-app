<template>
  <div class="login">
    <p class="login-header">Please login to continue</p>
    <form @submit.prevent="handleSubmit">
      <input type="email" v-model="email" placeholder="Email.." required />
      <input type="password" v-model="password" placeholder="******" required />
      <input type="submit" title="Login" value="Login" />
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapState, mapActions } from "vuex";
import axios from "axios";

export default defineComponent({
  name: "LoginForm",
  data() {
    return {
      email: "",
      password: "",
      token: "",
      routedFrom: "/",
    };
  },
  methods: {
    handleSubmit() {
      this.$store.dispatch("getToken");
      this.$store.commit("login", this.email);
      // const lastRoute = this.$router.options.history.state.back;
      // if (lastRoute) {
      //   this.routedFrom = lastRoute.toString();
      // }
      this.$router.push(this.routedFrom);
    },
  },
});
</script>
<style scoped>
.login {
  display: flex;
  flex-direction: column;
  margin: auto;
}

.login-header {
  font-size: 24px;
}

form {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  margin: 24px 54px;
}

input[type="email"],
input[type="password"] {
  font-style: italic;
  margin-bottom: 16px;
  border: none;
  background-color: rgb(238, 237, 237);
  border-radius: 10px;
  padding: 8px;
}

input[type="submit"] {
  margin: 24px auto;
  background-color: #333;
  color: white;
  font-weight: bold;
  border: 1px solid #333;
  cursor: pointer;
  text-shadow: 0px 2px 10px rgba(0, 0, 0, 10%);
  padding: 12px;
}

input[type="submit"]:hover {
  color: #333;
  background: #fff;
  border: 1px solid #333;
}
</style>
