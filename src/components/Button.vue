<template>
  <button
    class="my-button"
    :class="[type, size]"
    @click="click"
  >
  <slot/>
  </button>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: ""
    },
    size:{
      type: String,
      default: ""
    }
  },
  methods: {
    click(){
      this.$emit("myclick")
    }
  }
}
</script>

<style lang="sass">
  // デフォルト
  .my-button
    background: #f6f6f6
    border: none
    border-radius: 10px
    box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.3)
    color: #666
    cursor: pointer
    font-size: 16px
    outline: none
    padding: 10px 5px
    transition: opacity 0.4s
    &:hover
      opacity: 0.8
    &:active
      transform: translateY(3px)
    // 色分け
  .twitter
    background: #00A7FF
    color: #fff
    font-weight: bold
  .userStatus
    background: #d10dff
    color: #FFF
    font-weight: bold
    //サイズ
</style>