import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    volume: 55,
    videoId: "WxnN05vOuSM",
  },
  mutations: {
    setVolumeLevel(state, volume) {
      state.volume = volume;
    },
    setVideoId(state, videoId) {
      state.videoId = videoId;
    },
  },
  actions: {},
  modules: {},
  plugins: [createPersistedState({ key: "pomodoro" })],
});
