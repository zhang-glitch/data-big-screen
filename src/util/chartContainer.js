import { getCurrentInstance } from 'vue'


export default function chartContainer(chartId, option) {
  const instance = getCurrentInstance();
  const chart = instance?.ctx?.$root.echarts.init(chartId);
  chart?.setOption(option)
}