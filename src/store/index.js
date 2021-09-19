import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userList: [],
    sortCriteria: [
      {name: 'total', asc: false, desc: false},
      {name: 'friends', asc: false, desc: false},
      {name: 'influence', asc: false, desc: false},
      {name: 'chirpiness', asc: false, desc: false},
    ],
    dateRangeForSorting: {
      startDate: (new Date(2006, 2, 21).getTime())/1000,
      endDate: (new Date().getTime())/1000
    },
    warningDialogOpened: false
  },
  mutations: {
    setUserList(state, list) {
      state.userList = list;
    },
    removeUserFromList(state, userId) {
      for(let i=0; i < state.userList.length; i++) {
        if(state.userList[i].uid == userId) {
          state.userList.splice(i, 1);
        }
      }
    },
    setSortCriteria(state, cName) {
      for(let i=0; i < state.sortCriteria.length; i++) {
        if(state.sortCriteria[i].name == cName) {
          if(state.sortCriteria[i].asc) {
            state.sortCriteria[i].asc = false;
            state.sortCriteria[i].desc = true;
          } else {
            state.sortCriteria[i].asc = true;
            state.sortCriteria[i].desc = false;
          }
        } else {
          state.sortCriteria[i].asc = false;
          state.sortCriteria[i].desc = false;
        }
      }
    },
    setDateRangeForSorting(state, dRange) {
      if(dRange.name == "startDate") {
        Vue.set(state.dateRangeForSorting, "startDate", dRange.date);
      } else if(dRange.name == "endDate") {
        Vue.set(state.dateRangeForSorting, "endDate", dRange.date);
      }
    },
    openWarningDialog(state, status) {
      state.warningDialogOpened = status;
    },
  },
  actions: {
  },
  modules: {
  }
})
