<template>
  <div class="eyeball-container">
    <span class="white">
      <span class="black"></span>
    </span>
    <span class="white">
      <span class="black"></span>
    </span>

    <div class="mvlogo">
      <div class="left__img animPanchi">
        <img src="../assets/右手.png" alt="右手">
      </div>
      <div class="right__img">
        <img src="../assets/左手.png" alt="左手">
      </div>
    </div>
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
    //transform: translate(-30%, -60%)

  .mvlogo
    width: 320px
    height: 130px
    margin: auto
    display: flex
    position: relative
  .left__img
    width: 185px
    height: auto
    position: absolute
    top: -19%
    left: 0%
    z-index: 1
    overflow: hidden
  .right__img
    width: 156px
    height: auto
    position: absolute
    top: -13%
    right: 0%
  img
    width: 100%

  @keyframes animName
    0%
      transform: translateY(0.1)
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

  @keyframes animPanchi
    0%
      transform: scale(1)
    20%
      transform: scale(1.2)
    40%
      transform: scale(2)
    60%
      transform: scale(5)
    80%
      transform: scale(1.2)
    100%
      transform: scale(1)

  .animPanchi
    animation: animPanchi 2.5s linear
</style>