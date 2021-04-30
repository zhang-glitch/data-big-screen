<template>
  <div class="icon-comp">
    <svg class="icon">
      <use :href="IconName"></use>
    </svg>
  </div>
</template>

<script>
import { computed } from 'vue'
export default {
  name: "IconComp",
  props: {
    iconName: String,
    preFix: {
      type: String,
      default: "icon"
    }
  },
  setup(props) {
    const IconName = computed(() => {
      return `#${props.preFix}${props.iconName}`
    })

    return {
      IconName
    }
  }
}
</script>

<style>

.icon-comp {
  width: 30px;
  height: 30px;
  color: red; 
}


  .icon {
    width: 100%;
    height: 100%;
    fill: currentColor;
  }
</style>