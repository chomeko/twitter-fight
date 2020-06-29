<template>
  <div id="app">
    <Header></Header>
    <router-view></router-view>
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

</style>

