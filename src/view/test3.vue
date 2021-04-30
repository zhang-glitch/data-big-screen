<template>
  <div class="test3">
    <vue-echarts 
      :option="option"
    />
  </div>
</template>

<script>
import {  ref, getCurrentInstance, onMounted, onUnmounted } from 'vue'
import cloneDeep from 'lodash/cloneDeep'
export default {
  name: 'test3',
  setup() {
    const option = ref({});
    // let timer = null;
    let timer = null;
    // getCurrentInstance只能在setup中使用
    const echarts = getCurrentInstance().ctx.$root.echarts;
    const update = () => {
        fetch("http://www.youbaobao.xyz/datav-res/datav/jiangsuMapData.json").then(res => res.json()).then(data => {
        // console.log(data);
        const center = [];
        data.features.forEach((item) => {
          // console.log(center, item)
          center.push({
            key: item.properties.name,
            value: item.properties.center
          })
        })
        console.log(center)
        // console.log(center)
        // 注册地图类型
        echarts.registerMap('js', data)
        option.value = {
          visualMap: {
            show: true,
            max: 100,
            seriesIndex: [0],
            inRange: {
              color: ['#A5DCF4', '#006edd']
            }
          },
          // geo 地理坐标系组件。
          geo: [{
            map: 'js',// 地推类型
            roam: false, //是否允许缩放和平移
            zoom: 1.1, //默认显示级别
            scaleLimit: {
              min: 0,
              max: 3
            }, //缩放级别
            // 修改文字相关的内容
            // label: {
            //   show: true,
            //   position: 'right',
            //   // offset: [30, 40], // 文字右移30， 上移40
            //   textShadowColor: "green",
            //   textShadowBlur: 20
            // },
            itemStyle: {
              normal: {
                areaColor: 'skyblue',
                shadowColor: '#013C62',
                shadowBlur: 20,
                shadowOffsetX: -5,// 右方式正的x
                shadowOffsetY: 15// 下方是正的y
              }
            },
            tooltip: {
              show: true
            }
          }],
          series: [
            {
              type: 'map',
              mapType: 'js',
              zoom: 1.1,
              roam: false,
              label: {
                show: true,
                color: '#000'
              },
              itemStyle: {
                areaColor: '#effe20'
              },
              // 这里的data需要和visualMap联动
              data: center.map((item) => {
                // const key = Object.keys(item)[0]
                const value = Math.random() * 100
                
                // console.log(key, value)
                return {
                  name: item.key,
                  value 
                }
              })
            },
            {
              type: 'effectScatter',
              // 他参考的是geo属性，所以必须要有geo属性。
              coordinateSystem: 'geo',
              z: 5,
              data: [],
              symbolSize: 14,
              label: {
                normal: {
                  show: true,
                  formatter: function (params) {
                  // 字符串内部不能出现空格
                    return '{fline|地点：' + params.data.city + '}\n{tline|' + (params.data.info || '发生xx集件') + '}'
                  },
                  position: 'top',
                // 文字盒子的背景颜色
                  backgroundColor: 'rgba(254,174,33,.8)',
                  padding: [0, 0],
                  borderRadius: 3,
                  lineHeight: 32,
                  color: '#f7fafb',
                // 富文本标记。即使扩展formatter内容的样式
                  rich: {
                    fline: {
                      padding: [0, 10, 10, 10],
                      color: '#fff'
                    },
                    tline: {
                      padding: [10, 10, 0, 10],
                      color: '#fff'
                    }
                  }
                },
                emphasis: {
                  show: true
                }
              },
              itemStyle: {
                color: '#feae21'
              }
            },
            {
              type: 'effectScatter',
              coordinateSystem: 'geo',
              z: 5,
              data: [],
              symbolSize: 14,
              label: {
                normal: {
                  show: true,
                  formatter: function (params) {
                    return '{fline|地点：' + params.data.city + '}\n{tline|' + (params.data.info || '发生xx集件') + '}'
                  },
                  position: 'top',
                  backgroundColor: 'rgba(233,63,66,.9)',
                  padding: [0, 0],
                  borderRadius: 3,
                  lineHeight: 32,
                  color: '#ffffff',
                  rich: {
                    fline: {
                      padding: [0, 10, 10, 10],
                      color: '#ffffff'
                    },
                    tline: {
                      padding: [10, 10, 0, 10],
                      color: '#ffffff'
                    }
                  }
                },
                emphasis: {
                  show: true
                }
              },
              itemStyle: {
                color: '#e93f42'
              }
            },
            {
              type: 'effectScatter',
              coordinateSystem: 'geo',
              z: 5,
              data: [],
              symbolSize: 14,
              label: {
                normal: {
                  show: true,
                  formatter: function (params) {
                    return '{fline|地点：' + params.data.city + '}\n{tline|' + (params.data.info || '发生xx集件') + '}'
                  },
                  position: 'top',
                  backgroundColor: 'rgba(8,186,236,.9)',
                  padding: [0, 0],
                  borderRadius: 3,
                  lineHeight: 32,
                  color: '#ffffff',
                  rich: {
                    fline: {
                      padding: [0, 10, 10, 10],
                      color: '#ffffff'
                    },
                    tline: {
                      padding: [10, 10, 0, 10],
                      color: '#ffffff'
                    }
                  }
                },
                emphasis: {
                  show: true
                }
              },
              itemStyle: {
                color: '#08baec'
              }
            }
          ]
        }
        timer = setInterval(() => {
          const _option = cloneDeep(option.value);
          // 清空effectScatter中的data数据
          for(let i = 1; i < 4; i++) {
            _option.series[i].data = [];
          }

          const cityLength = center.length;
          // 随机城市下标
          const cityIndex = Math.floor(Math.random() * cityLength);
          // 随机危险级数
          const riskIndex = Math.floor(Math.random() * 3) + 1; // 0-4
          // console.log("ddddddddddddd===============", cityIndex, riskIndex)
          
          _option.series[riskIndex].data = {
            city: center[cityIndex].key,
            value: center[cityIndex].value
          }
          option.value = _option
        }, 2000)
      })
    }
  onMounted(update)

  onUnmounted(() => {
    timer && clearInterval(timer)
  })

    return {
      option
    }
  }
}
</script>

<style lang="scss" scoped>
  .test3 {
    width: 100%;
    height: 100%;

    #map-chart {
      width: 100%;
      height: 100%;
    }
  }
</style>