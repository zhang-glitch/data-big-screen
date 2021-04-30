<template>
  <div class="schedule-view">
    <div class="schedule-chart">
      <vue-echarts 
        :option="option"
      />
    </div>
    <div class="bg-top"></div>
    <div class="bg-bottom"></div>
  </div>
</template>

<script>
import { ref, getCurrentInstance } from 'vue'
export default {
  name: 'ScheduleView',
  setup() {
    const option = ref({});
    const echarts = getCurrentInstance().ctx.$root.echarts
    function getVirtualData(year) {
        year = year || '2020'
        const date = +echarts.number.parseDate(year + '-06-01')
        const end = +echarts.number.parseDate((+year + 1) + '-12-31')
        const dayTime = 3600 * 24 * 1000
        const data = []
        for (let time = date; time < end; time += dayTime) {
          data.push([
            echarts.format.formatTime('yyyy-MM-dd', time),
            Math.floor(Math.random() * 10000)
          ]) 
        }
        return data
      }
      const data = getVirtualData(2021)
      // console.log(data)
      option.value = {
        calendar: [{
          top: 30,
          left: 80,
          right: 40,
          bottom: 10,
          // 必填，日历坐标的范围
          range: ['2021-06-01', '2021-12-31'],
          // 设置日历坐标分隔线的样式。
          splitLine: {
            show: true,
            lineStyle: {
              color: 'rgb(127, 127, 127)'
            }
          },
          // 设置日历坐标中 年的样式
          yearLabel: { show: false },
          // 设置日历坐标中 星期轴的样式。即竖轴（y轴）
          dayLabel: {
            color: 'rgb(127, 127, 127)',
            fontSize: 18
          },
          // 设置日历坐标中 月份轴的样式。即横轴（x轴）
          monthLabel: {
            color: 'rgb(127, 127, 127)',
            fontSize: 18
          },
          // 设置日历格的样式
          itemStyle: {
            // 日历图标的整体颜色
            color: 'rgb(48, 48, 48)',
            // 日历项的边框宽度
            borderWidth: 1,
            // 边框颜色
            borderColor: 'rgb(48, 48, 48)'
          }
        }],
        series: [
          {
            // 散点图
            type: 'scatter',
            // 该系列使用的坐标系默认为二维坐标系（cartesian2d）
            coordinateSystem: 'calendar',
            // 二维数组。[[日期, 值]]
            data: data,
            // 散点的大小。val表示data中的数据值
            symbolSize: function(val) {
              // console.log("val", val)
              return val[1] / 600
            },
            // 散点的样式
            itemStyle: {
              color: 'rgb(208,248,138)'
            }
          },
          {
            // 突出散点图。
            type: 'effectScatter',
            coordinateSystem: 'calendar',
            // 表示突出的数据项
            data: data.sort(function(a, b) {
              return b[1] - a[1]
            }).slice(0, 12),
            symbolSize: function(val) {
              return val[1] / 500
            },
            // 配置何时显示特效。
            showEffectOn: 'render',
            // 涟漪特效相关配置。
            rippleEffect: {
              // 波纹的绘制方式
              brushType: 'stroke'
            },
            hoverAnimation: true,
            // 散点图样式
            itemStyle: {
              color: 'rgb(208,248,138)',
              shadowBlur: 10,
              shadowColor: '#333'
            },
            // zlevel大的部分会放在zlevel小的上面
            zlevel: 1
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
  .schedule-view {
    position: relative;
    width: 100%;
    height: 100%;
    background: rgb(48, 48, 48);
    box-sizing: border-box;
    padding: 20px 0;

    .schedule-chart {
      width: 100%;
      height: 100%;
    }

    .bg-top, .bg-bottom {
      position: absolute;
      background: rgb(72, 122, 72);
      width: 100%;
      height: 20px;
    }

    .bg-top {
      top: 0; 
      left: 0;
    }

    .bg-bottom {
      bottom: 0;
      left: 0;
    }
  }
</style>