import { createApp } from 'vue'
import App from './App.vue'
import router from './route/router'
import VueEcharts from 'vue-echarts'
import * as echarts from 'echarts'

const app = createApp(App)
  .use(router)
  .component("vue-echarts", VueEcharts)
  .mount('#app')

app.echarts = echarts