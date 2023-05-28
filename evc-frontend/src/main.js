import './assets/main.css'

import { createApp } from 'vue'
import VueGoogleMaps from 'vue-google-maps-community-fork'

import App from './App.vue'
import router from './router'
import store from './store/store'

const app = createApp(App)

app.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyDppaWpgOjHwUye10Pmf8mRai1c2uy0EVE'
  }
})

app.use(router)
app.use(store)

app.mount('#app')
