<template>
  <div class="auto-slide-list" :id="id">
    <div
      class="list-header-wripper"
      v-if="actualData.headerList?.length !== 0"
      :style="{
        backgroundColor: actualData.headerBGC,
        height: `${actualData.headerHeight}px`,
        lineHigeht: `${actualData.headerHeight}px`,
        fontSize: `${actualData.headerFontSize}px`,
      }"
    >
      <div
        class="header-item upper-section-text"
        v-for="(item, index) in headerData"
        :key="item + index"
        :style="{
          width: `${avgWidths[index]}px`,
          ...headerStyleData[index],
        }"
        v-html="item"
      ></div>
    </div>

    <div
      class="list-rows-wrapper"
      :style="{
        height: `${height - actualData.headerHeight}px`,
        overflow: 'hidden',
        ...actualData.listRowsWrapperStyle,
      }"
    >
      <div
        class="list-item upper-section-text"
        v-for="(item, index) in currentRowData"
        :key="item.rowIndex"
        :style="{
          background:
            item.rowIndex % 2 === 0
              ? actualData.rowBGC[0]
              : actualData.rowBGC[1],
          fontSize: `${actualData.rowFontSize}px`,
          height: `${rowHeight[index]}px`,
          lineHeight: `${rowHeight[index]}px`,
          ...actualData.listItemStyle
        }"
      >
        <div
          class="column-index"
          :style="{
            width: `${avgWidths[0]}px`,
            ...actualData.rowIndexStyle,
          }"
          v-if="actualData.headerIndex"
          v-html="item.data.columnIndex"
        ></div>

        <div
          class="shop-num"
          v-if="item.data.shop"
          :style="{
            width: actualData.headerIndex
              ? `${avgWidths[1]}px`
              : `${avgWidths[0]}px`,
            ...actualData.rowStyle[0],
          }"
        >
          {{ item.data.shop }}
        </div>
        <div
          class="city-order-num"
          v-if="item.data.order"
          :style="{
            width: actualData.headerIndex
              ? `${avgWidths[2]}px`
              : `${avgWidths[1]}px`,
            ...actualData.rowStyle[1],
          }"
        >
          {{ item.data.order }}
        </div>
        <div
          class="rider-num"
          v-if="item.data.rider || item.data.sales"
          :style="{
            width: actualData.headerIndex
              ? `${avgWidths[3]}px`
              : `${avgWidths[2]}px`,
            ...actualData.rowStyle[2],
          }"
        >
          {{ item.data.rider || item.data.sales }}
        </div>
        <div
          class="new-shop-num"
          v-if="item.data.newShop"
          :style="{
            width: actualData.headerIndex
              ? `${avgWidths[4]}px`
              : `${avgWidths[3]}px`,
            ...actualData.rowStyle[3],
          }"
        >
          {{ item.data.newShop }}
        </div>
        <div
          class="average-order-num"
          v-if="item.data.avgOrder"
          :style="{
            width: actualData.headerIndex
              ? `${avgWidths[5]}px`
              : `${avgWidths[4]}px`,
            ...actualData.rowStyle[4],
          }"
        >
          {{ item.data.avgOrder }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { v4 as uuidv4 } from "uuid";
import cloneDeep from "lodash/cloneDeep";
export default {
  name: "AutoSlideList",
  props: {
    /**
     *
     * dataList: rows数据
     * headerList: 标题数组
     * headerStyle: 标题杨树数组 [{}, {}]。标题每一项不同定制。
     * headerBGC: 标题背景
     * headerHeight: 标题的高度
     * headerIndex: 是否显示标题序号列
     * headerIndexContent: 序号列内容
     * headerIndexStyle: 序号列的样式
     * maxRow: 表示显示多少行
     * rowStyle: 每一行的样式.一个数组。对应的是每一列的样式。
     * rowIndexStyle: 序号项的样式
     * rowBGC: 每行的背景样式
     * headerFontSize: 标题字体的大小
     * rowFontSize: 内容字体的大小
     * moveNum: 一次移动多少行
     * duration: 动画执行时间
     * listRowsWrapperStyle: 内容整体样式
     * listItemStyle: 每行的样式
     */
    data: {
      type: Object,
      default() {
        // 注意：默认值哩不能指定类型，而且也不能定义default关键字
        return {};
      },
    },
  },
  setup(props) {
    const id = `auto-slide-list-${uuidv4()}`;
    const width = ref(0);
    const height = ref(0);
    const headerData = ref([]);
    const headerStyleData = ref([]);
    const defaultData = {
      headerList: [],
      headerBGC: "rgb(90,90,90)",
      headerHeight: 0,
      headerIndex: false,
      headerIndexContent: "",
      headerIndexStyle: {},
      headerStyle: [],
      dataList: [],
      maxRow: 0,
      rowStyle: [],
      rowIndexStyle: {},
      rowBGC: [],
      headerFontSize: "28",
      rowFontSize: "28",
      moveNum: 1,
      duration: 2000,
      listRowsWrapperStyle: {},
      listItemStyle: {}
    };
    // 处理后渲染的数据
    const actualData = ref({});
    // 计算平均标题项宽度
    const avgWidths = ref([]);
    // 处理排行数据
    const rowData = ref([]);
    // 处理行高
    const rowHeight = ref([]);
    // 当前页面展示的行数据
    const currentRowData = ref([]);
    // 当前动画行数
    const currentIndex = ref(0);
    // 内容行高
    let _avgHeight;
    // 开始动画
    // const isAnimationStart = ref(true)

    const handleHeaderList = (data) => {
      // 这里也是有值的----------------------------
      const _headerData = cloneDeep(data.headerList);
      const _headerStyle = cloneDeep(data.headerStyle);
      const _rowData = cloneDeep(data.dataList);
      rowData.value = _rowData
      // ------------这里也是有值的
      // console.log("_rowData", _rowData)
      if (!_headerData.length) {
        return;
      }
      // 处理序号列。
      if (data.headerIndex) {
        _headerData.unshift(data.headerIndexContent);
        _headerStyle.unshift(data.headerIndexStyle);
        // _rowData.forEach((item, index) => {
        //   item.columnIndex = index;
        // });
      }

      // 处理标题数组
      headerData.value = _headerData;
      // 处理标题项样式
      headerStyleData.value = _headerStyle;
      // 处理排行数据
      // rowData.value = _rowData.map((item, index) => {
      //   return {
      //     data: item,
      //     rowIndex: index,
      //   };
      // });
      // 这里就没有数据。

      // 动态处理标题项宽度
      let usedWidth = 0;
      // 传入样式中具有width属性的个数
      let usedWidthNum = 0;
      // 统计每列宽度
      const _avgWidths = [];
      _headerStyle.forEach((style, index) => {
        if (style.width) {
          usedWidth += +style?.width?.replace("px", "");
          usedWidthNum++;
          _avgWidths[index] = style.width.replace("px", "");
        }
      });

      // 计算为传入width的width值。
      // 默认计算的宽度
      const itemWidth =
        (width.value - usedWidth) / (_headerData.length - usedWidthNum);
      for (let i = 0; i < _headerData.length; i++) {
        if (!_avgWidths[i]) {
          _avgWidths[i] = itemWidth;
        }
      }
      // console.log("_avgWidths", width.value, usedWidth,usedWidthNum  ,_avgWidths)
      avgWidths.value = _avgWidths;
      // console.log("_avgWidths", _avgWidths)
    };

    // 处理行数据
    const handleRowList = (data) => {
      const rowContentHeight = height.value - data.headerHeight;
      const length = data.dataList.length;
      let _rowHeight;
      // 动态确定行高度
      if (data.maxRow > length) {
        // console.log("通过数据长度来计算")
        _avgHeight = rowContentHeight / length;
        _rowHeight = new Array(length).fill(_avgHeight);
        // console.log("==============", _rowHeight)
      } else {
        // console.log("通过传入的maxRow来计算")
        _avgHeight = rowContentHeight / data.maxRow;
        _rowHeight = new Array(length).fill(_avgHeight);
      }

      rowHeight.value = _rowHeight;
      // console.log("_rowHeight", _rowHeight)
    };

    const startAnimation = async () => {
      // if(!isAnimationStart.value) return
      const datalength = actualData.value.dataList.length;
      const maxRow = actualData.value.maxRow;
      const moveNum = actualData.value.moveNum;
      if (datalength < maxRow) return;
      const index = currentIndex.value;
      const _rowData = cloneDeep(rowData.value);
      // 剪贴当前活动行级以后的全部数据
      const _currentRowData = _rowData.slice(index);
      // 将剪贴剩余的行数插入到最后
      _currentRowData.push(..._rowData.slice(0, index));
      currentRowData.value = _currentRowData;

      // 先将所有行的高度还原
      rowHeight.value = new Array(datalength).fill(_avgHeight);
      // console.log("rowHeight===========start", rowHeight.value)
      const startTime = 300;
      // if(!isAnimationStart.value) return
      await new Promise((resolve) => {
        setTimeout(() => {
          resolve();
        }, startTime);
      });
      // 将moveNum的行高度置为0
      rowHeight.value.splice(0, moveNum, ...new Array(moveNum).fill(0));
      // console.log("rowHeight===========end", rowHeight.value)

      currentIndex.value += moveNum;

      // 确认动画是否到达最后一个元素
      const isLast = currentIndex.value - datalength;
      if (isLast >= 0) {
        // console.log('到达最后一个元素', isLast)
        // 表示到达最后一个元素, 重新赋值currentIndex
        currentIndex.value = isLast;
      }

      // if(!isAnimationStart.value) return
      await new Promise((resolve) => {
        setTimeout(() => {
          resolve();
        }, actualData.value.duration - startTime);
      });
      startAnimation();
    };

    // const stopAnimation =  () => {
    //   isAnimationStart.value = false
    // }

    const update = () => {
      // stopAnimation()
      // 合并默认的props和传入的props
      const _actualData = Object.assign(defaultData, props.data);
      // 处理标题数组
      handleHeaderList(_actualData);
      handleRowList(_actualData);
      // 防止多次渲染
      actualData.value = _actualData;
      console.log("==================", actualData.value.rowStyle)
      // 开始动画
      // isAnimationStart.value = true
      startAnimation();
    }

    onMounted(() => {
      const dom = document.getElementById(id);
      width.value = dom.clientWidth;
      height.value = dom.clientHeight;
      update()
    });

    // watch(() => props.data, () => {
    //   update()
    // })
    return {
      id,
      headerData,
      headerStyleData,
      actualData,
      avgWidths,
      rowHeight,
      currentRowData,
      height,
    };
  },
};
</script>

<style lang="scss" scoped>
.auto-slide-list {
  width: 100%;
  height: 100%;

  // 文字标题过长, 解决内容行内容溢出。
  .upper-section-text {
    // padding: 0 10px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    box-sizing: border-box;
  }

  .list-header-wripper {
    box-sizing: border-box;
    width: 100%;
    background: rgb(90, 90, 90);
    display: flex;
    flex-direction: row;
    align-items: center;

    .header-item {
      font-family: DIN;
      text-align: center;
    }
  }

  .list-rows-wrapper {
    width: 100%;

    .list-item {
      box-sizing: border-box;
      display: flex;
      align-items: center;
      transition: all 0.3s linear;
      .column-index,
      .city-order-num,
      .shop-num,
      .rider-num,
      .new-shop-num,
      .average-order-num {
        text-align: center;
      }
    }
  }
}
</style>
