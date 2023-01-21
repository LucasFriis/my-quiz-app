<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/quiz-level1">Level 1</router-link> |
    <router-link to="/quiz-level2">Level 2</router-link> |
    <router-link to="/quiz-level3">Level 3</router-link>
    <!-- <router-link v-if="!$store.state.email" to="/login">Login</router-link> -->
    <a class="logout" v-if="$store.state.email" @click="logout">Logout </a>
  </nav>
  <router-view />
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
  box-shadow: 0 2px 8px rgb(0 0 0 / 10%);
}

nav a {
  font-weight: bold;
  color: #2c3e50;
  text-decoration: none;
  cursor: pointer;
}

.logout {
  display: flex;
  flex-direction: row;
  justify-content: right;
}

nav a.router-link-exact-active,
a.router-link:active {
  color: #42b983;
  text-decoration: underline;
}

nav a:active,
a:focus,
a:hover {
  color: #42b983;
  text-decoration: underline;
}
</style>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  methods: {
    logout() {
      this.$store.commit("logout");
      this.$router.push("/");
    },
  },
  mounted() {
    this.$store.commit("initStore");
  },
});
</script>
