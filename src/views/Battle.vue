<template>
  <div id="battle">
    <template v-if="!battleFlag">
      <transition
        enter-active-class="animate__animated animate__backInUp"
        appear
      >
        <h2>ついふぁい<span>ユーザー</span>を<br><span>倒し</span>に行く</h2>
      </transition>
      <Button type="battle" @myclick.once="battle">バトル開始</Button>
    </template>
    <template v-if="battleFlag">
      <!-- 敵 -->
      <div class="enemyCharacter">
        <span>レベル : {{enemy.lv}}</span>
        <span class="enemyCharacter__name">{{enemyName.displayName}}</span>
        <div class="animeImg">
          <TwitterImg v-if="enemyName.photoURL" :loginUser="enemyName" class="enemyCharacter__img" :class="{opacity:enemyEnd}"></TwitterImg>
        </div>
        <!-- 攻撃エフェクト -->
        <div class="enemyLottie">
          <lottie v-if="enemyAnime" :options="zangeki" :height="150" :width="150" :animCreated="handleAnimation"/>
          <lottie v-if="enemyLose" :options="bakuhatu" :height="150" :width="150" :animCreated="handleAnimation"/>
        </div>
        <div class="enemyCharacter__hp">
          <div id="enemyMaxGauge"></div>
          <div class="maxHpGauge" ref="enemyMax"></div>
        </div>
        <span class="maxHpGauge__enemyHp">{{this.enemy.hp}}</span>
      </div>
      <!-- メッセージ -->
      <div class="message__container">
        <vue-typer
          :text="this.message"
          :repeat='0'
          :type-delay='15'
        ></vue-typer>
      </div>
      <!-- 戦闘ボタン -->
      <div class="btn__container">
        <div v-if="!nextBattle" class="leftBtn">
          <Button v-if="!battleEnd" v-bind:disabled="clickBattleBtn" type="battle__select--attack" @myclick="battleStart">たたかう</Button>
          <Button v-if="battleEnd" type="battle__select--next" @myclick="experiencePoint" v-bind:disabled="clickBattleBtn">次へ</Button>
        </div>
        <Button v-if="nextBattle" type="battle__select--next" class="leftBtn" @myclick="reset" v-bind:disabled="!clickBattleBtn">次の敵を探す</Button>
        <div class="rightBtn">
          <Button v-if="escapebtn" type="battle__select--escapebtn" @myclick="reset">にげる</Button>
        </div>
      </div>
      <!-- 自分 -->
      <div class="myCharacter">
        <TwitterImg v-if="user.photoURL" :loginUser="user" :class="{opacity:myUserEnd}"></TwitterImg>
        <!-- 攻撃エフェクト -->
        <div class="myUserLottie">
          <lottie v-if="myUserAnime" :options="ookiduti" :height="100" :width="100" :animCreated="handleAnimation"/>
          <lottie v-if="myUserLose" :options="bakuhatu" :height="150" :width="150" :animCreated="handleAnimation"/>
        </div>
        <div class="myCharacter__hp">
          <div id="myMaxGauge"></div>
          <div class="maxHpGauge" ref="myMax"></div>
        </div>
        <span class="maxHpGauge__myUserHp">{{this.myUser.hp}}</span>
      </div>
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
import { v4 as uuidv4 } from 'uuid'

import Lottie from "@/components/Lottie.vue"
// 斬撃アニメーション
import * as zangeki from "@/assets/斬撃.json"
import * as ookiduti from "@/assets/大木槌.json"
import * as bakuhatu from "@/assets/爆発.json"

export default {
  inject: ["$user"],
  components: {
    Button,
    TwitterImg,
    // Nl2br,
    VueTyper,
    Lottie
  },
  data(){
    return {
      battleFlag: false,
      myUser: {},
      enemy: {},
      enemyName: {},
      message: '',
      nextBattle: false,
      battleEnd: false,
      escapebtn: true,
      myUserEnd: false,
      enemyEnd: false,
      clickBattleBtn: false,
      enemyAnime: false,
      enemyLose: false,
      myUserAnime: false,
      myUserLose: false
    }
  },
  created(){
    this.db = firebase.firestore() // dbインスタンスを初期化
  },
  computed: {
    user(){
      return this.$user()
    },
    zangeki () {
      return { animationData: zangeki, loop: false }
    },
    ookiduti () {
      return { animationData: ookiduti, loop: false }
    },
    bakuhatu(){
      return { animationData: bakuhatu, loop: false }
    },
    // autoScroll(){
    //   let target = document.getElementsByClassName('vue-typer')
    //   return target.scrollintoView(false)
    // }
  },
  methods: {
    //斬撃アニメーション
    handleAnimation (anim) {
      this.anim = anim
    },
    //戦闘を開始するかしないか
    async battle(){
      await this.getUser()
      await this.getEnemy()
      this.battleFlag = true
      this.message = `${this.enemyName.displayName}\nが現れました。\n戦闘を開始しますか？`
      //最大hpの追加
      //this.$set(this.enemy,'maxhp', this.enemy.hp)
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
      const avoidance = k//回避は装備込みMax６０までとする
      const random = Math.floor( Math.random() * ( 100 )) + 1
      if(random <= avoidance){
        dame
      }else{
        dame = attack * attack / defence
      }
      return Math.ceil(dame)
    },

    //１だと勝ち ０だと負け
    record(vs){
      let docID = String(this.$user().uid)
      let docRef = this.db.collection("sutefuri").doc(docID)
      if(vs > 0){
        docRef.update({
          winner: firebase.firestore.FieldValue.increment(1)
        })
      }else{
        docRef.update({
          lose: firebase.firestore.FieldValue.increment(1)
        })
      }
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
      this.myUserAnime = false
      this.enemy.hp -= myDamage
      E.style.width = (this.enemy.hp / this.enemy.maxhp * 100) + "%"//enemyのhpゲージを減らす
      //敵のhpがまだあれば
      if(this.enemy.hp > 0){
        myDamage > 0 ? this.enemyAnime = true : this.enemyAnime = false
        myDamage > 0 ? this.message = `${this.$user().displayName}の攻撃\n` + myDamage + "のダメージを与えた" : this.message = `${this.$user().displayName}の攻撃\n` + "避けられた！！"
        //2秒後に敵の攻撃
        setTimeout(() => {
          this.myUser.hp -= enemyDamage
          this.enemyAnime = false
          M.style.width = (this.myUser.hp / this.myUser.maxhp * 100) + "%"//myuserのhpゲージを減らす
          //自分のhpがまだあればダメージ表示
          //自分のhpが０だったら戦闘終了
          if(this.myUser.hp > 0){
            enemyDamage > 0 ? this.myUserAnime = true : this.myUserAnime = false
            enemyDamage > 0 ? this.message = `${this.enemyName.displayName}の攻撃\n` + enemyDamage + "のダメージを受けた" : this.message = `${this.enemyName.displayName}の攻撃\n` + "紙一重で避けた！！"
            this.clickBattleBtn = false
          }else{
            this.myUser.hp = 0
            this.myUserLose = true
            this.myUserEnd = true
            M.style.width = (this.myUser.hp / this.myUser.maxhp * 100) + "%"//hpゲージを減らす
            this.message = `${this.enemyName.displayName}の攻撃\n` + enemyDamage + "のダメージを受けた\n" + `${this.$user().displayName}は` + "やられてしまった...！"
            this.record(0)
            this.escapebtn = false//逃げるボタン非表示
            this.clickBattleBtn = true
            this.nextBattle = true
          }
        }, 2000)
      }
      //敵のhpが０だったら戦闘終了
      else{
        this.enemy.hp = 0
        this.enemyLose = true
        E.style.width = 0//enemyのhpゲージを減らす
        this.enemyEnd = true
        this.battleEnd = true
        this.escapebtn = false//逃げるボタン非表示
        this.message = `${this.$user().displayName}の攻撃\n` + myAttack + "のダメージを与えた\n" + `${this.enemyName.displayName}を` + "倒した！"
        this.record(1)
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
      this.enemyAnime = false
      M.style.width = (this.myUser.hp / this.myUser.maxhp * 100) + "%"//hpゲージを減らす
      //自分のhpがまだあれば
      if(this.myUser.hp > 0){
        enemyDamage > 0 ? this.myUserAnime = true : this.myUserAnime = false
        enemyDamage > 0 ? this.message = `${this.enemyName.displayName}の攻撃\n` + enemyDamage + "のダメージを受けた" : this.message = `${this.enemyName.displayName}の攻撃\n` + "紙一重で避けた！！"
        //2秒後に自分の攻撃
        setTimeout(() => {
          this.enemy.hp -= myDamage
          this.myUserAnime = false
          E.style.width = (this.enemy.hp / this.enemy.maxhp * 100) + "%"//hpゲージを減らす
          //敵のhpがまだあればダメージ表示
          //敵のhpが０だったら戦闘終了
          if(this.enemy.hp > 0){
            myDamage > 0 ? this.enemyAnime = true : this.enemyAnime = false
            myDamage > 0 ? this.message = `${this.$user().displayName}の攻撃\n` + myDamage + "のダメージを与えた" : this.message = `${this.$user().displayName}の攻撃\n` + "避けられた！！"
          }else{
            this.enemyLose = true
            this.enemy.hp = 0
            this.enemyEnd = true
            E.style.width = (this.enemy.hp / this.enemy.maxhp * 100) + "%"//hpゲージを減らす
            this.message = `${this.$user().displayName}の攻撃\n` + myDamage + "のダメージを与えた\n" + `${this.enemyName.displayName}を` + "倒した！"
            this.record(1)
            this.battleEnd = true
            this.escapebtn = false//逃げるボタン非表示
          }
          this.clickBattleBtn = false
        }, 2000)
      }
      //自分のhpが０だったら戦闘終了
      else{
        this.myUser.hp = 0
        this.myUserLose = true
        this.myUserEnd = true
        this.escapebtn = false//逃げるボタン非表示
        M.style.width = (this.myUser.hp / this.myUser.maxhp * 100) + "%"//hpゲージを減らす
        this.message = `${this.enemyName.displayName}の攻撃\n` + enemyDamage + "のダメージを受けた\n" + `${this.$user().displayName}は\n` + "やられてしまった...！"
        this.record(0)
        this.clickBattleBtn = true
        this.nextBattle = true
      }
    },
    //経験値get
    async experiencePoint(){
      let docID = String(this.$user().uid)
      let docRef = this.db.collection("sutefuri").doc(docID)
      await docRef.update({
        exp: firebase.firestore.FieldValue.increment(10),
        coin: firebase.firestore.FieldValue.increment(10)
      })
      this.message = '10経験値と10コインをGETした'
      await docRef.get()
      .then(async (doc) => {
        //console.log(doc.data().exp)
        if(doc.data().exp % 50 === 0){
          await docRef.update({
            lv: firebase.firestore.FieldValue.increment(1),
            hp: firebase.firestore.FieldValue.increment(200),
            attack: firebase.firestore.FieldValue.increment(10),
            defense: firebase.firestore.FieldValue.increment(10),
            speed: firebase.firestore.FieldValue.increment(10),
          })
          this.message = 'レベルが上がった\n' + 'ステータスが強化された'
        }
      })
      this.nextBattle = true
      this.clickBattleBtn = true
    },
    //ユーザー情報取得
    async getUser(){
      let self = this
      let docID = String(this.$user().uid)
      let docRef = this.db.collection("sutefuri").doc(docID)
      await docRef.get()
      .then((doc) => {
        if (doc.exists) {
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
      const randomKey = uuidv4()
      let docRef = db.collection("users").where('random', '>', randomKey).limit(1)
      let ifDocRef = db.collection("users").where('random', '<=', randomKey).limit(1)
      await docRef.get()
      .then(async (querySnapshot) => {
        //取得できなかったら違う条件で引く
        if(querySnapshot.empty){
          await ifDocRef.get()
          //違う条件で取得できたらの処理
          .then(async (querySnapshot2) => {
            //名前と画像取得
            self.enemyName = await querySnapshot2.docs[0].data()
            const docId = await querySnapshot2.docs[0].id
            //ステータス取得
            db.collection("sutefuri").doc(String(docId)).get()
            .then((doc) => {
              if (doc.exists) {
                self.enemy = doc.data()
                self.$set(self.enemy,'maxhp', self.enemy.hp)
              } else {
                console.log("違う条件No such document!")
              }
            })
          })
        //最初の条件で取得できたら
        }else{
          //名前と画像取得
          self.enemyName = await querySnapshot.docs[0].data()
          const docId = await querySnapshot.docs[0].id
          //ステータス取得
          db.collection("sutefuri").doc(String(docId)).get()
          .then((doc) => {
            if (doc.exists) {
              self.enemy = doc.data()
              self.$set(self.enemy,'maxhp', self.enemy.hp)
            } else {
              console.log("No such document!")
            }
          })
        }
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
  height: 88vh
  overflow: hidden
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
  background-image: url(../assets/battlebg.png)
  background-size: cover
  position: relative
  +mq(sp)
    margin-top: 40px
  +mq(pc)
    margin-top: 40px
  span
    display: block
  &__name
    background: #000
    border: 3px solid #FFF
    border-radius: 5px
    padding: 0 5px
    white-space: nowrap
    text-overflow: ellipsis
    overflow: hidden
  &__img
    opacity: 1
  &__hp
    width: 200px
    height: 20px
    margin: auto
    position: relative
    ::v-deep .maxHpGauge
      position: absolute
      top: 1px
      left: 1px
      width: 198px
      height: 18px
      margin: auto
      background: #14FF00
      &__enemyHp
        display: block
    ::v-deep #enemyMaxGauge
      position: absolute
      top: 0
      left: 0
      width: 200px
      height: 20px
      background-color: red
      border: 1px solid #FFF
  img
    width: 140px
    height: auto
    margin-top: 8px
    +mq(pc)
      margin-top: 16px
//攻撃エフェクト
::v-deep .enemyLottie
  position: absolute
  top: 50%
  left: 50%
  transform: translate(-50%, -50%)
.myCharacter
  text-align: center
  position: relative
  z-index: -1
  img
    width: 100px
    height: auto
    padding: 3px
    border: 3px solid #FFF
    border-radius: 5px
  &__hp
    width: 200px
    height: 20px
    margin: auto
    position: relative
    ::v-deep .maxHpGauge
      position: absolute
      top: 1px
      left: 1px
      width: 198px
      height: 18px
      margin: auto
      background: #14FF00
      &__myUserHp
        display: block
    ::v-deep #myMaxGauge
      position: absolute
      top: 0
      left: 0
      width: 200px
      height: 20px
      background-color: red
      border: 1px solid #FFF
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
//攻撃エフェクト
::v-deep .myUserLottie
  position: absolute
  top: 0%
  left: 50%
  transform: translate(-50%, 0%)

.message__container
  font-size: 13px
  width: 100%
  height: 130px
  border: 3px solid #FFF
  border-radius: 10px
  padding: 10px
  overflow: hidden
  overflow-y: scroll
  +mq(pc)
    margin-top: 16px
  p
    padding: 5px 10px
    margin: 0
    line-height: 2
.btn__container
  display: flex
  justify-content: space-between
  button
    margin-top: 5px
    padding: 10px
    border: 1px solid #FFF

.back
  color: #FFF
  cursor: pointer
  position: absolute
  bottom: 10%
  left: 50%
  transform: translate(-50%, -10%)

.fade-move
  transition: transform .5s
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