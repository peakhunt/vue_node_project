<template>
  <svg
    preserveAspectRatio="none"
    :height="height"
    :width="width"
    :x="x"
    :y="y"
    viewBox="0 0 32 32">
    <g :transform="transform">
      <path
        d="M8.244 32.0C8.244 32.0 0.0 26.666667 0.0 26.666667C0.0 26.666667 16.0 16.0 16.0 16.0C16.0 16.0 0.0 5.3333333 0.0 5.3333333C0.0 5.3333333 8.244 0.0 8.244 0.0C8.244 0.0 32.0 16.0 32.0 16.0C32.0 16.0 8.244 32.0 8.244 32.0"
      />
    </g>
  </svg>
</template>

<script>
export default {
  name: 'PowerDirection',
  computed: {
    transform () {
      let rot

      switch (this.dir) {
        case 'up':
          rot = 270
          break

        case 'right':
          rot = 180
          break

        case 'down':
          rot = 90
          break

        case 'left':
        default:
          rot = 0
          break
      }

      return `rotate(${rot} 16 16)`
    }
  },
  props: {
    x: { type: Number, default: 0 },
    y: { type: Number, default: 0 },
    width: { type: Number },
    height: { type: Number },
    dir: { type: String, default: 'left' }
  }
}
</script>

<style scoped>
</style>
