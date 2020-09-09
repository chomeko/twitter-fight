<template>
  <div id="battle">
    <template v-if="!battleFlag">
      <transition
        enter-active-class="animate__animated animate__backInUp"
        appear
      >
        <h2>ついふぁい<span>ユーザー</span>を<br><span>倒し</span>に行く</h2>
      </transition>
      <Button type="battle" @myclick="battle">バトル開始</Button>
    </template>
    <template v-if="battleFlag">
      <transition-group name="fade">
        <div class="enemyCharacter" key="ememy">
          <span>レベル: 50</span>
          <span class="enemyCharacter__name">{{enemyName}}</span>
          <TwitterImg v-if="user.photoURL" :loginUser="user" class="enemyCharacter__img"></TwitterImg>
          <div class="enemyCharacter__hp">
            <div id="max" ref="max"></div>
            <div id="now"></div>
            <span>{{this.enemy.hp}}</span>
          </div>
        </div>
        <div class="message__container" key="message">
          <!-- <nl2br tag="p" :text="this.message"></nl2br> -->
          <vue-typer
            :text="this.message"
            :repeat='0'
            :type-delay='15'
          ></vue-typer>
        </div>
        <div class="btn__container" key="btn__container">
          <span @click="battleStart">戦う</span>
          <span v-if="escapebtn" @click="escape">逃げる</span>
        </div>

        <div class="myCharacter" key="TwitterImg">
          <TwitterImg v-if="user.photoURL" :loginUser="user"></TwitterImg>
          <div class="character__hp">
            <span></span>
            <span>{{this.myUser.hp}}</span>
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
import firebase from 'firebase'
import Button from '../components/Button'
import TwitterImg from '../components/TwitterImg'
// import Nl2br from 'vue-nl2br'
import { VueTyper } from 'vue-typer'

export default {
  inject: ["$user"],
  components: {
    Button,
    TwitterImg,
    // Nl2br,
    VueTyper
  },
  data(){
    return {
      battleFlag: false,
      enemyName: 'りんご@エンジニア光る星／個人開発がんばりんご',
      enemy: {
        lv: 50,
        hp: 1500,
        attack: 500,
        defense: 500,
        avoidance: 500,
        speed: 50,
      },
      myUser: {},
      message: '',
      messageView: '',
      escapebtn: true,
    }
  },
  created(){
    this.db = firebase.firestore() // dbインスタンスを初期化
  },
  computed: {
    user(){
      return this.$user()
    }
  },
  methods: {
    battle(){
      this.getUser()
      this.battleFlag = true
      this.message = `${this.enemyName}\nが現れました。\n戦闘を開始しますか？`
      //最大hpの追加
      this.$set(this.enemy,'maxhp', this.enemy.hp)
      //this.$set(this.enemy,'maxhp', this.enemy.hp)
    },
    //戦う
    battleStart(){
      //逃げるボタン非表示
      this.escapebtn = false
      //hpゲージ
      const M = this.$refs.max
      //ダメージ
      const myAttack = this.myUser.attack
      //const enemyAttack = this.enemy.attack

      //speed高い方から攻撃
      if(this.myUser.speed > this.enemy.speed){
        this.enemy.hp -= myAttack
        if(this.enemy.hp > 0){
          if(this.myUser.attack == 0){
            this.message = `${this.enemyName}に攻撃をかわされた！`
          }
          else{
            this.message = `${this.$user().displayName}の攻撃\n${this.enemyName}に\n` + this.myUser.attack + "のダメージを与えた"
          }
        }
        else{
          this.enemy.hp = 0
          this.message = `${this.enemyName}を倒した！`
        }
        M.style.width = (this.enemy.hp / this.enemy.maxhp * 100) + "%"
      }
    },
    //逃げる
    escape(){
      this.battleFlag = false
    },
    //ユーザー情報取得
    async getUser(){
      let self = this
      let docID = String(this.$user().providerData[0].uid)
      let docRef = this.db.collection("sutefuri").doc(docID)
      await docRef.get()
      .then((doc) => {
        if (doc.exists) {
          //console.log('doc.data()')
          self.myUser = doc.data()
        } else {
          console.log("No such document!")
        }
      })
      .catch(function(error) {
        console.log("Error getting document:", error);
      })
    },
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
  &__img
    opacity: 1
  &__hp
    width: 200px
    margin: auto
    #max
      width: 200px
      height: 20px
      background-color: #14FF00

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
  font-size: 14px
  width: 100%
  height: 130px
  border: 3px solid #FFF
  border-radius: 10px
  padding: 10px
  +mq(pc)
    margin-top: 24px
  p
    padding: 5px 10px
    margin: 0
    line-height: 2
.btn__container
  position: relative
  span
    padding: 5px
    border: 1px solid #FFF
    &:nth-of-type(1)
      position: absolute
      left: 0
      top: 10px
    &:nth-of-type(2)
      position: absolute
      right: 0
      top: 10px

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

.vue-typer /deep/
  .custom.char.typed
    color: #FFF
</style>