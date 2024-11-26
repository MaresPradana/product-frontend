import { createStore } from 'vuex';

export default createStore({
  state: {
    alert: {
      show: false,
      type: 'success', // success | error
      title: '',
      message: ''
    },
    confirmDelete: {
      show: false,
      title: 'Are you sure?',
      message: 'Do you really want to delete this product?'
    }
  },
  mutations: {
    setAlert(state, payload) {
      state.alert = payload;
    },
    clearAlert(state) {
      state.alert = {
        show: false,
        type: 'success',
        title: '',
        message: ''
      };
    },
    setConfirmDelete(state, payload) {
      state.confirmDelete = payload;
    },
    clearConfirmDelete(state) {
      state.confirmDelete = {
        show: false,
        title: 'Are you sure?',
        message: 'Do you really want to delete this product?'
      };
    }
  },
  actions: {
    triggerAlert({ commit }, { title, message, type = 'success' }) {
      commit('setAlert', { show: true, title, message, type });

      // Auto hide the alert after 3 seconds
      setTimeout(() => {
        commit('clearAlert');
      }, 3000);
    },
    hideAlert({ commit }) {
      commit('clearAlert');
    },
    triggerConfirmDelete({ commit }, { title, message }) {
      commit('setConfirmDelete', { show: true, title, message });
    },
    hideConfirmDelete({ commit }) {
      commit('clearConfirmDelete');
    }
  },
  getters: {
    alert(state) {
      return state.alert;
    },
    confirmDelete(state) {
      return state.confirmDelete;
    }
  }
});
