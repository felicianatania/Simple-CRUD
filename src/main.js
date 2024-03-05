import { createApp } from 'vue'
import './style.css'
// import { mockServer } from './api-mock'
import router from './router'
import App from './App.vue'

// create mock only if on development state
// if (process.env.NODE_ENV === 'development') {
//   mockServer()
// }

// createApp(App).mount('#app')
const app = createApp(App)

app.use(router)

app.mount('#app')
