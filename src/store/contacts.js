const state = {
  contacts: [],
  id: 0,
  filter: ''
}

const getters = {
  getContacts: state => state.contacts,
  getId: state => state.id,
  getSearch: state => state.filter
}

const actions = {
  addContact ({ commit }, contact) {
    commit('INCREMENT_ID', contact.id)
    commit('SAVE_CONTACT', contact)
  },
  removeContact ({ commit }, contact) {
    commit('REMOVE_CONTACT', contact)
  },
  editContact ({ commit }, contact) {
    commit('EDIT_CONTACT', contact)
  },
  editFilter ({ commit }, contact) {
    commit('EDIT_FILTER', contact)
  }
}

const mutations = {
  SAVE_CONTACT (state, contact) {
    state.contacts.push(contact)
  },
  REMOVE_CONTACT (state, contact) {
    state.contacts.splice(state.contacts.findIndex(({ id }) => id === contact.id), 1)
  },
  EDIT_CONTACT (state, contact) {
    state.contacts[state.contacts.findIndex(el => el.id === contact.id)] = contact
  },
  EDIT_FILTER (state, filter) {
    state.filter = filter
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
