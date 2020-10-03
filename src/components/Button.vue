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

<style lang="sass" scoped>
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
      opacity: 0.6
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
  .menu
    background: rgba( #000, .5 )
    color: #FFF
    font-weight: bold
    border: 3px solid #FFF
  .gacha__switch
    width: 120px
    height: 200px
    cursor: pointer
    background-image: url('../assets/煉瓦@2x.png')
    background-size: cover
    color: transparent
    line-height: 2
    &:hover
      opacity: 1
    &:active
      border: 1px solid #fff
    span
      font-size: 20px
  .battle
    width: 120px
    height: 100px
    background: #000
    cursor: pointer
    color: #fff
    border: 3px solid #FFF
    &__select
      cursor: pointer
      padding: 10px 5px
      &--attack
        color: #FFF
        border-radius: 3px
        background: none
        box-shadow: inset 0 0 15px rgba(251,81,81,0.4), 0 0 15px rgba(251,81,81,0.4)
        border: #fb5454 solid 2px !important
      &--escapebtn
        color: #FFF
        border-radius: 3px
        box-shadow: inset 0 0 15px rgba(0,170,170,0.5), 0 0 15px rgba(0,170,170,0.5)
        border: #0dd solid 2px !important
        background: none
      &--next
        color: #FFF
        box-shadow: inset 0 0 0.8em rgba(255,255,255,0.3), 0 0 0.8em rgba(255,255,255,0.3)
        border: #fff solid 2px
        border-radius: 3px !important
        background: none

  //サイズ
  .menu--size
    padding: 20px 30px
    &::nth-child(2)
      margin: 0px 10px

  .add-button
    width: 150px
    margin-top: 10px
</style>