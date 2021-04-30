<template>
  <div class="area-list">
    <div class="title">区域销售大盘环比分析</div>
    <div class="area">
      <auto-slide-list 
        :data="data"
      />
    </div>
  </div>
</template>

<script>
import { ref, watch } from 'vue'
import AutoSlideList from './AutoSlideList.vue'
export default {
  name: 'AreaList',
  components: {
    AutoSlideList 
  },
  props: {
    areaSales: {
      type: Array,
      required: true
    }
  },
  setup(props) {
    const addColumnIndex = (data) => {
      for(let i = 0; i < data.length; i++) {
        if (i % 2 === 0) {
          data[i].columnIndex = `<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;">
          <div style="width:15px;height:15px;background:rgb(72,122,72);border-radius:50%;border:1px solid #fff;"/>
        </div>`
        } else {
          data[i].columnIndex = `<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;">
          <div style="width:15px;height:15px;background:rgb(38,88,104);border-radius:50%;border:1px solid #fff;"/>
        </div>`
        }
      }
    }
    addColumnIndex(props.areaSales)
    const data = ref({
      headerList: ['城市订单量', '店铺数量', '接单人数', '新店铺数量', '人均订单量'],
      headerBGC: 'rgb(90,90,90)',
      headerHeight: 35,
      headerIndex: true,
      headerIndexContent: '',
      headerIndexStyle: {
        color: "black",
        width: '40px'
      },
      maxRow: 10,
      rowStyle: [
        {
          color: "#fff"
        },
        {
          color: 'rgb(178,209,126)'
        }, 
        {
          color: '#fff'
        }, 
        {
          color: 'rgb(178,209,126)'
        }, 
      ],
      rowBGC: ['rgb(40, 40, 40)', 'rgb(55, 55, 55)'], 
      headerFontSize: '18',
      rowFontSize: '14',
      listRowsWrapperStyle: {
        marginTop: '20px',
        marginRight: '20px'
      },
      dataList: props.areaSales.map((item, index) => {
        return {
          data: item,
          rowIndex: index,
        };
      })
    });
    watch(() => props.areaSales, () => {
      addColumnIndex(props.areaSales)
      data.value = {      
        headerList: ['城市订单量', '店铺数量', '接单人数', '新店铺数量', '人均订单量'],
        headerBGC: 'rgb(90,90,90)',
        headerHeight: 35,
        headerIndex: true,
        headerIndexContent: '',
        headerIndexStyle: {
          color: "black",
          width: '40px'
        },
        rowStyle: [
          {
            color: "#fff"
          },
          {
            color: 'rgb(178,209,126)'
          }, 
          {
            color: '#fff'
          }, 
          {
            color: 'rgb(178,209,126)'
          }, 
        ],
        maxRow: 10,
        rowBGC: ['rgb(40, 40, 40)', 'rgb(55, 55, 55)'], 
        headerFontSize: '18',
        rowFontSize: '14',
        dataList: props.areaSales.map((item, index) => {
          return {
            data: item,
            rowIndex: index,
          };
        })
      }
    })
    return {
      data
    }
  } 
} 
</script>

<style lang="scss" scoped>
  .area-list {
    width: 100%;
    height: 100%;
    background: rgb(55, 55, 55);
    padding: 20px 0  20px 40px;
    box-sizing: border-box;

    .title {
      font-size: 36px;
      margin-left: 20px;
    }

    .area {
      box-sizing: border-box;
      background: rgb(40, 40, 40);
      height: 880px;
      width: 100%;
      padding: 30px 0;
      margin-top: 20px;
    }
  }
</style>