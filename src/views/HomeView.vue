<template>
  <div class="home">
    <HelloWorld
      msg="Welcome to the quiz!"
      description="Choose the level in the navigation bar or click start quiz to begin at level 1"
    />
    <div class="container-mid">
      <CircleButton
        btnText="Start Quiz!"
        btnLink="/quiz-level1"
        style="background-color: green"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src
import CircleButton from "@/components/CircleButton.vue";

export default defineComponent({
  name: "HomeView",
  components: {
    HelloWorld,
    CircleButton,
  },
});
</script>

<style scoped>
.container-mid {
  display: flex;
  justify-content: center;
}
</style>
