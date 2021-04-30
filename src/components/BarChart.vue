<template>
  <div class="bar-chart">
    <div class="title-wrapper">
      <div class="left-title">
        <div class="title">当前热卖品类</div>
        <div class="sub-title">Hot Categories</div>
      </div>
      <div class="update-time">
        最后更新时间：
        <span class="date">{{date}}</span>
        <span class="time">{{time}}</span>
      </div>
    </div>
    <div class="heat-chart">
      <div id="heat-chart">
        <vue-echarts 
          :option="option"
        />
      </div>
    </div>
  </div>
</template>

<script>
import {  ref, watch } from 'vue';
import clock from '../util/clock'
// import 'echarts/lib/echarts'
export default {
  name: 'BarChart',
  props: {
    category: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const {date, time} = clock();
    // let chartId = null;
    const option = ref(null);
    let sourceData = [];
    let source = []
    watch(() => props.category, () => {
      const {data1, data2} = props.category
      
      data1.axisX.forEach((item, index) => {
        sourceData?.push([item, data1.data1[index], data1.data2[index]])
      });
      if(sourceData[0][0] === "粉面粥店") {
        sourceData = []
        data2.axisX.forEach((item, index) => {
          sourceData.push([item, data1.data1[index], data1.data2[index]])
        });
      }else {
        sourceData = []
        data1.axisX.forEach((item, index) => {
          sourceData.push([item, data1.data1[index], data1.data2[index]])
        });
      }
        
      source = [
      ['指标', '国内', '海外'],
        ...sourceData
      ]
      // console.log("source", source)
      option.value = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        color: ['rgb(209,248,138)', 'rgba(65,65,65,.5)'],
        grid: {
          left: 20,
          right: 0,
          bottom: 30,
          top: 20
        },
        dataset: {
          source
        },
        yAxis: {
          type: 'value',
          splitLine: {
            lineStyle: {
              type: 'dotted'
            }
          },
          axisLine: {
            onZero: false,
            lineStyle: {
              color: 'rgb(124,136,146)'
            }
          },
          axisLabel: {
            color: 'rgb(98,105,113)',
            fontSize: 16
          },
          axisTick: { show: false }
        },
        xAxis: {
          type: 'category',
          splitLine: { show: false },
          axisTick: { show: false },
          axisLabel: {
            color: 'rgb(98,105,113)',
            fontSize: 16
          },
          axisLine: {
            onZero: false,
            lineStyle: {
              color: 'rgb(124,136,146)'
            }
          }
        },
        series: [
          {
            type: 'bar',
            stack: 'total',
            barWidth: 40
          }
        ]
      }
    })

    return {
      date,
      time,
      option
    }
  }
}
</script>

<style lang="scss" scoped>
  .bar-chart {
    width: 100%;
    height: 100%;
    background: rgb(43, 44, 46);
    padding: 20px 40px;
    box-sizing: border-box;

    .title-wrapper {
      display: flex;
      justify-content: space-between;

      .left-title {
        
        .title {
          font-size: 32px;
        }

        .sub-title {
          font-size: 16px;
          margin-top: 10px;
        }
      }

      .update-time {
        font-size: 16px;
        vertical-align: middle;

        .time {
          margin-left: 5px;
        }
      }
    }
    .heat-chart {
      height: 250px;

      #heat-chart {
        height: 100%;
      }
    }
  }
</style>