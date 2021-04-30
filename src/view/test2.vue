<template>
  <div class="test2">
    <div>111111111111</div>
    <vue-echarts 
      :option="option"
    />
  </div>
</template>

<script>
import { ref } from 'vue'
export default {
  name: 'test2',
  setup() {
    const option = ref({});

    option.value = {
      baseOption: {
        timeline: {
          axisType: 'category',
          autoPlay: true,
          loop: true,
          inverse: true, // 将timeline轴反向
          rewind: true, // 反向播放。但是需要吧loop设置为true
          label: {
            formatter(value) {
                return new Date(value).getFullYear();
            }
          },
          data: [
            {
              value: '2010-01-01',
              symbol: 'rect',
              symbolSize: 18
            },
            {
              value: '2011-01-01',
              symbol: 'rect',
              symbolSize: 18
            },
            {
              value: '2012-01-01',
              symbol: 'rect',
              symbolSize: 18
            },
            {
              value: '2013-01-01',
              symbol: 'rect',
              symbolSize: 18
            },
            {
              value: '2014-01-01',
              symbol: 'rect',
              symbolSize: 18
            },
            {
              value: '2015-01-01',
              symbol: 'rect',
              symbolSize: 18
            }
          ]
        }
      },
      options: [
        // 这里的数据对应上面的baseOption的x轴数据项数
        {

        }
      ]
    }
    return {
      option
    }
  }
}
</script>

<style lang="scss" scoped>
  .test2 {
    width: 100%;
    height: 100%;
  }
</style>