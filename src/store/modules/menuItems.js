import { joinInGroups, parseData } from "../../utils";

export default {
  namespaced: true,

  state: {
    items: [],
    isEmpty: true,
  },

  mutations: {},

  actions: {
    async ["loadData"]({ state }) {
      const id = "1rKxU_BvdGmpJn0UnXY2A-Hno3FZHVDtKsYASJ_kFBwU";
      const url = `https://docs.google.com/spreadsheets/d/${id}/gviz/tq?tqx=out:json`;

      state.items = await fetch(url)
        .then((res) => res.text())
        .then((text) => JSON.parse(text.substr(47).slice(0, -2)))
        .then((json) => joinInGroups(parseData(json)));

      state.isEmpty = !!state.items.length;
    },
  },
  gettets: {},
};
