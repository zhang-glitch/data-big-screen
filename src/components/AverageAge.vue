<template>
  <div class="average-age">
    <div class="top">
      <div class="left">
        <div class="title">臻尚用户年龄分布&平均年龄</div>
        <div class="sub-title">Distribution of Age</div>
      </div>
      <div class="right">
        <vue-count-to 
          :startVal="startAge"
          :endVal="averageAge"
          :duration="1000"
          :decimals="2"
        />
        <span class="sui">岁</span>
      </div>
    </div>
    <div class="center">
      <div id="average-age-chart"></div>
    </div>
    <div class="bottom">
      <div class="age-item" v-for="item in centerData" :key="item?.key">
        <div class="age-num">
          <vue-count-to 
            :startVal="0"
            :endVal="item?.value"
            :duration="1000"
            separator=","
          />
        </div>
        <div class="section">
          <span class="point" :style="{background: item?.color}"></span>
          <span class="section-text">{{item?.key}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref, onUnmounted } from 'vue'
import VueCountTo from './vue-count-to/VueCountTo.vue'
import chartContainer from '../util/chartContainer'

const color = ['rgb(116,166,49)', 'rgb(190,245,99)', 'rgb(202,252,137)', 'rgb(251,253,142)']

export default {
  name: 'AverageAge',
  components: {
    VueCountTo
  },
  props: {
    centerData: {
      type: Array,
      required: true
    },
    averageAge: {
      type: [Number, String],
      retuired: true
    }
  },
  setup(props) {
    const startAge = ref(0);
    
    const option = ref(null)
    let chartId = null;
    onMounted(() => {
      // 获取图标dom容器
      chartId = document.getElementById("average-age-chart");
      
      const data = ['年龄分布']
      let max = 0
      props.centerData.forEach(item => {
        data.push(item.value)
        max += item.value
      })
      option.value = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          },
          textStyle: {
            fontSize: 28
          },
          padding: 10
        },
        color,
        // 整个坐标轴的位置
        grid: {
          left: 40,
          right: 40,
          top: 10
        },
        dataset: {
          source: [
            ['指标', '0-20', '20-30', '30-50', '>50'],
            data
          ]
        },
        xAxis: {
          type: 'value',
          // grid网格的分割线
          // 是否显示分隔线。默认数值轴显示，类目轴不显示。
          splitLine: { show: false },
          // 坐标刻度的最大值
          max,
          // 坐标轴轴线设置
          axisLine: {
            show: true,
            lineStyle: {
              color: 'rgb(50,51,53)',
              width: 3
            }
          },
          // 坐标轴刻度，就是小横线
          axisTick: { show: false },
          // 坐标轴x刻度值
          axisLabel: {
            color: 'rgb(98,105,113)',
            fontSize: 18
          }
        },
        yAxis: {
          type: 'category',
          show: false
        },
        series: [
          {
            type: 'bar',
            // 数据堆叠，同个类目轴上系列配置相同的stack值可以堆叠放置。
            stack: 'total',
            // 每个柱条的宽度
            barWidth: 15
          },
          {
            type: 'bar',
            stack: 'total'
          },
          {
            type: 'bar',
            stack: 'total'
          },
          {
            type: 'bar',
            stack: 'total',
          }
        ]  
      }
      chartContainer(chartId, option.value)
    })

    onUnmounted(() => {
      chartId = null;
    })
    
    return {
      startAge
    }
  }
}
</script>

<style lang="scss" scoped>
  .average-age {
    width: 100%;
    height: 100%;
    background: rgb(43, 44, 46);
    padding: 20px 40px;
    box-sizing: border-box;

    .top {
      display: flex;
      align-items: center;

      .left {
        .title {
          font-size: 32px;
        }

        .sub-title {
          font-size: 16px;
          margin-top: 10px;
        }
      }

      .right {
        flex: 1;
        margin-left: 40px;
        font-weight: bolder;
        font-size: 68px;
        font-family: DIN;

        .sui {
          margin-right: 5px;
          font-size: 20px;
        }
      }
    }

    .center {
      height: 120px;
      box-sizing: border-box;
      
      #average-age-chart {
        height: 100%;
      }
    }

    .bottom {
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      width: 100%;
      margin-top: 5px;

      .age-item {
        font-weight: bolder;
        .age-num {
          font-size: 30px;
        }
        .section {
          margin-top: -20px;
          text-align: center;

          .point {
            display: inline-block;
            width: 10px;
            height: 10px;
            border-radius: 50%;
          }

          .section-text {
            display: inline-block;
            font-size: 16px;
            margin-left: 10px;
          }
        }
      }
    }
  }
</style>