<template>
  <div class="test" style="width: 800px; height: 400px;">
    <auto-slide-list 
      :data="data"
    />
  </div>
</template>

<script>
import { ref } from 'vue'
import AutoSlideList from '../components/AutoSlideList.vue'
export default {
  name: 'test',
  components: {
    AutoSlideList
  },
  setup() {
    const data = ref({});
    data.value = {
      headerList: ['城市订单量', '店铺数量', '接单人数', '新店铺数量', '人均订单量'],
      // headerBGC: 'rgb(90,90,90)',
      // headerHeight: '100',
      headerIndex: true,
      headerIndexContent: '#',
      headerIndexStyle: {
        color: "black",
        width: '50px'
      },
      maxRow: 5,
      rowStyle: [
        {
          color: 'skyblue',
          // background: '#fff'
        }
      ],
      rowIndexStyle: {
        color: 'blue'
      },
      rowBGC: ['rgb(40, 40, 40)', 'rgb(55, 55, 55)'], 
      headerFontSize: 18,
      rowFontSize: 16,
      headerStyle: [
        {
          color: 'red',
          width: "100px"
        },
        {
          color: 'blue'
        },
        {
          color: 'green'
        },
        {
          color: 'skyblue'
        },
        {
          color: 'purple'
        },
      ],
      dataList: [
        {
          order: '20%',
          shop: '11%',
          rider: "22%",
          newShop: '33%',
          avgOrder: '44%'
        },
        {
          order: '20%',
          shop: '11%',
          rider: "22%",
          newShop: '33%',
          avgOrder: '44%'
        },
        {
          order: '20%',
          shop: '11%',
          rider: "22%",
          newShop: '33%',
          avgOrder: '44%'
        },
        {
          order: '20%',
          shop: '11%',
          rider: "22%",
          newShop: '33%',
          avgOrder: '44%'
        },
        {
          order: '20%',
          shop: '11%',
          rider: "22%",
          newShop: '33%',
          avgOrder: '44%'
        },
        {
          order: '20%',
          shop: '11%',
          rider: "22%",
          newShop: '33%',
          avgOrder: '44%'
        },
        {
          order: '20%',
          shop: '11%',
          rider: "22%",
          newShop: '33%',
          avgOrder: '44%'
        },
        {
          order: '20%',
          shop: '11%',
          rider: "22%",
          newShop: '33%',
          avgOrder: '44%'
        },
      ]
    }
    return {
      data
    }
  }
}
</script>

<style>

</style>