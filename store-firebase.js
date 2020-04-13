import Vue from "vue";
import { fstore, firebaseAuth } from "boot/firebase";
import { uid } from "quasar";

const state = {
  name: "PageIndex1",
  slide: "style",
  expend: false,
  sightseeingMembers: {},
  everydaySites: {},
  watch: {},
};
const mutations = {
  updateDragSite(state, payload) {
    state.everydaySites.id = payload.id;
    state.everydaySites.site = payload;
  },
  addEverydaySite(state, everyday) {
    state.everydaySites = everyday;
    console.log("資料格式", everyday);
  },
  setDragkey(state, everydaySite) {
    state.everydaySites = everydaySite;
  },
  setDragGroup(state, { value, key }) {
    state.everydaySites[key] = value;
  },
};
const actions = {
  updateSchedule({ commit, dispatch }, payload) {
    commit("updateSchedule", payload);
    // 傳id給arrange-schedule
    const pass_id = payload.id;
    this.$router.push({
      path: "/arrange-schedule?",
      query: { pass_id: `${pass_id}` },
    });
    dispatch("fbEverySiteData", pass_id);
  },
  updateDragSite({ commit }, payload) {
    console.log("updateDragSite", payload);
    commit("updateDragSite", payload);
  },
  setDragkey({ commit }, value) {
    commit("setDragkey", value);
  },
  fbEverySiteData({ commit }, pass_id) {
    const uid = firebaseAuth.currentUser.uid;
    const everyday = [];
    const itinerary_eve = fstore
      .collection("sightseeingMember")
      .doc(uid)
      .collection("我的旅程表")
      .doc(pass_id)
      .collection("每一天");
    itinerary_eve.get().then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        var everydaySite = doc.data();
        var everydayId = doc.id;
        everyday.push({
          id: everydayId, //這裡存的是日期
          site: everydaySite.site, //這裡存的是日期裡的景點(array)
        });
      });
      commit("addEverydaySite", everyday);
    });
  },
};
const getters = {
  sightseeingMembers: (state) => {
    return state.sightseeingMembers;
  },
  everydaySites: (state) => {
    return state.everydaySites;
  },
};
export default {
  namespaced: true,

  state,
  mutations,
  actions,
  getters,
};
