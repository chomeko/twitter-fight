<template>
  <div id="help">
    <h2>お問い合わせ</h2>
    <hr>
    <ul>
      <li>
        <a href="https://twitter.com/chomeko3o" rel="noopener" target="_blank">管理人TwitterのDM</a>よりご連絡ください。
      </li>
      <li class="back">
        <router-link
          to=router.go(-1)
        >戻る
        </router-link>
      </li>
    </ul>
  </div>
</template>

<style lang="sass" scoped>
  #help
    max-width: 400px
    height: 80vh
    padding: 10px
    margin: auto
    padding-top: 52px
    position: relative
    h2
      text-align: center
    p
      font-size: 12px
    ul
      width: 100%
      position: absolute
      top: 60%
      left: 50%
      transform: translate(-50%, -60%)
      li
        text-align: center
        margin-top: 40px
        a
          color: #00A7FF
          font-size: 14px
      .back a
        color: #FFF
</style>