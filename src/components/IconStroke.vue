<template>
  <div class="icon-stroke">
    <!-- <svg width="300" height="300" viewBox="0 0 300 300 ">
      <line x1="0" y1="100" x2="300" y2="100" stroke-width="10" stroke="red" class="line-stroke"  fill="none"></line>
    </svg> -->
  <svg t="1618554706051"  viewBox="0 0 1448 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="16033" width="200" height="200"><path id="taobao-logo" class="haizi" d="M942.650074 934.160892c-64.190942 0-171.199355 18.908426-187.890445 62.565354v0.966752c-37.199301 0.975353-46.001559 0-62.625561 0-16.665287-43.710254-123.701223-62.625561-187.892165-62.625561H159.772074v-736.124714h374.533745c80.821825 0 150.718667 41.527322 189.106626 102.809407 38.394839-61.282086 108.326085-102.809407 189.182314-102.809407h374.525144v735.218169h-344.469829zM692.134068 386.834888c0-73.216826-79.075823-125.258003-156.579384-125.258003H222.404516v610.85811h281.837387c62.128424-1.095767 160.112673 0.658836 187.892165 46.410967v-35.074856c-1.190378-43.342131-0.067088-102.527295 0-104.966537V386.834888z m532.353393-125.326811H911.337293c-77.501841 0-156.577664 52.017094-156.577664 125.139309v391.405456c0.067088 2.411719 1.195538 61.596882 0 104.844403v35.042172c27.777772-45.691923 125.762021-47.474049 187.890445-46.35076h281.837387V261.508077z m0 0" p-id="16034"></path></svg>
  </div>
</template>

<script>
import {onMounted} from 'vue'
export default {
  name: 'IconStroke',
  setup() {
    onMounted(() => {
      const path = document.getElementById('taobao-logo')
const pathLen = path.getTotalLength() // 6885
console.log(pathLen)
    })
  }
}
</script>

<style>

.icon-stroke {
  border: 1px solid black;
  display: inline-block;
}
.line-stroke {
  /* margin */
  stroke-dasharray: 10;
  /* 右边往左边的偏移多少 */
  stroke-dashoffset: 0;
}

.haizi {
  fill: none;
  stroke: #333;
  stroke-width: 1;
  animation: haizi 5s linear infinite;
}

  @keyframes haizi {
    from {
      stroke-dasharray: 8152;
      stroke-dashoffset: 8152;
    }
    to {
      stroke-dasharray: 8152;
      stroke-dashoffset: 0;
    }
  }
</style>