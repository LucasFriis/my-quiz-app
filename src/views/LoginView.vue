<template>
  <div class="login">
    <div class="container-mid">
      <ModalOverlay :showPopUp="true">
        <LoginForm />
      </ModalOverlay>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ModalOverlay from "@/components/ModalOverlay.vue";
import LoginForm from "@/components/LoginForm.vue";

export default defineComponent({
  name: "LoginView",
  components: {
    LoginForm,
    ModalOverlay,
  },
});
</script>

<style scoped>
.container-mid {
  display: flex;
  justify-content: center;
}
</style>
