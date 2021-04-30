<template>
  <div class="area-rank">
    <div class="title">地区商家销售排行</div>
    <div class="heat-city">
      <div class="city-item" v-for="(item, index) in heatCity" :key="index">
        <div class="city-title">{{item.city}}</div>
        <div class="separator-wrapper">
          <div class="chunk"></div>
        </div>
        <div class="chart-wrapper">
          <vue-echarts :option="item.option" />
          <div class="city-img">
            <img :src="item.img" :alt="item.city">
          </div>
          <div class="rate-chart"></div>
        </div>
        <div class="category-wrapper">
          <city-category 
            :data="['商家', '订单数', '销售额']"
            :color="['rgb(178, 209, 126)', 'rgb(116, 166, 49)']"
            :height="28"
          />
        </div>
        <div class="list">
          <auto-slide-list 
          
            style="width:100%;height:190px;background:rgb(40,40,40);"
            :data="data"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { watch , ref} from 'vue';
import CityCategory from './CityCategory.vue';
import AutoSlideList from './AutoSlideList.vue';
const imgs = [
  'https://img.alicdn.com/tfs/TB1Z171qebviK0jSZFNXXaApXXa-30-29.png',
  'https://img.alicdn.com/tfs/TB1b8Tzq7T2gK0jSZFkXXcIQFXa-28-24.png',
  'https://img.alicdn.com/tfs/TB12MbzqYY1gK0jSZTEXXXDQVXa-28-30.png'
]

const getOption = (item) => {
  const rate = item.rate.substr(1, item.rate.length - 2);
  return {
  // 调色盘颜色列表。前者填充颜色，后者背景颜色
    color: ['rgb(210, 244, 148)', 'rgb(79, 79, 79)'],
    grid: {
      left: 0,
      top: 0,
      right: 0,
      bottom: 0
    },
    title: {
      text: `${rate}%`,
      left: 'center',
      top: '65%',
      textStyle: {
        color: 'rgb(210, 244, 148)',
        fontSize: 18,
        // 水平对齐方式
        align: 'center'
      }
    },
    series: [
      {
        type: 'pie',
        // 饼图的半径。第一项：内半径，第二项：外半径。
        radius: ['70%', '90%'],
        avoidLabelOverlap: true,
        label: {
          normal: {
            show: false,
            position: 'center'
          }
        },
        labelLine: {
          normal: {
            show: false
          }
        },
        data: [
          {
            value: +rate,
            name: '活跃用户'
          },
          {
            value: 100 - (+rate),
            name: '非活跃用户'
          }
        ]
      }
    ]
  }
}

export default {
  components: { CityCategory, AutoSlideList },
  name: 'AreaRank',
  props: {
    areaTop: {
      type: Array,
      required: true
    }
  },
  setup(props) {
    // 筛选城市
    // 第一次数据处理
    const firstCity = props.areaTop.slice(0, 3) 
    const data = ref({})
    firstCity.forEach((item, index) => {
      item.img = imgs[index]
      // 处理饼图数据
      item.option = getOption(item)

      // 根据对应城市来获取商品列表
      data.value = {
        maxRow: 3,
        rowStyle: [
          {
            color: "#fff",
            width: '33.33%'
          },
          {
            color: '#fff',
            width: '33.33%'
          }, 
          {
            color: 'rgb(178,209,126)',
            width: '33.33%'
          }
        ],
        listItemStyle: {
          display: 'flex',
        },
        rowBGC: ['rgb(40, 40, 40)', 'rgb(55, 55, 55)'],
        rowFontSize: '14',
        listRowsWrapperStyle: {
          marginTop: 0,
          marginLeft: 0
        },
        dataList: item.shop.map((item, index) => {
          return {
            data: item,
            rowIndex: index,
          };
        })
      }
    })
    const heatCity = ref(firstCity);
    
    
    watch(() => props.areaTop, (newVal) => {
      let index = parseInt(Math.random() * (newVal.length - 1));  // 0 - 22
      let startIndex = 0;
      let endIndex = 0;
      // const dataList = [];
      
      // index如果是0， 1， 2的话，它将取正。
      if(index - 3 < 0) {
        startIndex = index;
        endIndex = index + 3;
      } else {
        startIndex = index - 3;
        endIndex = index
      }
      heatCity.value = newVal.slice(startIndex, endIndex);
      heatCity.value.forEach((item, index) => {
        item.img = imgs[index]
        // 处理饼图数据
        item.option = getOption(item)
        // 处理商品排列数据
        data.value = {
          maxRow: 3,
          rowStyle: [
            {
              color: "#fff",
              width: '33.33%'
            },
            {
              color: '#fff',
              width: '33.33%'
            }, 
            {
              color: 'rgb(178,209,126)',
              width: '33.33%'
            }
          ],
          listItemStyle: {
            display: 'flex',
            width: '100%'
            // justifyContent: 'space-evently'
          },
          rowBGC: ['rgb(40, 40, 40)', 'rgb(55, 55, 55)'],
          rowFontSize: '14',
          dataList: item.shop.map((item, index) => {
            return {
              data: item,
              rowIndex: index,
            };
          })
        }
      });

      // console.log("牌力数据城市", heatCity.value, index)
    })
    
    
    return {
      heatCity,
      data
    }
  }
}
</script>

<style lang="scss" scoped>
  .area-rank {
    width: 100%;
    height: 100%;
    background: rgb(55, 55, 55);
    padding: 20px 40px;
    box-sizing: border-box;

    .title {
      font-size: 36px;
      margin-left: 20px;
      padding: 20px 40px 0;
      box-sizing: border-box;
    }

    .heat-city {
      box-sizing: border-box;
      background: rgb(40, 40, 40);
      height: 880px;
      width: 100%;
      padding: 10px 0;
      margin-top: 20px;
      display: flex;

      .city-item {
        flex: 0 0 33.33%;
        width: 33.33%;
        height: 100%;
        padding: 0 10px;
        box-sizing: border-box;

        .city-title {
          font-size: 24px;
          padding: 10px 20px;
          box-sizing: border-box;
        }

        .separator-wrapper {
          position: relative;
          height: 30px;
          background: #5d5d5d;

          .chunk {
            position: absolute;
            top: 5px;
            right: 10px;
            bottom: 5px;
            background: rgb(40, 40, 40);
            width: 20px;
            height: 20px;
          }
        }

        .chart-wrapper {
          position: relative;
          width: 100%;
          height: 200px;
          margin-top: 20px;

          .city-img {
            position: absolute;
            top: 0;
            left: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            height: 100%;

            img {
              width: 42px;
              height: 42px;
              // margin-top: 60px;
            }
          }
        }

        .category-wrapper {
          margin-top: 20px;
        }

        .list {
          box-sizing: border-box;
          background: rgb(40, 40, 40);
          width: 100%;
          height: 190px;
          margin-top: 10px;
        }
      }
    }
  }
</style>