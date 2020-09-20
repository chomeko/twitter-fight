<template>
  <div>
    <div class="container">
      <h2>Twitter内で最強の戦士を目指す</h2>
      <hr>
      <p>Twitter内で1番強い奴を目指すことが目的のアプリ。
        自分のステータスを確認後、バトルをすることでレベルを上げて
        コインを貯めて称号ガチャを回す。
      </p>
      <div class="topStatus">
        <img src="@/assets/トップ用ステータス画面.png" alt="トップス用ステータス画面">
      </div>
    </div>
    <div class="gachaLottie">
      <h2>ガチャを回して称号を装備して強化できる</h2>
      <hr>
      <lottie :options="gacha" :loop="true" :height="270" :width="320" :animCreated="handleAnimation"/>
    </div>
  </div>
</template>

<script>
import Lottie from "@/components/Lottie.vue"
// 斬撃アニメーション
import * as gacha from "@/assets/gacha.json"

export default {
  components: {
    Lottie
  },
  data(){
    return {
    }
  },
  computed: {
    gacha () {
      return { animationData: gacha, loop: true }
    },
  },
  methods: {
    handleAnimation (anim) {
      this.anim = anim
    }
  }
}
</script>

<style lang="sass" scoped>
  .container
    margin-top: 40px
    width: 100%
    height: auto
    background: #000
    border: 3px solid #FFF
    border-radius: 10px
    p
      padding: 0 10px
      font-weight: bold

  h2
    font-size: 18px
    text-align: center
    color: #FFC400

  img
    width: 100%
  
  .gachaLottie
    margin-top: 40px
    width: 100%
    height: auto
    background: #000
    border: 3px solid #FFF
    border-radius: 10px

</style>