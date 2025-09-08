import { createApp } from 'vue'
import { MotionPlugin } from '@vueuse/motion'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/tailwind.css'

createApp(App)
    .use(router)
    .use(store)
    .use(MotionPlugin)
    .mount('#app')
