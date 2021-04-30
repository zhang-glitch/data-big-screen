<template>
  <div class="line-chart">
    <div class="title-wrapper">
      <div class="title">臻尚骑手概况</div>
      <div class="sub-title">Rider Growth rate</div>
    </div>
    <div id="rider-chart">
      <vue-echarts 
        :option="option"
      />
    </div>
  </div>
</template>

<script>
import {ref, watch} from 'vue'

  const colors = ['rgb(209,248,139)', 'rgb(115,201,245)', 'rgb(124,136,146)']
export default {
  name: 'LineChart',
  props: {
    rider: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const option = ref({});
    let data1 = ref(props.rider.orderData.data1)
    let data2 = ref(props.rider.orderData.data2)
    const legendData = ref(props.rider.rateData);
    const uniqueIndex = ref(0);
    watch(() => props.rider, () => {
      if(uniqueIndex.value === 0) {
        // 渲染orderData中的数据
        data1.value = props.rider.orderData.data1
        data2.value = props.rider.orderData.data2
        uniqueIndex.value = 1;
      }else {
        // 渲染rateData中的数据
        data1.value = props.rider.rateData.data1
        data2.value = props.rider.rateData.data2
        uniqueIndex.value = 0;
      }
      // console.log("data1",data1.value)

      option.value =  {
        color: colors,
        tooltip: {
          trigger: 'none',
          axisPointer: {
            type: 'cross'
          }
        },
        legend: {
          top: 20,
          right: 40,
          icon: 'rect',
          textStyle: {
            fontSize: 18,
            color: '#ffffff',
            fontFamily: 'DIN'
          },
          data: [legendData.value.legend1, legendData.value.legend2]
        },
        grid: {
          top: 60,
          bottom: 30,
          left: 80,
          right: 40
        },
        xAxis: {
          type: 'category',
          data: props.rider.axisX
        },
        yAxis: [{
          type: 'value',
          axisTick: { show: false },
          axisLine: {
            onZero: false,
            lineStyle: {
              color: colors[2]
            }
          },
          axisLabel: {
            fontSize: 16
          },
          splitLine: {
            lineStyle: {
              type: 'dotted'
            }
          }
        }],
        series: [{
          name: legendData.value.legend1,
          type: 'line',
          smooth: true,
          lineStyle: {
            width: 2
          },
          symbol: 'none',
          data: data1.value
        }, {
          name: legendData.value.legend2,
          type: 'line',
          smooth: true,
          lineStyle: {
            width: 2
          },
          symbol: 'none',
          data: data2.value
        }]
      }
    })

    return {
      option
    }
  }
}
</script>

<style lang="scss" scoped>
  .line-chart {
    width:100%;
    height: 100%;
    background: rgb(43, 44, 46);
    box-sizing: border-box;

    .title-wrapper {
      padding: 20px 40px 0;

      .title {
        font-size: 32px;
      }

      .sub-title {
        font-size: 16px;
        margin-top: 10px;
      }
    }

    #rider-chart {
      height: 250px;
      width: 100%;
    }
  }
</style>