import { LocalStorage } from "../../utils/index.js";

export default {
  namespaced: true,

  state: {
    shoppingBasket: new Map(),
    volume: 0,
    setting: {
      storage: "shoppingBasket",
      localStorage: null,
    },
  },

  mutations: {
    async addItemToBasket(state, data) {
      let { item, quantity } = data;
      quantity = parseInt(quantity);

      if (state.shoppingBasket.has(item?.nome)) {
        quantity += state.shoppingBasket.get(item?.nome).quantity;
        state.shoppingBasket.set(item?.nome, { item, quantity });

        await LocalStorage.updateAll(state.setting, state.shoppingBasket);
      } else {
        state.shoppingBasket.set(item?.nome, { item, quantity });
        await LocalStorage.updateAll(state.setting, state.shoppingBasket);
      }

      state.volume = state.shoppingBasket.size;
    },

    removeAll(state) {
      state.shoppingBasket.clear();
      state.volume = state.shoppingBasket.size;
      LocalStorage.removeAll(state.setting);
    },

    removeItemFromBasket(state, itemName) {
      state.shoppingBasket.delete(itemName);
    },

    setLocalStorage(state, instance) {
      state.setting.localStorage = instance;
    },
    removeItem: (state, itemName) => {
      state.shoppingBasket.delete(itemName);
      // Recalcular volume
      let newVolume = 0;
      state.shoppingBasket.forEach((value) => {
        newVolume += value.quantity;
      });
      state.volume = newVolume;
    },
  },

  // TROCAR loadShoppingBasket por isso:
  actions: {
    loadShoppingBasket({ commit }) {
      try {
        const data = localStorage.getItem("shoppingBasket");
        if (data) {
          const parsed = JSON.parse(data);
          // Carregar os itens se existirem
          if (parsed && Array.isArray(parsed)) {
            parsed.forEach((item) => {
              commit("addItem", item);
            });
          }
        }
      } catch (error) {
        console.log("Carrinho vazio ou erro ao carregar:", error);
      }
    },
  },

  gettets: {},
};
