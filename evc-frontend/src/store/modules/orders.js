import { instance } from '@/tools/axios'

const state = {
  orders: [],
  order: null
}

const getters = {
  orders: (state) => state.orders,
  order: (state) => state.order
}

const mutations = {
  SET_ORDERS(state, orders) {
    state.orders = orders
  },
  SET_ORDER(state, order) {
    state.order = order
  }
}

const actions = {
  async fetchOrders({ commit }) {
    try {
      const response = await instance.get('api/order')

      commit('SET_ORDERS', response.data.data)
    } catch (error) {
      console.log(error)
    }
  },
  async getOneOrder({ commit }, id) {
    try {
      const response = await instance.get(`api/order/${id}`)

      commit('SET_ORDER', response.data.data)
    } catch (error) {
      console.log(error)
    }
  },

  async createOrder({ commit }, order) {
    try {
      const response = await instance.post('api/order', order)

      return response.status === 201
    } catch (error) {
      console.error(error)
    }
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
