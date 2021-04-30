<template>
  <div class="icon-load">
    <svg width="100%" height="100%" viewBox="0 0 500 500">
      
      <circle cx="250" cy="250" r="230" stroke-width="30" stroke="#D1D3D7" fill="none"></circle>
      <circle class="circle-load" cx="250" cy="250" r="230" stroke-width="30" stroke="red" fill="none" transform="matrix(0 -1 1 0 0 500)"></circle>
    </svg>
  </div>
</template>

<script>
export default {
  name: 'IconLoad',

}
</script>

<style>
  .icon-load {
    border: 1px solid black;
    width: 500px;
    height: 500px;
  }
  .circle-load {
    animation: circle 5s linear infinite;
  }
  
  
  @keyframes circle {
    from {
      stroke-dasharray: 0 1445;
    }
    to {
      stroke-dasharray: 1445 0;
    }
  }
 
</style>