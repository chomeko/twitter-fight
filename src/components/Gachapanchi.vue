<template>
  <div id="panchi">
    <template v-if="!this.gettitle">
      <p>攻撃して称号をGETしよう！</p>
      <div class="karada"></div>
      <div class="eyeball-container">
        <span class="white"></span>
          <span class="black"></span>
      </div>
      <div class="panchi__img"><img src="../assets/右ストレート.png" alt="右ストレート"></div>
      <Button type="gacha__switch" class="switch" @myclick="getTitle">ああああ</Button>
    </template>
    <template v-if="this.gettitle">
      <div class="gettitle__style animate__animated animate__zoomInDown">
        <div class="title__item">称号名がはいる</div>
        <div class="title__sutefuri">
          <dl>
            <dt>最大HP :</dt>
            <dd>hp</dd>
          </dl>
          <dl>
            <dt>攻撃力 :</dt>
            <dd>attack</dd>
          </dl>
          <dl>
            <dt>防御力 :</dt>
            <dd>defense</dd>
          </dl>
          <dl>
            <dt>回避力 :</dt>
            <dd>avoidance</dd>
          </dl>
          <dl>
            <dt>素早さ :</dt>
            <dd>speed</dd>
          </dl>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import Button from '../components/Button'
export default {
  components: {
    Button
  },
  data(){
    return {
      gettitle: false
    }
  },
  methods: {
    getRandom(){
      //1~100の数値にしたい
      //floor整数
      //Math.random 0~0.999999 * (100) + 1
      //Math.floor 0~0.9 * (100) = 0~99 + 1
      //(最大値+1 - 最小値 ) + 最小値
      //(101 - 1 ) + 1
      const random = Math.floor( Math.random() * ( 100 )) + 1
      return random
    },
    getTitle(){
      //配列
      const normal = 60
      const rare = 90
      const epic = 98
      const legend = 100
      //1~100
      const result = this.getRandom()
      console.log(result)
      if(result <= normal){
        //1~60
        console.log('ノーマル')
      }
      else if( result <= rare){
        //61~90
        console.log('レア')
      }
      else if( result <= epic){
        //91~98
        console.log('エピック')
      }
      else if( result <= legend){
        //99~100
        console.log('legend')
      }
      // switch(result){
      //   case result < normal:
      //     console.log('ノーマル')
      //     break
      //   case result < rare:
      //     console.log('レア')
      //     break
      //   case result < epic:
      //     console.log('エピック')
      //     break
      //   case result < legend:
      //     console.log('レジェンド')
      //     break
      //   default:
      //     console.log('デフォルト')
      //     break
      //}

      //his.gettitle = !this.gettitle
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

.eyeball-container
  position: absolute
  top: 30%
  left: 25%
  transform: translate(-25%, -30%)

.white
  width: 80px
  height: 56px
  background: #FFF
  border-radius: 50%
  display: inline-block
  position: relative
  transform: rotate(-4deg)

.black
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

.gettitle__style
  width: 90%
  height: 100%
  background: #000
  border: 3px solid #FFF
  border-radius: 10px

//ガチャ確定画面


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

