<template>
  <div class="container">
    <h2>ターン制バトル</h2>
    <hr>
    <p>
      戦闘はターン制バトルで攻撃防御回避素早さのステータスで競い合います。
    </p>
    <div class="img__container">
      <img src="@/assets/戦闘gif.gif" alt="戦闘gif">
    </div>
  </div>
</template>

<style lang="sass" scoped>
  .container
    margin-top: 40px
    width: 100%
    height: auto
    background: #000
    border: 3px solid #FFF
    border-radius: 10px
    padding-bottom: 16px
    p
      padding: 0 10px
      font-weight: bold

  h2
    font-size: 18px
    text-align: center
    color: #FFC400
  .img__container
    width: 100%
    display: flex
    justify-content: center
    img
      width: 330px
</style>