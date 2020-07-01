<template>
  <div id="app">
    <header>
      <Header></Header>
    </header>
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
import 'normalize.css'
import Header from './components/Header'

export default {
  components: {
    Header
  }

}
</script>

<style lang="sass">
#app
  font-family: 'Hiragino Kaku Gothic Pro', 'ヒラギノ角ゴ Pro W3', sans-serif
  background: #000
  color: #FFF
  line-height: 1.5

*
  box-sizing: border-box
  a
    text-decoration: none

  .fade-enter,
  .fade-leave-to
    opacity: 0
  .fade-enter-active,
  .fade-leave-active
    transition: opacity .5s

  main
    padding-top: 52px
    //height: auto

</style>

