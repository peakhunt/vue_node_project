<template>
  <svg
    preserveAspectRatio="none"
    :height="height"
    :width="width"
    :x="x"
    :y="y"
    viewBox="0 0 100 100">
    <g>
      <path
        d="M0.0 -2.00000000063e-05C0.0 -2.00000000063e-05 100.0 -2.00000000063e-05 100.0 -2.00000000063e-05C100.0 -2.00000000063e-05 100.0 99.99998 100.0 99.99998C100.0 99.99998 1.42108547152e-14 99.99998 1.42108547152e-14 99.99998C1.42108547152e-14 99.99998 0.0 -2.00000000063e-05 0.0 -2.00000000063e-05"
      />
    </g>
  </svg>
</template>

<script>
export default {
  name: 'PowerLine',
  props: {
    x: { type: Number, default: 0 },
    y: { type: Number, default: 0 },
    width: { type: Number },
    height: { type: Number }
  }
}
</script>

<style scoped>
</style>
