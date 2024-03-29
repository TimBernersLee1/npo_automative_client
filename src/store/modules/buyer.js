
import {sortState} from '@/js/index';
import PATH_TO_SERVER from '@/js/path.js'

export default {
  state: {
    buyer: [],
    buyerFilter: [],
    onebuyer: {},

    searchBuyer: [],
    tmp_attention: [],

    date_is: '<'
  },
  getters: { 
    allBuyer(state) {
      return state.buyer;
    }, 
    getSetBuyer(state) {
      return state.onebuyer;
    }
  },
  actions: { 
    async fetchAllBuyers(ctx, light = 'false') {
      const res = await fetch(`${PATH_TO_SERVER}api/buyer/light/${light}`);
      if(!res.ok) return false;

      const result = await res.json();
      ctx.commit("setAllBuyer", result);
      return result;
    },
    async addOneBuyer(ctx, buyer) {
      const res =  await fetch(`${PATH_TO_SERVER}api/buyer`, {
        method: 'POST',
        body:   buyer
      });
      if(!res) return false;

      ctx.dispatch('fetchAllBuyers');
    },
    async fetchBuyerBan(ctx, id) {
      const res = await fetch(`${PATH_TO_SERVER}api/buyer/${id}`, {
        method: 'delete'
      });
      if(!res.ok) return false;

      ctx.commit('removeBuyer', id);
    },

    async updateOneBuyer(ctx, data) {
      const res =  await fetch(`${PATH_TO_SERVER}api/buyer/update`, {
        method: 'POST',
        body:   data
      });
      if(!res.ok) return false;

      ctx.dispatch('fetchAllBuyers');
    },
    async attachFileToBuyer(ctx, data) {
      const res = await fetch(`${PATH_TO_SERVER}api/buyer/files/${data.buyer_id}/${data.file_id}`);
      if(!res.ok) return false;

      const result = await res.json();
      return result;
    },
  },
  mutations: {
    setAllBuyer(state, result) {
      state.buyer = result.filter(buyer => !buyer.ban);
    },
    removeBuyer(state, id) {
      state.buyer = state.buyer.filter(buyer => buyer.id != id);
    },
    setBuyerState(state, buyer) {
      state.onebuyer = buyer;
    },
    searchBuyerMutations(state, tm) {
      if(!state.searchBuyer.length) 
        state.searchBuyer = state.buyer;
      state.buyer = state.searchBuyer;
      if(!tm) return;
          
      state.buyer = state.buyer
      .filter(t =>
        String(t.inn)
        .slice(0, String(tm).length) == String(tm) ||
        ((t.name.toLowerCase()).indexOf(tm.toLowerCase(), 0) != -1)
      );
    },
    filterToAttentionBuyer(state) {
      if(state.tmp_attention.length == 0)
        state.tmp_attention = state.buyer;
      else {
        state.buyer = state.tmp_attention ;
        return state.tmp_attention = [];
      }
      state.buyer = state.buyer.filter(detal => detal.attention);
    },
    filterBuyerToDate(state) {
      state.date_is = sortState(state.buyer, state.date_is);
    },
  }
}