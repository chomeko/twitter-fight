<template>
  <div id="battle">
    <template v-if="!battleFlag">
      <transition
        enter-active-class="animate__animated animate__backInUp"
        appear
      >
        <h2>ついふぁい<span>ユーザー</span>を<br><span>倒し</span>に行く</h2>
      </transition>
      <Button type="battle" @myclick="battleStart">バトル開始</Button>
    </template>
    <template v-if="battleFlag">
      <transition-group name="fade">
        <div class="enemyCharacter" key="ememy">
          <span>レベル: 50</span>
          <span class="enemyCharacter__name">りんご@エンジニア光る星／個人開発がんばりんご</span>
          <TwitterImg v-if="user.photoURL" :loginUser="user"></TwitterImg>
          <span class="enemyCharacter__hp"></span>
        </div>
        <div class="message__container" key="message">
          <p>りんご@エンジニア光る星／個人開発がんばりんご<br>が現れました。<br>戦闘を開始しますか？<br>はい<br>逃げる</p>
        </div>
        <div class="myCharacter" key="TwitterImg">
          <TwitterImg v-if="user.photoURL" :loginUser="user"></TwitterImg>
          <div class="character__hp">
            <span></span>
            <span>9999</span>
          </div>
        </div>
      </transition-group>
    </template>
    <router-link
      v-if="!battleFlag"
      class="back"
      to=router.go(-1)
    >戻る
    </router-link>
  </div>
</template>

<script>
import Button from '../components/Button'
import TwitterImg from '../components/TwitterImg'

export default {
  inject: ["$user"],
  components: {
    Button,
    TwitterImg
  },
  data(){
    return {
      battleFlag: false
    }
  },
  computed: {
    user(){
      return this.$user()
    }
  },
  methods: {
    battleStart(){
      this.battleFlag = true
    }
  }
}
</script>

<style lang="sass" scoped>
$breakpoints: ('sp': 'screen and (min-width: 400px)','pc': 'screen and (min-width: 768px)')
=mq($breakpoint: sp)
  @media #{map-get($breakpoints, $breakpoint)}
    @content


#battle
  max-width: 400px
  padding: 10px
  margin: auto
  height: 90vh
  overflow: hidden
  position: relative
  h2
    margin-top: 160px
    text-align: center
    span
      &:nth-of-type(1)
        color: #00acee
      &:nth-of-type(2)
        font-size: 40px
        color: red
.battle
  position: absolute
  top: 70%
  left: 50%
  transform: translate(-50%, -70%)
  &:active
    transform: translate(-50%, -60%)

//バトル画面
.enemyCharacter
  margin-top: 8px
  font-size: 14px
  text-align: center
  +mq(sp)
    margin-top: 40px
  +mq(pc)
    margin-top: 60px
  span
    display: block
  &__name
    border: 3px solid #FFF
    border-radius: 5px
  &__hp
    width: 100px
    height: 20px
    background: #14FF00
    border: 3px solid #FFF
    border-radius: 3px
    margin: auto
    margin-top: 6px
img
    width: 140px
    height: auto
    margin-top: 8px
    +mq(pc)
      margin-top: 16px
.myCharacter
  text-align: center
  img
    width: 100px
    height: auto
    padding: 3px
    border: 3px solid #FFF
    border-radius: 5px
.character__hp
  width: 120px
  height: 54px
  background: #000
  border: 3px solid #FFF
  border-radius: 5px
  margin: auto
  span
    display: block
    &:nth-child(1)
      width: 100px
      height: 20px
      background: #14FF00
      border: 3px solid #FFF
      border-radius: 3px
      margin: auto
      margin-top: 6px
    &:nth-child(2)
      font-size: 14px
      text-align: center
.message__container
  margin-top: 16px
  font-size: 14px
  width: 100%
  border: 3px solid #FFF
  border-radius: 10px
  +mq(pc)
    margin-top: 24px
  p
    padding: 5px 10px
    margin: 0
    line-height: 2

.back
  color: #FFF
  cursor: pointer
  position: absolute
  bottom: 5%
  left: 50%
  transform: translate(-50%, -5%)

.fade-move
  transition: transform 1s
.fade-enter,
.fade-leave-to
  opacity: 0
.fade-enter-active
  transition: opacity .5s
.fade-leave-active
  transition: opacity .5s

</style>