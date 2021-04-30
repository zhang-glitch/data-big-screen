<template>
  <div class="home">
    <div class="loading" v-if="ready">
      <loading :width="100" :height="100">
        <template #loading-text>
          数据大屏展示中...
        </template>
      </loading>
    </div>
    <div class="container"  v-else>
      <container :options="{width: 3840, height: 2160}">
        <template #ready>
          <div class="header">
            <top-header></top-header>
          </div>
          <div class="separator">
            <separator />
          </div>
          <div class="center">
            <div class="left">
              <div class="left1">
                <total-user
                  :user-total="screenDate?.userToday"
                  :user-growth-last-day="+screenDate?.userGrowthLastDay"
                  :user-growth-last-month="+screenDate?.userGrowthLastMonth"
                />
              </div>
              <div class="left2">
                <average-age 
                  :averageAge="+screenDate?.averageAge"
                  :centerData="screenDate?.age"
                />
              </div>
              <div class="left3">
                <total-device 
                  :bottomData="screenDate?.devices"
                  :totalDeciveNum="screenDate?.totalDevices"
                />
              </div>
              <div class="left4">
                <total-gender 
                  :gender="screenDate.gender"
                />
              </div>
              <div class="left5">
                <line-chart 
                  :rider="screenDate.rider"
                />
              </div>
              <div class="left6">
                <bar-chart 
                  :category="screenDate.category"
                />
              </div>
            </div>
            <div class="right">
              <div class="right-top1">
                <user-header 
                  :data="headerData"
                />
              </div>
              <div class="right-top2">
                <city-category 
                  :data="['ALL', '北京', '上海', '深圳', '杭州', '南京', '武汉']"
                />
              </div>
              <div class="right-bottom">
                <div class="right-left">
                  <div class="right-left1">
                    <map-chart 
                      :data="screenMap"
                    />
                  </div>
                  <div class="right-left2">
                    <city-category 
                      :data="['订单量', '销售额', '用户数', '退单量']"
                      :color="['rgb(178, 209, 126)', 'rgb(116, 166, 49)']"
                      :height="80"
                    />
                  </div>
                  <div class="right-left3">
                    <order-trend 
                      :realData="screenDate.realTimeOrder"
                      :orderUserTrend="screenDate.orderUserTrend"
                    />
                  </div>
                  <div class="right-left4">
                    <schedule-view />
                  </div>
                </div>
                <div class="right-right">
                  <div class="right-right1">
                    <area-list 
                      :areaSales="screenDate.areaSales"
                    />
                  </div>
                  <div class="right-right2">
                    <area-rank 
                      :areaTop="screenDate.areaTop"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>
      </container>
    </div>
  </div>
</template>

<script>
import { onMounted, onUnmounted, ref } from 'vue'
import Container from '../components/Container.vue'
import Loading from '../components/Loading.vue'
import TopHeader from '../components/TopHeader.vue'
import Separator from '../components/Separator.vue'
import api from '../http/api.js'
import TotalUser from '../components/TotalUser.vue'
import AverageAge from '../components/AverageAge.vue'
import TotalDevice from '../components/TotalDevice.vue'
import TotalGender from '../components/TotalGender.vue'
import LineChart from '../components/LineChart.vue'
import BarChart from '../components/BarChart.vue'
import UserHeader from '../components/UserHeader.vue'
import CityCategory from '../components/CityCategory.vue'
import MapChart from '../components/MapChart.vue'
import OrderTrend from '../components/OrderTrend.vue'
import ScheduleView from '../components/ScheduleView.vue'
import AreaList from '../components/AreaList.vue'
import AreaRank from '../components/AreaRank.vue'
export default {
  name: 'home',
  components: {
    Container,
    Loading,
    TopHeader,
    Separator,
    TotalUser,
    AverageAge,
    TotalDevice,
    TotalGender,
    LineChart,
    BarChart,
    UserHeader,
    CityCategory,
    MapChart,
    OrderTrend,
    ScheduleView,
    AreaList,
    AreaRank
  },
  setup(){
    const ready = ref(true);
    const screenDate = ref(null);
    const screenMap = ref(null);
    const {getScreenDate, getScreenMap} = api;
    const timer = ref(null)
    // 第一次发送请求
    const once = ref(true)
    // 用户头部数据
    const headerData = ref(null)
    
    const color = ['rgb(116,166,49)', 'rgb(190,245,99)', 'rgb(202,252,137)', 'rgb(251,253,142)']
    // 平均年龄
    // const ageData = ref([])

    // 数据请求
    async function getData() {
      screenDate.value = await getScreenDate();
      screenMap.value = await getScreenMap();

      // 处理年龄数据
      screenDate.value.age.forEach((item, index) => {
        item.color = color[index]
      })

      // 处理设备数据
      screenDate.value.devices.forEach((item, index) => {
        item.color = color[index]
      })
      
      // 处理用户头部数据
      headerData.value = {
        covertRate: screenDate.value.covertRate,
        returnRate: screenDate.value.returnRate,
        salesToday: screenDate.value.salesToday,
        orderToday: screenDate.value.orderToday,
        orderUser: screenDate.value.orderUser,
        userToday: screenDate.value.userToday
      }
      if(once.value) {
        // console.log("scrren", screenDate.value, screenMap.value)
      }
    }
    onMounted(async () => {
        await getData()
        ready.value = false;
        once.value = false;
        if(!once.value) {
          timer.value = setInterval(async () => {
            getData()
          }, 5000)
        }

        // 处理年龄数据

    })

    onUnmounted(() => {
      clearInterval(timer.value)
    })



    return {
      ready,
      screenDate,
      screenMap,
      headerData
      // ageData
    }
  }
}
</script>
    

<style lang="scss" scoped>
  .home {
    width: 100%;
    height: 100%;
    background: rgb(29, 29, 29);
    color: #fff;
    font-size: 48px;

    .loading {
      width: 100%;
      height: 100%;
      background: #241f20;
    }

    .container {
      display: flex;
      flex-direction: column;
      .header {
        height: 167px;
        margin-top: 10px;
      }
      .separator {
        height: 10px;
      }
      .center {
        flex: 1;
        display: flex;
        .left {
          // 这里表示什么意思
          flex: 0 0 860px;
          display: flex;
          flex-direction: column;
          width: 860px;
          height: 100%;
          margin: 0 10px;
          box-sizing: border-box;
          background: rgb(60, 61, 64);

          .left1, .left2, .left3, .left4, .left5, .left6 {
            padding-bottom: 20px;
          }

          .left1 {
            height: 300px;
          }

          .left2 {
            height: 320px;
          }

          .left3 {
            height: 280px;
          }

          .left4 {
            height: 230px;
          }

          .left5 {
            height: 360px;
          }

          .left6 {
            height: 360px;
          }
        }

        .right {
          flex: 1;
          display: flex;
          flex-direction: column;
          height: 100%;
          margin: 0 10px;
          // 这里是为什么
          max-width: 2960px;
          overflow: hidden;

          .right-top1 {
            height: 206px;
            margin-bottom: 20px;
          }

          .right-top2 {
            height: 48px;
            margin-bottom: 20px;
          }

          .right-bottom {
            flex: 1;
            display: flex;

            .right-left {
              display: flex;
              flex-direction: column;
              width: 1917px;

              .right-left1 {
                height: 999px;
              }

              .right-left2 {
                height: 80px;
                padding-top: 20px;
                box-sizing: border-box;
              }

              .right-left3 {
                height: 350px;
                margin-top: 10px;

                // .dv-border-box-8 {
                //   width: 100%;
                //   height: 100%;
                //   padding: 5px;
                //   box-sizing: border-box;
                //   background: rgb(66, 68, 70);
                //   border-radius: 10px;
                //   box-shadow: 10px 10px 10px rgba(0, 0, 0, .3);
                // }
              }

              .right-left4 {
                height: 220px;
                margin-top: 10px;
              }
            }

            .right-right {
              flex: 1;
              display: flex;
              flex-direction: column;
              margin-left: 10px;

              .right-right1 {
                width: 100%;
                height: 999px;
                padding-right: 10px;
                box-sizing: border-box;
              }

              .right-right2 {
                width: 100%;
                height: 650px;
                margin-top: 20px;
              }
            }
          }
        }
      }
    }

    
  }
</style>