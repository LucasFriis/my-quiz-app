<template>
  <div>
    <transition>
      <div class="modal-overlay" v-if="showModal" />
    </transition>
    <transition name="fade" appear>
      <div class="modal" v-if="showModal">
        <div class="login-info-container">
          <div style="display: flex; margin: 0 16px; flex-direction: column">
            <div
              class="flex-row"
              style="justify-content: center; margin-top: 24px"
            >
              <slot />

              <!-- <input
                type="submit"
                value="Login"
                class="register-input-submit"
                @click="closeRegisterPopUp()"
              /> -->
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { defineComponent, Vue } from "vue";

export default defineComponent({
  name: "ModalOverlay",
  data() {
    return {
      showModal: false,
    };
  },
  props: {
    showPopUp: Boolean,
  },
  created() {
    this.showModal = this.showPopUp;
  },
  methods: {
    closeRegisterPopUp() {
      this.showModal = false;
      // this.$emit('registerPopUp', this.showRegisterPopUp)
    },
  },
});
</script>

<style>
.modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 100;
  max-width: 85%;
  max-height: 85%;
  overflow: auto;
  background-color: #fff;
  border-radius: 8px;
  padding: 24px;
  overflow: auto;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 99;
  background-color: rgba(0, 0, 0, 0.3);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.login-info-container {
  display: flex;
  flex-direction: column;
}

.flex-row {
  display: flex;
  flex-direction: row;
}

.flex-col {
  display: flex;
  flex-direction: column;
}

.click-close-container {
  width: 30px;
  height: 30px;
  border-radius: 24px;
  background-color: #333;
  text-align: center;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-weight: bold;
}
.click-close-container:hover {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  background-color: rgb(202, 22, 22);
}
.register-input-field {
  margin: 8px;
  background-color: rgb(231, 231, 231);
  font-weight: 700;
  border-radius: 4px;
  border-color: transparent;
  height: 20px;
}

.register-input-submit {
  background-color: #333;
  font-weight: 700;
  color: #fff;
  height: 40px;
  width: 60px;
  border: transparent;
  border-radius: 4px;
  cursor: pointer;
}

.register-input-submit:hover {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  background-color: #8fa65e;
}

@media only screen and (max-width: 500px) {
  .flex-row {
    flex-direction: column !important;
    margin: 24px auto 0 auto;
  }
}
</style>
