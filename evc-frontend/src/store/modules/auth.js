import { instance } from '@/tools/axios'

const normalize = (str) => {
  if (str == 'null' || str == 'undefined' || str == null || str == undefined) {
    return null
  }
  return str
}

const state = {
  apiKey: null,
  companyId: null
}

const getters = {
  apiKey: (state) => state.apiKey,
  companyId: (state) => state.companyId
}

const mutations = {
  INIT(state) {
    state.apiKey = normalize(localStorage.getItem('apiKey'))
    state.companyId = normalize(localStorage.getItem('companyId'))
  },
  SET_API_KEY(state, apiKey) {
    state.apiKey = apiKey
    if (apiKey == null) {
      localStorage.removeItem('apiKey')
    }
    localStorage.setItem('apiKey', apiKey)
  },

  SET_COMPANY_ID(state, companyId) {
    state.companyId = companyId
    if (companyId == null) {
      localStorage.removeItem('companyId')
    }
    localStorage.setItem('companyId', companyId)
  },
  LOGOUT(state) {
    state.apiKey = null
    state.companyId = null
    localStorage.removeItem('apiKey')
    localStorage.removeItem('companyId')
  }
}

const actions = {
  async validateApiKey({ commit }, apiKey) {
    try {
      const response = await instance.get(`/key/validate?key=${apiKey}`)

      if (response.data.data.valid) {
        commit('SET_API_KEY', apiKey)
        commit('SET_COMPANY_ID', response.data.data.companyId)
      }
    } catch (error) {
      console.log(error)
    }
  },
  logout({ commit }) {
    commit('LOGOUT')
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
