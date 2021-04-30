<template>
  <div class="test4">
    <vue-echarts 
      :option="option"
    />
  </div>
</template>

<script>
import { onMounted, ref } from 'vue'
import 'echarts-gl'
export default {
  name: 'test4',
  setup() {
    const option = ref({});
    const update = () => {
      option.value = {
        globe: {
          // 地球贴图
          baseTexture: 'https://www.youbaobao.xyz/datav-res/datav/datav-gl-texture.jpg',
          // 背景贴图
          environment: 'https://www.youbaobao.xyz/datav-res/datav/star-bg.jpg'
        }
      }
    }

    onMounted(update)

    return {
      option
    }
  }
}
</script>

<style lang="scss" scoped>
  .test4 {
    width: 100%;
    height: 100%;
  }
</style>