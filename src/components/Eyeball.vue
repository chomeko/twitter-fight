<template>
  <div class="eyeball-container">
      <span class="white">
        <span class="black animName"></span>
      </span>
      <span class="white">
        <span class="black animName"></span>
      </span>
    </div>
</template>

<script>
export default {
  data(){
    return {

    }
  }
}
</script>

<style lang="sass" scoped>
  .eyeball-container
    text-align: center

  .white
    margin-top: 80px
    width: 46px
    height: 56px
    background: #FFF
    border-radius: 50%
    display: inline-block
    position: relative
  .black
    width: 20px
    height: 20px
    background: #000
    border-radius: 50%
    display: inline-block
    position: absolute
    top: 60%
    left: 30%
    transform: translate(-30%, -60%)

  @keyframes animName
    0%
      transform: translateY(0)
    25%
      transform: translateY(5px)
    50%
      transform: translateY(0px)
    75%
      transform: translateY(-5px)
    100%
      transform: translateY(0)

  .animName
    animation: animName 1.5s linear infinite
</style>