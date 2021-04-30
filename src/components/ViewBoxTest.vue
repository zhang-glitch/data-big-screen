<template>
  <div class="view-box-test">
    <svg width="100" height="100" viewBox="0 0 100 100">
      <circle cx="50" cy="50" r="50"  fill="red"></circle>
    </svg>
    <svg width="200" height="200" viewBox="0 0 100 100">
      <circle cx="25" cy="25" r="25"  fill="red"></circle>
    </svg>
    <svg width="200" height="200" viewBox="5 5 100 100">
      <circle cx="25" cy="25" r="25"  fill="red"></circle>
    </svg>
    <svg width="100" height="200" >
      <rect x="10" y="20" width="10" height="20" stroke-width="3" stroke="#000"></rect>
    </svg>
    <svg width="100" height="200" viewBox=" 0 0 10 20" >
      <rect x="10" y="20" width="10" height="20" stroke-width="3" stroke="#000"></rect>
    </svg>
    <div>蒙版学习</div>
    <svg width="400" height="400" >
      <defs>
        <radialGradient
        id="gradients"
        >
          <stop offset="0%"
                    stop-color="#fff"
                    stop-opacity="1"></stop>
          <stop offset="100%"
                    stop-color="#fff"
                    stop-opacity="0"></stop>
        </radialGradient>
        <mask id="mask">
          <circle cx="0" cy="0" r="50" fill="white" >
            <!-- <animateMotion 
              dur="3s"
              path="M5 5 L295 5 L295 295 L5 295 Z"
              rotate="auto"
              repeatCount="indefinite"
            ></animateMotion> -->
          </circle>
        </mask>
      </defs>
      <rect x="5" y="5" width="295" height="295" fill="none" stroke-width="3" stroke="#d4fcff"></rect>
      <!-- <rect x="0" y="0" width="295" height="295" fill="none" stroke-width="3" stroke="blue" mask="url(#mask)"></rect> -->
      <!-- 下面这个蒙层没有填充色，所以会显示上面的矩形颜色。如果蒙版中给定颜色会覆盖上面矩形。 -->
      <path
          d="M5 5 L295 5 L295 295 L5 295 Z"
          stroke-width="3"
          stroke="blue"
          fill="none"
          mask="url(#mask)"
      />
    </svg>
    <svg viewBox="0 0 400 400" >
      <defs>
           <radialGradient
                id="gradient"
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
        <mask id="opacity">
              <circle cx="0" cy="0" r="50" fill="url(#gradient)">
                  <animateMotion
                          dur="3s"
                          path="M5 5 L395 5 L395 395 L5 395 Z"
                          rotate="auto"
                          repeatCount="indefinite"
                  />
              </circle>
          </mask>
      </defs>
      <rect id="back" x="5" y="5" width="390" height="390" stroke-width="1" stroke="#235fa7" fill="none"></rect>
      <path
          d="M5 5 L395 5 L395 395 L5 395 Z"
          stroke-width="3"
          stroke="#4fd2dd"
          fill="none"
          mask="url(#opacity)"
      />
    </svg>

    <svg width="400" height="300">
      <defs>
          <mask id="small-rect">
              <rect x="0" y="0" width="400" height="300" fill="white"></rect>
              <rect width="100" height="100" fill="black" x="200" y="100"></rect>
          </mask>
      </defs>
      <rect id="back" x="0" y="0" width="400" height="300" fill="#d4fcff"></rect>
      <rect id="front" x="0" y="0" width="400" height="300" fill="#fcd3db" mask="url(#small-rect)"></rect>
    </svg>
  </div>
</template>

<script>
export default {
  name: 'ViewBoxTest'
}
</script>

<style>
svg {
  border: 1px solid black;
}

</style>