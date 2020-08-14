<template>
  <div id="panchi">
    <template v-if="!this.gettitle">
      <p>攻撃して称号をGETしよう！</p>
      <div :class="karadaStyle"></div>
      <div class="eyeball-container">
        <span class="white--eyeball"></span>
          <span class="black--eyeball"></span>
      </div>
      <div class="panchi__img"><img src="../assets/右ストレート.png" alt="右ストレート"></div>
      <Button type="gacha__switch" class="switch" @myclick="getTitle">お前にぴったしな称号を与えよう<br><span>Getする</span></Button>
    </template>
    <template v-if="this.gettitle">
      <div class="animate__animated animate__zoomInDown">
        <div class="addtitle__wrapper">
          <AddTitle v-bind="gachaGet" class="title__item"></AddTitle>
        </div>
        <div class="title__sutefuri gettitle__style">
          <dl v-if=gachaGet.property.hp>
            <dt>最大HP :</dt>
            <dd class="sutefuri--color">+{{gachaGet.property.hp}}</dd>
          </dl>
          <dl v-if=gachaGet.property.attack>
            <dt>攻撃力 :</dt>
            <dd class="sutefuri--color">+ {{gachaGet.property.attack}}</dd>
          </dl>
          <dl v-if=gachaGet.property.defense>
            <dt>防御力 :</dt>
            <dd class="sutefuri--color">+ {{gachaGet.property.defense}}</dd>
          </dl>
          <dl v-if=gachaGet.property.avoidance>
            <dt>回避力 :</dt>
            <dd class="sutefuri--color">+ {{gachaGet.property.avoidance}}</dd>
          </dl>
          <dl v-if=gachaGet.property.speed>
            <dt>素早さ :</dt>
            <dd class="sutefuri--color">+ {{gachaGet.property.speed}}</dd>
          </dl>
        </div>
      </div>
      <router-link
        to='/'
        class="back"
      >戻る</router-link>
    </template>
  </div>
</template>

<script>
import Button from '../components/Button'
import AddTitle from '../components/AddTitle'
export default {
  props:{
    gachaGet:{
      required: true
    }
  },
  components: {
    Button,
    AddTitle
  },
  data(){
    return {
      gettitle: false
    }
  },
  computed:{
    karadaStyle(){
      return this.gachaGet.rea >= 3
        ? 'test'
        : 'karada'
  }
  },
  methods: {
    getTitle(){
      this.gettitle = !this.gettitle
    }
  }
}
</script>

<style lang="sass" scoped>
// $blue = #00A7FF
#panchi
  width: 100%
  position: absolute
  top: 50%
  left: 50%
  transform: translate(-50%, -50%)
p
  font-size: 24px
  font-weight: bold
  text-align: center
.karada
  width: 300px
  height: 300px
  border-radius: 50%
  background: #00A7FF
  box-shadow: 0 0 3vw #2356FF
  transform: translateX(-50%)
  position: relative

.test
  width: 300px
  height: 300px
  border-radius: 50%
  background: linear-gradient(45deg,orange, yellow, green, cyan, blue, violet)
  background-size: 400%
  transform: translateX(-50%)
  position: relative
  animation: test 20s linear infinite
  -moz-animation: test 20s linear infinite
  -webkit-animation: test 20s linear infinite
  -o-animation: test 20s linear infinite
  filter: blur(8px)
  &::before,&::after
    content: ''
    position: absolute
    top: 3px
    left: 1px
    border-radius: 50%
    //background: linear-gradient(#000, #262626)
    width: 295px
    height: 295px

.eyeball-container
  position: absolute
  top: 30%
  left: 25%
  transform: translate(-25%, -30%)

.white--eyeball
  width: 80px
  height: 56px
  background: #FFF
  border-radius: 50%
  display: inline-block
  position: relative
  transform: rotate(-4deg)

.black--eyeball
  width: 32px
  height: 32px
  background: #000
  border: 2px solid #666
  border-radius: 50%
  display: inline-block
  position: absolute
  top: 22%
  right: 0%

.panchi__img
  width: 100%
  display: inline
  position: absolute
  top: 25%
  left: -64%
  transform: translate(0%, -25%)

.switch
  position: absolute
  top: 70%
  right: 0%
  transform: translate(30%, -70%)

//ガチャ確定画面
.addtitle__wrapper
  display: flex
  justify-content: center
.title__item
  margin-bottom: 40px
  font-size: 36px
  padding: 5px
  border-radius: 10px
  text-shadow: 1px 1px 0 #000, -1px -1px 0 #000,-1px 1px 0 #000, 1px -1px 0 #000,0px 1px 0 #000,0 -1px 0 #000,-1px 0 0 #000, 1px 0 0 #000
.gettitle__style
  width: 200px
  margin: auto
  height: 100%
  background: #000
  border: 3px solid #FFF
  border-radius: 10px
  margin-bottom: 40px
  dl
    display: flex
    justify-content: center
.sutefuri--color
  color: red
a
  width: 100%
  display: inline-block
  color: #FFF
  text-align: center
  &:hover
    opacity: .5
.white
  color: #FFF
  background: #D3D3D3
  border: 3px solid #FFF
  margin-left: 0
.blue
  color: #FFF
  background: #0031FF
  border: 3px solid #FFF
  margin-left: 0
.orange
  color: #FFEB00
  border: 3px solid #FFEB00
  background: #ff8300
  margin-left: 0
.pink
  color: #FFD800
  border: 3px solid #FFEB00
  background: linear-gradient(45deg,orange, yellow, green, cyan, blue, violet)
  margin-left: 0



//keyFlame設定
.panchi__img
  animation-name: panchi
  animation-duration: 2s
  animation-timing-function: ease-in

.switch
  animation: item 1s 1.8s forwards
  -moz-animation: item 1s 1.8s forwards
  -webkit-animation: item 1s 1.8s forwards
  -o-animation: item 1s 1.8s forwards


.karada
  animation: karada 2s linear infinite
  -moz-animation: karada 2s linear infinite
  -webkit-animation: karada 2s linear infinite
  -o-animation: karada 2s linear infinite

@keyframes karada
  0%,
  100%
    box-shadow: 0 0 1vw #1041FF, 0 0 3vw #1041FF, 0 0 10vw #1041FF, 0 0 10vw #1041FF, 0 0 .4vw #8BFDFE, .5vw .5vw .1vw #147280
    background: #28D7FE
  50%
    box-shadow: 0 0 .5vw #082180, 0 0 1.5vw #082180, 0 0 5vw #082180, 0 0 5vw #082180, 0 0 .2vw #082180, .5vw .5vw .1vw #0A3940
    background: #146C80

@keyframes test
  0%
    background-position-x: 0
  50%
    background-position-x: 300%
  100%
    background-position-x: 0

@keyframes panchi
  0%
    transform: translate(0%, -22%)
    opacity: 1
  10%
    transform: translate(0%, -20%)
  20%
    transform: translate(0%, -22%)
  30%
    transform: translate(0%, -20%)
  40%
    transform: translate(0%, -22%)
  50%
    transform: translate(0%, -20%)
  60%
    transform: translate(0%, -22%)
  70%
    transform: translate(0%, -20%)
  80%
    transform: translate(0%, -22%)
  90%
    transform: translate(64%, -25%)
  100%
    transform: translate(64%, -25%)

@keyframes item
  0%
    transform: translate(-30%, -70%)
    border: 3px solid #000
  1%
    background-image: url('../assets/煉瓦崩れる@2x.png')
    background-size: cover
  10%
    transform: translate(40%, -70%)

  20%
    transform: translate(40%, -70%)

  30%
    transform: translate(50%, -70%)
    opacity: 0
  40%
    transform: translate(60%, -70%)
  50%
    transform: translate(70%, 100%)

  55%
    transform: translate(100%, 100%)

  60%
    transform: translate(-200%, -100%)
  61%
    background: #000
  70%
    transform: translate(200%, -200%) rotate(40deg)
  80%
    transform: translate(-200%, -70%) rotate(30deg)
  90%
    transform: translate(200%, 200%) rotate(20deg)
    border: 0
  100%
    transform: translate(-50%, -70%) rotate(0deg)
    width: 200px
    height: 200px
    border: 3px solid #FFF
    background: #000
    color: #FFF

</style>

