<template>
  <div class="smil-animation">
    <svg width="400" height="400">
      <rect x="0" y="0" width="100" height="100" fill="red">
        <set attributeName="x" attributeType="XML" to="10" begin="1s" />
        <set attributeName="x" attributeType="XML" to="20" begin="2s" />
        <set attributeName="x" attributeType="XML" to="30" begin="3s" />
        <set attributeName="x" attributeType="XML" to="40" begin="4s" />
        <set attributeName="x" attributeType="XML" to="50" begin="5s" />
      </rect>
      
    </svg>
    <svg width="400" height="400" viewBox="0 0 400 400" style="border: 1px solid black">
      <circle cx="0" cy="0" r="20" stroke-width="5" stroke="red" fill="blue">
        <animate attributeName="cx" from="0" to="200" dur="2s" repeatCount="2" fill="freeze" />
        <animate attributeName="cy" from="0" to="200" dur="2s" repeatCount="2" fill="freeze" />
        <animate attributeName="fill" from="blue" to="red" dur="2s" repeatCount="2" fill="freeze" />
      </circle>
    </svg>
    <svg>
      <rect x="0" y="0" rx="0" ry="0" width="10" height="10" fill="red">
        <animateMotion 
        id="start-rect"
        path="M 10 10 L 110 10 L 110 110 L 10 110"
        rotate="0"
        dur="2s"
        begin="0; end-rect.end + 0.5s"
        fill="freeze"
        ></animateMotion>
        <animateMotion 
        id="end-rect"
        path="M 10 110 L 110 110 L 110 10 L 10 10"
        rotate="0"
        dur="2s"
        begin="start-rect.end + 0.5s"
        fill="freeze"
        ></animateMotion>
      </rect>
      <path d="M 10 10 L 110 10 L 110 110 L 10 110" fill="none" stroke-width="1" stroke="blue"/>
    </svg>
  </div>
</template>

<script>
export default {
  name: 'SMILAnimation'
}
</script>

<style>
.smil-animation {
  border: 1px solid black;
}
</style>