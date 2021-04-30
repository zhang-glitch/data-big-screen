<template>
  <div class="loading-box">
    <svg :width="width" :height="height" viewBox="0 0 50 50" preserveAspectRatio="xMidYMid meet">
      <!-- stroke-dasharray = 2 * PI * r / 4 -->
      <circle 
        cx="25"
        cy="25"
        r="22"
        fill="none"
        stroke-width="3"
        stroke-dasharray="34"
        :stroke="outsiderColor"
        stroke-linecap="round"
      >
      <animateTransform 
        attributeName="transform" 
        begin="0s" 
        :dur="`${duration}s`" 
        type="rotate" 
        from="0 25 25"
        to="360 25 25" 
        repeatCount="indefinite"
      ></animateTransform>
      <animate 
        attributeName="stroke" 
        repeatCount="indefinite" 
        :values="outsiderColorTrans" 
        :dur="`${+duration * 2}s`" 
      ></animate>
      </circle>
      <circle
        cx="25"
        cy="25"
        r="12"
        fill="none"
        stroke-width="3"
        stroke-dasharray="19"
        :stroke="insiderColor"
        stroke-linecap="round"
      >
      <animateTransform 
        attributeName="transform" 
        begin="0s" 
        :dur="`${duration}s`" 
        type="rotate" 
        from="360 25 25"
        to="0 25 25" 
        repeatCount="indefinite"
      ></animateTransform>

      <animate 
        attributeName="stroke" 
        repeatCount="indefinite" 
        :values="insiderColorTrans" 
        :dur="`${+duration * 2}s`"
      ></animate>
      </circle>
    </svg>
    <div class="loading-text">
      <slot name="loading-text"></slot>
    </div>
  </div>
</template>

<script>
import { computed, toRefs } from 'vue'
export default {
  name: 'Loading',
  props: {
    width: {
      type: [Number, String],
      default: 50
    },
    height: {
      type: [Number, String],
      default: 50
    },
    outsiderColor: {
      type: String,
      default: '#3be6cb'
    },
    insiderColor: {
      type: String,
      default: "#02bcfe"
    },
    duration: {
      type: [Number, String],
      default: 1.5
    }
    
  },
  setup(props) {
    const {outsiderColor, insiderColor} = toRefs(props)
    const outsiderColorTrans = computed(() => `${outsiderColor.value};${insiderColor.value};${outsiderColor.value}`)
    const insiderColorTrans = computed(() => `${insiderColor.value};${outsiderColor.value};${insiderColor.value}`)
    return {
      outsiderColorTrans,
      insiderColorTrans
    }
  }
}
</script>

<style lang="scss" >
  .loading-box {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    .loading-text {
      font-size: 14px;
      color: #ffffff;
    }
  }
</style>