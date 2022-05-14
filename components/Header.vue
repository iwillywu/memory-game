<template>
  <div class="header">
      <button class="btn" @click="handleClick">New Game</button>
      <div class="score">Score: <span>{{ score }}</span></div>
  </div>
</template>
<script>
export default {
  props: {
    score: {
      type: Number,
      default: 0
    }
  },
  methods: {
      handleClick() {
          this.$emit('click')
      }
  }
}
</script>

<style scoped>
    .header {
        margin: 10px 30px;
        display: flex;
        justify-content: space-between;
        widows: 100%;
    }
    .score {
        font-size: 1.25rem;
        font-weight: bold;
    }
    .btn {
        background-color: rgb(246, 144, 0);
        padding: 0.5rem 3rem;
        color: #fff;
        font-weight: bold;
        border: 0;
        text-transform: uppercase;
        cursor: pointer;
    }
</style>