<template>
  <div class="city-category">
    <!-- 
      :class='{ "hovered": mouseIndex === index, "selected": actionIndex === index  }' -->
    <div 
      class="city-item" 
      v-for="(item, index) in data" 
      :key="index" 
      @click="changeIndex(index)"
      @mouseenter="mouseIn(index)"
      @mouseleave="mouseOut"
      :style="{lineHeight: `${height}px`}"
    >
    
      <div
        class="selected"
        v-if="index === actionIndex"
        :style="{background: color[0]}"
      >
        {{item}}
      </div>
      <div
        class="hovered"
        v-else-if="index === mouseIndex"
        :style="{background: color[1]}"
      >
        {{item}}
      </div>
      <div v-else>{{item}}</div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue';
export default {
  name: 'CityCategory',
  props: {
    data: {
      type: Array,
      required: true
    },
    color: {
      type: Array,
      default() {
          return ['rgb(140, 160, 173)', 'rgb(80, 80, 80)']
        }
    },
    height: {
      type: [Number, String],
      default: 48
    }
  },
  setup(props) {

    const actionIndex = ref(0);
    const mouseIndex = ref(-1);
    const timer = ref(null);

    // 点击
    const changeIndex = (val) => {
      actionIndex.value = val;
    }

    // 移入
    const mouseIn = (val) => {
      mouseIndex.value = val;
    }

    // 移出
    const mouseOut = () => {
      mouseIndex.value = -1;
    }

    onMounted(() => {
      timer.value = setInterval(() => {
        actionIndex.value++;
        if(actionIndex.value === props.data.length) {
          actionIndex.value = 0;
        }
      }, 2000)
    })
    return {
      actionIndex,
      changeIndex,
      mouseIn,
      mouseIndex,
      mouseOut
    }
  }
}
</script>

<style lang="scss" scoped>
  .city-category {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 100%;
    box-sizing: border-box;

    .city-item {
      flex: 1;
      text-align: center;
      background: rgb(53, 57, 65);
      font-size: 24px;
      color: rgb(144, 160, 174);
    }

    .hovered {
      background: rgb(80, 80, 80);
      color: #fff;
    }

    .selected {
      background: rgb(140, 160, 173);
      color: #fff;
    }
  }
</style>