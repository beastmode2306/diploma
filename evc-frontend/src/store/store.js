import { createStore } from 'vuex'
import orders from './modules/orders.js'
import auth from './modules/auth.js'

const store = createStore({
  modules: {
    orders,
    auth
  }
})

export default store
