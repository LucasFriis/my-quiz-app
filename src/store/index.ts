import { response } from "express";
import { createStore, mapActions, mapGetters } from "vuex";
import axios from "axios";

export default createStore({
  state: {
    email: "",
    token: "",
  },
  getters: {},
  mutations: {
    login(state, email) {
      state.email = email;
      localStorage.setItem("email", email);
    },
    logout(state) {
      state.email = "";
      localStorage.removeItem("email");
      localStorage.removeItem("token");
      alert("logged out");
    },
    setToken(state, token) {
      state.token = token;
      localStorage.setItem("token", token);
    },
    initStore(state) {
      const loginInfo = localStorage.getItem("email");
      const loginToken = localStorage.getItem("token");
      if (loginInfo) {
        state.email = loginInfo;
      }
      if (loginToken) {
        state.token = loginToken;
      }
    },
  },
  actions: {
    async getToken() {
      try {
        const data = await axios.get(
          "https://opentdb.com/api_token.php?command=request"
        );
        this.commit("setToken", data.data.token);
      } catch (error) {
        alert("Error getting token from api");
      }
    },
  },
  modules: {},
});
