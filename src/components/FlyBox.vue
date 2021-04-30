<template>
  <div class="fly-box">
    <svg class="fly-box-svg" ref="svgDom" :height="height" :width="width">
      <defs>
        <path
          :id="pathId"
          :d="path"
          fill="none"></path>
        <radialGradient
          :id="gradientId"
          cx="50%"
          cy="50%"
          fx="100%"
          fy="50%"
          r="50%"
        >
          <stop
            offset="0%"
            stop-color="#fff"
            stop-opacity="1"
          />
          <stop
            offset="100%"
            stop-color="#fff"
            stop-opacity="0"
          />
        </radialGradient>
        <mask :id="maskId">
          <circle cx="0" cy="0" :r="animationLength" :fill="`url(#${gradientId})`">
            <animateMotion
              :dur="`${duration}s`"
              :path="path"
              rotate="auto"
              repeatCount="indefinite"
            />
          </circle>
        </mask>
      </defs>

      <use
        :href="`#${pathId}`"
          stroke-width="1"
          :stroke="borderColor"
      ></use>
      <use
        :href="`#${pathId}`"
          stroke-width="3"
          :stroke="animationColor"
          :mask="`url(#${maskId})`"
      ></use>
    </svg>
    <div class="fly-box-text">
      <slot name="fly-box-text"></slot>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, ref } from 'vue'
import { v4 as uuidv4 } from 'uuid';
export default {
  name: 'FlyBox',
  props: {
    borderColor: {
      type: String,
      default: '#235fa7'
    },
    animationColor: {
      type: String,
      default: '#4fd2dd'
    },
    animationLength: {
      type: Number,
      default: 150
    },
    duration: {
      type: [String, Number],
      default: '3'
    }
  },
  setup() {
    const svgDom = ref(null);
    const width = ref(0);
    const height = ref(0);
    const uid = uuidv4()
    const pathId = ref(`fly-box-path-${uid}`);
    const gradientId = ref(`fly-box-gradient-${uid}`);
    const maskId = ref(`fly-box-mask-${uid}`);
    onMounted(() => {
      if(svgDom.value) {
        width.value = svgDom.value.clientWidth;
        height.value = svgDom.value.clientHeight;
      }
      // console.log(width.value, height.value)
    }) 

    const path = computed(() => `M5, 5 L${width.value - 5}, 5 L${width.value - 5}, ${height.value - 5} L5, ${height.value - 5} L5, 5`)
    return {
      svgDom,
      width,
      height,
      path,
      pathId,
      gradientId,
      maskId
    }
  }
}
</script>

<style lang="scss" scoped>
  .fly-box {
    position: relative;
    width: 100%;
    height: 100%;

    .fly-box-svg {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }

    .fly-box-text {
      box-sizing: border-box;
      position: absolute;
      padding: 30px 0 ;
      display: flex;
      width: 100%;
      height: 100%;
    }
  }
</style>