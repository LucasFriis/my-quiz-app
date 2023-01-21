<template>
  <div class="level-2">
    <QuizContent :query="levelFromApi" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import QuizContent from "@/components/QuizContent.vue";

export default defineComponent({
  name: "Level2View",
  components: {
    QuizContent,
  },
  data() {
    return {
      levelFromApi:
        "https://opentdb.com/api.php?amount=10&type=multiple&difficulty=medium",
    };
  },
  created() {
    if (!this.$store.state.email) {
      this.$router.push("/login");
    } else {
      this.levelFromApi += "&" + this.$store.state.token;
    }
  },
});
</script>

<style scoped></style>
