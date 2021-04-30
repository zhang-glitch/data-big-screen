<template>
  <div class="order-trend">
    <fly-box>
      <template #fly-box-text>
        <div class="left-text">
          <div class="title-wrapper">
            <div class="title">实时订单趋势图</div>
            <div class="sub-title">Number Of Real-time Orders</div>
          </div>
          <div class="total">
            <vue-count-to 
              :startVal="0"
              :endVal="totalOrder"
              :autoplay="true"
              :duration="1000"
            />
          </div>
          <div class="rate">
            <div class="rate-text">周同比增长率</div>
            <div class="rate-num">
              <vue-count-to 
                :startVal="0"
                :endVal="rate"
                :decimals="2"
                :suffix="'%'"
              />
            </div>
          </div>
        </div>
        <div class="right-chart">
          <vue-echarts 
            :option="option"
          />
        </div>
      </template>
    </fly-box>
  </div>
</template>

<script>
import { ref, watch } from 'vue'
import FlyBox from './FlyBox.vue'
import VueCountTo from './vue-count-to/VueCountTo.vue'

export default {
  name: 'OrderTrend',
  components: { FlyBox, VueCountTo },
  props: {
    realData: {
      type: Number,
      required: true
    },
    orderUserTrend: {
      type: Array,
      required: true
    }
  },
  setup(props) {
    const totalOrder = ref(props.realData)
    const rate = ref(1);
    const option = ref({})

    function getNowTime() {
      const now = new Date()
      return `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`
    }

    const data = ref(props.orderUserTrend);
    const dateTime = ref([getNowTime()]);
    watch(() => props.realData, (newVal, oldVal) => {
      totalOrder.value = newVal + oldVal;
      rate.value = newVal / totalOrder.value;

      // 处理数据
      data.value.push(props.realData);
      dateTime.value = [...dateTime.value, getNowTime()];
      // console.log("dateTime", dateTime.value)

      option.value = {
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: dateTime.value,
          axisLine: {
            lineStyle: {
              color: 'rgba(200, 200, 200)'
            }
          },
          axisLabel: {
            fontSize: 16
          }
        },
        yAxis: {
          type: 'value',
          splitLine: {
            lineStyle: {
              color: 'rgb(50, 50, 50)'
            }
          },
          axisLine: {
            lineStyle: {
              color: 'rgba(200, 200, 200)'
            }
          },
          axisLabel: {
            fontSize: 16
          }
        },
        dataZoom: [
          {
            type: 'inside',
            start: 0,
            end: 100
          }, 
          {
            type: 'slider',
            start: 0,
            end: 100,
            // 两侧缩放手柄的 icon 形状
            handleIcon: 'M 0.0525 0.5656 L 0.0525 0 L -0.0583 0 L -0.0583 0.5656 L -0.2449 0.5656 L -0.2449 1.4344 L -0.0525 1.4344 L -0.0525 2 L 0.0525 2 L 0.0525 1.4344 L 0.2449 1.4344 L 0.2449 0.5656 L 0.0525 0.5656 Z M 0.1399 1.1953 L -0.1458 1.1953 L -0.1458 1.1137 L 0.1399 1.1137 L 0.1399 1.1953 Z M 0.1399 0.8863 L -0.1458 0.8863 L -0.1458 0.8047 L 0.1399 0.8047 L 0.1399 0.8863 Z',
            // 两侧缩放手柄的大小
            handleSize: '100%',
            // 两侧缩放手柄的样式配置。
            handleStyle: {
              color: '#a7b7cc'
            },
            // dataZoom 文字的颜色。
            textStyle: {
              color: 'rgb(200, 200, 200)'
            },
            // 选中范围的填充颜色。zoom的中间位置
            fillerColor: 'rgba(120,126,134,.3)',
            // 数据阴影的样式。
            dataBackground: {
              lineStyle: {
                color: 'grey'
              },
              areaStyle: {
                color: 'gray'
              }
            },
            borderColor: 'rgb(200, 200, 200)'
          }
        ],
        series: [
          {
            type: 'line',
            // 是否平滑曲线显示。
            smooth: true,
            symbol: 'none',
            // 折线图在数据量远大于像素点时候的降采样策略， 取过滤点的平均值
            sampling: 'average',
            itemStyle: {
              color: '#8bb81e'
            },
            data: data.value
          }
        ],
        grid: {
          top: 40,
          bottom: 80,
          right: 40,
          left: 80
        }
      }
    })

    return {
      totalOrder,
      rate,
      option
    }
  }
}
</script>

<style lang="scss" scoped>
  .order-trend {
    height: 100%;
    width: 100%;
    box-sizing: border-box;

    .left-text {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      flex: 0 0 320px;
      width: 320px;
      padding-left: 40px;

      .title-wrapper {
        
        .title {
          font-size: 32px;
        }

        .sub-title {
          font-size: 16px;
          letter-spacing: 1px;
          margin-top: 10px;
        }
      }

      .total {
        font-size: 68px;
        font-family: DIN;
        font-weight: bolder;
        letter-spacing: 2px;
        padding: 10px 0;
      }

      .rate {
        font-family: DIN;
        letter-spacing: 2px;

        .rate-text {
          font-size: 18px;
        }

        .rate-num {
          font-size: 28px;
          color: rgb(197, 251, 121);
          font-weight: bolder;
          margin-top: 10px;
        }
      }
    }

    .right-chart {
      flex: 1;
      width: 100%;
      height: 100%;
    }
  }
</style>