import PATH_TO_SERVER from '@/js/path.js';

export default {
  state: {
    db: [],
  },
  getters: { 
    getDB(state) {
      return state.db
    }
  }, 
  actions: {
    async fetchDB(ctx) { 
      const res = await fetch(`${PATH_TO_SERVER}api/settings/db/`)
      if(res.ok == true) {
        const result = await res.json()
        ctx.commit('setDB', result)
        return result
      }
    },
    async fetchAddDB() {
      const res =  await fetch(`${PATH_TO_SERVER}api/settings/db/new/`)
      console.log(res)
      if(res.ok)
        return true

      return false
    },
    async fetchDropDB(ctx, name_dump) {
      const res = await fetch(`${PATH_TO_SERVER}api/settings/db/${name_dump}`, {
        method: "delete"
      })
      if(res.ok)
        ctx.commit('filterDB', name_dump)
    },
    async fetchInactionHors() {
      const res = await fetch(`${PATH_TO_SERVER}api/settings/inaction/`);
      if(!res.ok) return false;
      
      const result = await res.json();
      return result;
    },
    async fetchChangeInaction(ctx, hors) {
      const res = await fetch(`${PATH_TO_SERVER}api/settings/inaction/${hors}`, {
        method: 'put'
      })
      if(res.ok)
        return true
        else return false
    }
  },
  mutations: {
    setDB(state, result) { 
      state.db = result;  
    },
    filterDB(state, name_dump) {
      state.db = state.db.filter(db => db.name != name_dump)
    }
  }
}