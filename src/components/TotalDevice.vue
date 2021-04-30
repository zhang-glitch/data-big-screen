<template>
  <div class="total-device">
    <div id="device-chart"></div>
    <div class="right-detail">
      <div class="top">
        <div class="device-title">
          <div class="title">臻尚登录设备</div>
          <div class="sub-title">Distribution of Internet devices</div>
        </div>
        <div class="device-number">
          <vue-count-to 
            :startVal="0"
            :endVal="totalDeciveNum"
            :duration="1000"
          />
          <span class="tai">台</span>
        </div>
      </div>
      <div class="bottom">
        <div class="device-item" v-for="item in bottomData" :key="item?.key">
          <div class="device-num">
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
  </div>
</template>

<script>
import { onMounted, onUnmounted, ref } from 'vue'
import VueCountTo from './vue-count-to/VueCountTo.vue'
import chartContainer from '../util/chartContainer'

const color = ['rgb(116,166,49)', 'rgb(190,245,99)', 'rgb(202,252,137)'];

export default {
  name: 'total-device',
  components: {
    VueCountTo
  },
  props: {
    bottomData: {
      type: Array,
      required: true
    },
    totalDeciveNum: {
      type: [Number, String],
      required: true
    }
  },
  setup(props) {

    let chartId = null;
    const option = ref(null);
    const data = []
    props.bottomData.forEach((item) => {
      item.name = item.key
      data.push(item)
    })
    onMounted(() => {
      chartId = document.getElementById("device-chart");
      option.value = {
        color,
        series: [{
          type: "pie",
          data,
          radius: '70%',
          selectedMode: 'multiple',
          selectedOffset: 10,
          clockwise: true,
          center: ['50%', '50%'],
          label: {
            color: '#ffffff',
            position: 'inside',
            fontSize: 20,
            fontFamily: 'DIN'
          },
          labelLine: {
            show: false
          },
          itemStyle: {
              shadowBlur: 2000,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }]
      }
      chartContainer(chartId, option.value)
    })

    onUnmounted(() => {
      chartId = null;
    })
  }
}

</script>

<style lang="scss" scoped>
  .total-device {
    display: flex;
    width: 100%;
    height: 100%;
    background: rgb(43, 44, 46);

    #device-chart {
      width: 30%;
      height: 100%;
    }

    .right-detail {
      flex: 1px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 40px 10px 40px 0;

      .top {
        display: flex;
        .device-title {
          .title {
            font-size: 32px;
          }

          .sub-title {
            font-size: 16px;
            margin-top: 10px;
          }
        }

        .device-number {
          flex: 1;
          margin-left: 40px;
          font-weight: bold;
          font-size: 56px;

          .tai {
            font-size: 20px
          }
        }
      }

      .bottom {
        display: flex;
        justify-content: space-around;
        align-items: center;
        margin-top: 5px;

        .device-item {
          font-weight: bolder;
          .device-num {
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
  }
</style>