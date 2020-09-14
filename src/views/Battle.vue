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
        <!-- 敵 -->
        <div class="enemyCharacter" key="ememy">
          <span>レベル: 50</span>
          <span class="enemyCharacter__name">{{enemy2Name.displayName}}</span>
          <TwitterImg v-if="enemy2Name.photoURL" :loginUser="enemy2Name" class="enemyCharacter__img" :class="{opacity:enemyEnd}"></TwitterImg>
          <div class="enemyCharacter__hp">
            <div id="enemyMaxGauge" ref="enemyMax"></div>
            <span>{{this.enemy2.hp}}</span>
          </div>
        </div>
        <!-- メッセージ -->
        <div class="message__container" key="message">
          <vue-typer
            :text="this.message"
            :repeat='0'
            :type-delay='15'
          ></vue-typer>
        </div>
        <!-- 戦闘ボタン -->
        <div class="btn__container" key="btn__container">
          <button v-if="!battleEnd" v-bind:disabled="clickBattleBtn" @click="battleStart">戦う</button>
          <button v-if="battleEnd" @click="experiencePoint" v-bind:disabled="clickBattleBtn">次へ</button>
          <button v-if="escapebtn" @click="reset">逃げる</button>
          <button v-if="!escapebtn" @click="reset" v-bind:disabled="!clickBattleBtn">次の敵を探す</button>
        </div>
        <!-- 自分 -->
        <div class="myCharacter" key="myCharacter">
          <TwitterImg v-if="user.photoURL" :loginUser="user" :class="{opacity:myUserEnd}"></TwitterImg>
          <div class="myCharacter__hp">
            <div id="myMaxGauge" ref="myMax"></div>
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
        hp: 1000,
        attack: 200,
        defense: 300,
        avoidance: 50,
        speed: 500,
      },
      myUser: {},
      enemy2: {},
      enemy2Name: {},
      message: '',
      battleEnd: false,
      escapebtn: true,
      myUserEnd: false,
      enemyEnd: false,
      clickBattleBtn: false,
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
    //戦闘を開始するかしないか
    async battle(){
      await this.getUser()
      await this.getEnemy()
      this.battleFlag = true
      this.message = `${this.enemyName}\nが現れました。\n戦闘を開始しますか？`
      //最大hpの追加
      this.$set(this.enemy,'maxhp', this.enemy.hp)
      this.$set(this.myUser,'maxhp', this.myUser.hp)
    },
    //戦う
    battleStart(){
      this.clickBattleBtn = true
      this.myUser.speed > this.enemy.speed ? this.myTurn() : this.enemyTurn()
    },
    //再読み込み
    reset(){
      this.$router.go({path: this.$router.currentRoute.path})
    },

    //ダメージ計算関数
    damage(a,d,k){
      const attack = a
      const defence = d
      let dame = 0
      const avoidance = 100 - k
      const random = Math.floor( Math.random() * ( 100 )) + 1
      if(random <= avoidance){
        dame
      }else{
        dame = attack * attack / defence
      }
      return Math.ceil(dame)
    },

    // 自分のターンの処理
    myTurn(){
      const E = this.$refs.enemyMax//hpゲージ
      const M = this.$refs.myMax//自分のゲージ
      const myAttack = this.myUser.attack//myダメージ
      const myDefense = this.myUser.defense//my防御
      const enemyAttack = this.enemy.attack//enemyダメージ
      const enemyDefense = this.enemy.defense//enemy防御
      const myDamage = this.damage(myAttack,enemyDefense,this.enemy.avoidance)
      const enemyDamage = this.damage(enemyAttack,myDefense,this.myUser.avoidance)
      //攻撃開始
      this.enemy.hp -= myDamage
      E.style.width = (this.enemy.hp / this.enemy.maxhp * 100) + "%"//enemyのhpゲージを減らす
      //敵のhpがまだあれば
      if(this.enemy.hp > 0){
        myDamage > 0 ? this.message = `${this.$user().displayName}の攻撃\n` + myDamage + "のダメージを与えた" : this.message = `${this.$user().displayName}の攻撃\n` + "避けられた！！"
        //2秒後に敵の攻撃
        setTimeout(() => {
          this.myUser.hp -= enemyDamage
          M.style.width = (this.myUser.hp / this.myUser.maxhp * 100) + "%"//myuserのhpゲージを減らす
          //自分のhpがまだあればダメージ表示
          //自分のhpが０だったら戦闘終了
          if(this.myUser.hp > 0){
            enemyDamage > 0 ? this.message = `${this.enemyName}の攻撃\n` + enemyDamage + "のダメージを受けた" : this.message = `${this.enemyName}の攻撃\n` + "紙一重で避けた！！"
            this.clickBattleBtn =false
          }else{
            this.myUser.hp = 0
            this.myUserEnd = true
            M.style.width = (this.myUser.hp / this.myUser.maxhp * 100) + "%"//hpゲージを減らす
            this.message = `${this.enemyName}の攻撃\n` + enemyDamage + "のダメージを受けた\n" + `${this.$user().displayName}は` + "やられてしまった...！"
            this.escapebtn = false//逃げるボタン非表示
            this.clickBattleBtn = true
          }
        }, 2000)
      }
      //敵のhpが０だったら戦闘終了
      else{
        this.enemy.hp = 0
        E.style.width = 0//enemyのhpゲージを減らす
        this.enemyEnd = true
        this.battleEnd = true
        this.escapebtn = false//逃げるボタン非表示
        this.message = `${this.$user().displayName}の攻撃\n` + myAttack + "のダメージを与えた\n" + `${this.enemyName}を` + "倒した！"
        this.clickBattleBtn = false
      }
    },

    // 敵のターンの処理
    enemyTurn(){
      const E = this.$refs.enemyMax//hpゲージ
      const M = this.$refs.myMax//自分のゲージ
      const myAttack = this.myUser.attack//myダメージ
      const myDefense = this.myUser.defense//my防御
      const enemyAttack = this.enemy.attack//enemyダメージ
      const enemyDefense = this.enemy.defense//enemy防御
      const myDamage = this.damage(myAttack,enemyDefense,this.enemy.avoidance)
      const enemyDamage = this.damage(enemyAttack,myDefense,this.myUser.avoidance)

      //攻撃開始
      this.myUser.hp -= enemyDamage
      M.style.width = (this.myUser.hp / this.myUser.maxhp * 100) + "%"//hpゲージを減らす
      //自分のhpがまだあれば
      if(this.myUser.hp > 0){
        enemyDamage > 0 ? this.message = `${this.enemyName}の攻撃\n` + enemyDamage + "のダメージを受けた" : this.message = `${this.enemyName}の攻撃\n` + "紙一重で避けた！！"
        //2秒後に自分の攻撃
        setTimeout(() => {
          this.enemy.hp -= myDamage
          E.style.width = (this.enemy.hp / this.enemy.maxhp * 100) + "%"//hpゲージを減らす
          //敵のhpがまだあればダメージ表示
          //敵のhpが０だったら戦闘終了
          if(this.enemy.hp > 0){
            myDamage > 0 ? this.message = `${this.$user().displayName}の攻撃\n` + myDamage + "のダメージを与えた" : this.message = `${this.$user().displayName}の攻撃\n` + "避けられた！！"
          }else{
            this.enemy.hp = 0
            this.enemyEnd = true
            this.message = `${this.$user().displayName}の攻撃\n` + myDamage + "のダメージを与えた\n" + `${this.enemyName}を` + "倒した！"
            this.battleEnd = true
            this.escapebtn = false//逃げるボタン非表示
          }
          this.clickBattleBtn = false
        }, 2000)
      }
      //自分のhpが０だったら戦闘終了
      else{
        this.myUser.hp = 0
        this.myUserEnd = true
        this.escapebtn = false//逃げるボタン非表示
        M.style.width = (this.myUser.hp / this.myUser.maxhp * 100) + "%"//hpゲージを減らす
        this.message = `${this.enemyName}の攻撃\n` + enemyDamage + "のダメージを受けた\n" + `${this.$user().displayName}は\n` + "やられてしまった...！"
        this.clickBattleBtn = true
      }
    },
    //経験値get
    experiencePoint(){
      this.message = '100経験値をゲットした'
      setTimeout(() => {
        this.getCoin()
      }, 1000)
      this.clickBattleBtn = true
    },
    //コインゲット
    getCoin(){
      let docID = String(this.$user().providerData[0].uid)
      let docRef = this.db.collection("sutefuri").doc(docID)
      docRef.update({
        coin: firebase.firestore.FieldValue.increment(100)
      })
      this.message = '100コインをGETした！'
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
    //敵情報取得
    async getEnemy(){
      let self = this
      const db = firebase.firestore()
      let docRef = this.db.collection("sutefuri")
      await docRef.get()
      .then(function(querySnapshot){
        querySnapshot.forEach(function(doc) {
          self.enemy2 = doc.data()
          db.collection("users").doc(doc.id).get()
          .then((doc) => {
            if (doc.exists) {
              self.enemy2Name = doc.data()
            } else {
              console.log("No such document!")
            }
          })
        })
      })
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
  &__img
    opacity: 1
  &__hp
    width: 200px
    margin: auto
    #enemyMaxGauge
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
  &__hp
    width: 200px
    margin: auto
    #myMaxGauge
      width: 200px
      height: 20px
      background-color: #14FF00
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
  button
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

.opacity
  opacity: .2

.noClick
  opacity: 0
</style>