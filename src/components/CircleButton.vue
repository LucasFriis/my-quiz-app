/* eslint-disable */
<template>
  <a class="circle-button" :href="btnLink" :title="btnText">
    <p>{{ btnText }}</p>
  </a>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "CircleButton",
  props: {
    btnText: String,
    btnLink: String,
    btnColor: String,
    btnFontColor: String,
  },
});
</script>

<style scoped>
.circle-button {
  width: 150px;
  height: 150px;
  display: flex;
  border-radius: 50%;
  font-size: 32px;
  color: #fff;
  text-align: center;
  background: #000;
  cursor: pointer;
  text-decoration: none !important;
  box-shadow: 0 6px 12px rgb(0 0 0 / 35%);
}

.circle-button:hover {
  opacity: 0.7;
  box-shadow: 0 6px 12px rgb(0 0 0 / 75%);
}
</style>
