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
        <div class="myCharacter__container" key="TwitterImg">
          <TwitterImg v-if="loginUser.photoURL" :loginUser="loginUser"></TwitterImg>
        </div>
      </transition-group>
    </template>
    <router-link
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
  props: {
    loginUser: {
      required: false
    },
    output: {
      required: false
    }
  },
  components: {
    Button,
    TwitterImg
  },
  data(){
    return {
      battleFlag: false
    }
  },
  fetch(){
    if(this.output === undefined){
      console.log('undefined')
    }
  },
  methods: {
    battleStart(){
      this.battleFlag = true
    }
  },
}
</script>

<style lang="sass" scoped>
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