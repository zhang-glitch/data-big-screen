<template>
  <div class="test5">
    <vue-echarts 
      :option="option"
    />

  </div>
</template>

<script>
import { getCurrentInstance, onMounted, ref } from 'vue'
export default {
  name: 'test5',
  setup() {
    const option = ref({});
    const echarts = getCurrentInstance().ctx.$root.echarts
    const update = () => {
      fetch('http://www.youbaobao.xyz/datav-res/datav/map.json')
      .then(res => res.json())
      .then(data => {
        echarts.registerMap("china", data)
        
        option.value = {
          geo: {
            map: 'china',
            zoom: 1.1,
            roam: true, // 是否可以缩放
            scaleLimit: {
              min: 0.5,
              max: 3
            },
            center: [113.83531246, 34.0267395887],
            itemStyle: {
              borderColor: 'rgba(147, 235, 248, 1)',
              borderWidth: 1,
              areaColor: {
                  type: 'radial',
                  x: 0.5,
                  y: 0.5,
                  r: 0.8,
                  colorStops: [{
                      offset: 0, color: 'rgba(147, 255, 248, 0)' // 0% 处的颜色
                  }, {
                      offset: 1, color: 'rgba(147, 235, 248, 0.2)' // 100% 处的颜色
                  }],
                  global: false // 缺省为 false
              } 
            }
          }
        }
      })
    }

    onMounted(update)
    return {
      option
    }
  }
}
</script>

<style lang="scss" scoped>
  .test5 {
    width:100%;
    height: 100%;
    background: #000;
  }
</style>