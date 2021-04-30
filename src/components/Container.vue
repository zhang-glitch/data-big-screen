<template>
  <div class="container-box" ref="containerDom">
    <div class="container-box" v-if="ready">
      <slot name="ready"></slot>
    </div>
  </div>
</template>

<script>
import { onMounted, onUnmounted, ref } from 'vue'
// import debounce from '../util/debounce'
export default {
  name: 'Container',
  props: {
    options: {
      type: Object
    }
  },
  setup(props) {
    const containerDom = ref(null);
    const width = ref(0);
    const height = ref(0);
    const originalWidth = ref(0);
    const originalHeight = ref(0);
    const ready = ref(false);

    // 获取containers的宽度和高度
    const initSize = function() {
          if(props.options) {
            width.value = props.options.width;
            height.value = props.options.height;
          }else {
            // 这里获取的有问题
            if(containerDom.value) {
              // 获取dom的宽高本身的宽高，这里出现了问题。如果我们设置了他的宽度的高度。我们获取到的就是不变的值。
              width.value = containerDom.value.clientWidth;
              height.value = containerDom.value.clientHeight;
            }
          }
          // 获取屏幕宽度和高度。但是这里需要获取的是浏览器的最大可视区域的宽高啊。
          if(containerDom.value && !originalWidth.value && !originalHeight.value) {
            originalWidth.value = window.screen.width;
            originalHeight.value = window.screen.height;
          }
    }

    // 设置containers的尺寸
    const updateSize = function() {
        if(width.value || height.value) {
          containerDom.value.style.width = `${width.value}px`;
          containerDom.value.style.height = `${height.value}px`;
        }else {
          containerDom.value.style.width = `${originalWidth.value}px`;
          containerDom.value.style.height = `${originalHeight.value}px`;
        }
    }

    // 设置压缩比
    const initScale = function() {
      // 可视区域的宽度和高度
      const currentClientWidth = document.body.clientWidth;
      const currentClientHeight = document.body.clientHeight;
      
      // console.log(currentClientWidth,currentClientHeight)
      const realWidth = width.value || originalWidth.value;
      const realHeight = height.value || originalHeight.value;
      const widthScale = currentClientWidth / realWidth;
      const heightScale = currentClientHeight / realHeight;
      containerDom.value.style.transform = `scale(${widthScale}, ${heightScale})`;
    }
    
    // 固定压缩比
    const reserveScale =  function() {
      initSize();
      initScale();
    }

    onMounted(  () => {
      // 开始的时候不加载该组件内容
      ready.value = false;
      initSize();
      if(containerDom.value) {
        updateSize();
        initScale();
      }
      // 锁定宽高比
      window.addEventListener("resize", reserveScale)
      // 加载完毕后，让其显示
      ready.value = true;
    })
    onUnmounted(() => {
      window.removeEventListener("resize", reserveScale)
    })


    return {
      containerDom,
      ready
    }
    
  }
}
</script>

<style ang="scss" scoped>
  .container-box {
    position: fixed;
    top: 0;
    left: 0;
    /* 是变化的基点处在左上角。 */
    transform-origin: left top;
    z-index: 999;
    width: 100%;
  }
</style>