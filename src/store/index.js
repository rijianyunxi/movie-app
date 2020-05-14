import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
// state
const state = {
  shops: [],
  checkedShops: [],
  totalPrice: 0.00,
};
//getters
const getters = {
  shops: state => state.shops,
  checkedShops: state => state.checkedShops,
  totalPrice: state => {
    if (state.checkedShops.length == 0) {
      return state.totalPrice = 0.00;
    } else {
      let all = state.totalPrice = state.checkedShops.map(r => r.allPrice).reduce((a, b) => a + b);
      return all.toFixed(2);
    }
  },
};
//mutations
const mutations = {
  addShop: (state, option) => {
    option.shop.forEach(e => {
      if (option.place == 0) {
        state.shops.push(e);
      } else if(option.place == 1) {
        state.checkedShops.push(e);
      }else{
        state.checkedShops = state.shops
      }
    })
  },
  minusShop: (state, option) => {
    option.shop.forEach(e => {
      if (option.place == 0) {
        state.shops = state.shops.filter(r=> r.id != e.id)
      } else if(option.place == 1) {
        state.checkedShops = state.checkedShops.filter(r=> r.id != e.id)
      }else{
        state.checkedShops =[];
      }
    })
  },
  addNumber: (state, id) => {
    state.shops.forEach(e => {
      if (e.id == id) {
        e.number++;
        e.allPrice = e.number * e.onePrice;
      }
    });
  },
  minusNumber: (state, id) => {
    state.shops.forEach(e => {
      if (e.id == id) {
        e.number--;
        e.allPrice = e.number * e.onePrice;
      }
    });
  }
};
//actions
const actions = {
  addShop: ({ commit }, option) => {
    commit('addShop', option)
  },
  minusShop: ({ commit }, option) => {
    commit('minusShop', option)
  },
  addNumber: ({ commit }, id) => {
    commit('addNumber', id)
  },
  minusNumber: ({ commit }, id) => {
    commit('minusNumber', id)
  }
}

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})
