<template>
  <div class="coin__container">
    <span>所持コイン</span>
    <span>{{output}}</span>
  </div>
</template>

<script>
export default {
  props: {
    output: {
      type: Number,
      required: false
    }
  }
}
</script>

<style lang="sass">
  .coin__container
    border: 3px solid #FFF
    border-radius: 10px
    width: 120px
    padding: 5px
    position: absolute
    top: 30px
    right: 0
    span
      display: block
      text-align: center
</style>