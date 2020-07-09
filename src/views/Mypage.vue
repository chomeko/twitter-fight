<template>
  <div id="mypage">
    <!-- 初期ログイン後に表示 -->
    <div v-if="welcomHome">
      <transition
        enter-active-class="animate__animated animate__zoomInDown"
        appear
      >
        <h2>ついふぁいへ<br>ようこそ！</h2>
      </transition>
      <p class="explanation" v-if="loginUser">{{loginUser.displayName}}の<br>キャラステータスを作って<span>TwitterNO.1</span>を目指そう</p>
      <div class="userstatus">
        <Button type="userStatus" @myclick="createCharacter">キャラステータス作成</Button>
      </div>
    </div>

    <!-- キャラクターステータス作成画面 -->
    <template v-if="beforeSutefuri">
      <div class="before__status">
        <NewStatus :character="character"></NewStatus>
      </div>
      <div class="statusButton">
        <Button type="userStatus" @myclick="createCharacter">やり直す</Button>
        <Button type="userStatus" @myclick="okCharacter">確定する</Button>
        <p>このステータスでよいか？</p>
      </div>
    </template>
    <!-- キャラクターステータス確定後 -->
    <template v-if="oldSutefuri">
      <CharaInformation v-if="!equipment" :output="output" :loginuser="loginUser"></CharaInformation>
      <Equipment v-if="equipment"></Equipment>
      <CharaStatus :output="output"></CharaStatus>

      <router-link to="/Battle">
        <Button>バトル</Button>
      </router-link>

      <Button @myclick="Equipment">装備</Button>

      <router-link to="/Gacha">
        <Button>ガチャ</Button>
      </router-link>
    </template>
    <!-- 固定画像 -->
    <transition
      name="fade"
      enter-active-class="animate__animated animate__tada"
      appear
    >
      <div class="user__image" v-if="loginUser">
        <img v-if="!equipment" :src='loginUser.photoURL'>
      </div>
    </transition>
  </div>
</template>

<script>
import firebase from 'firebase'
import _ from 'lodash'
import Button from '../components/Button'
import NewStatus from '../components/NewStatus'
import CharaStatus from '../components/CharaStatus'
import CharaInformation from '../components/CharaInformation'
import Equipment from '../components/Equipment'


export default {
  components: {
    Button,
    NewStatus,
    CharaStatus,
    CharaInformation,
    Equipment
  },
  localStorage: {
    welcomHome: {
      type: Boolean,
      default: true
    },
    beforeSutefuri: {
      type: Boolean,
      default: false
    },
    oldSutefuri: {
      type: Boolean,
      default: false
    }
  },
  data(){
    return {
      db : null,
      //twitter情報
      loginUser: {},
      //ついふぁいにようこそ表示
      welcomHome: true,
      //ステータス確定前表示
      beforeSutefuri: false,
      //ステータス表示
      oldSutefuri: false,
      //キャラステータス
      character: {
        lv: 1,
        hp: 0,
        attack: 0,
        defense: 0,
        avoidance: 0,
        speed: 0,
        exp: 0
      },
      //db関連
      output: '', // 保存したデータをgetで取得したもの
      //装備画面表示
      equipment: false
    }
  },
  async mounted(){
    if (localStorage.welcomHome) {
      this.welcomHome = this.$localStorage.get('welcomHome')
    }
    if (localStorage.beforeSutefuri) {
      this.beforeSutefuri = this.$localStorage.get('beforeSutefuri')
    }
    if (localStorage.oldSutefuri) {
      this.oldSutefuri = this.$localStorage.get('oldSutefuri')
    }

    await firebase.auth().onAuthStateChanged(user => {
      if (user){
        this.loginUser = user
        this.get()
      }
    })
  },
  watch: {
    welcomHome() {
      this.welcomHome = this.$localStorage.set('welcomHome',this.welcomHome)
    },
    beforeSutefuri() {
      this.beforeSutefuri = this.$localStorage.set('beforeSutefuri',this.beforeSutefuri)
    },
    oldSutefuri() {
      this.oldSutefuri = this.$localStorage.set('oldSutefuri',this.oldSutefuri)
    }
  },
  created() {
    this.db = firebase.firestore(); // dbインスタンスを初期化
  },
  methods: {
    Equipment(){
      this.equipment = !this.equipment
    },
    createCharacter() {
      this.character.hp = _.random(500)
      this.character.attack = _.random(100)
      this.character.defense = _.random(100)
      this.character.avoidance = _.random(100)
      this.character.speed = _.random(100)
      this.welcomHome = false
      this.beforeSutefuri = true
    },
    async okCharacter(){
      const docID = String(this.loginUser.providerData[0].uid)
      await this.db.collection('sutefuri').doc(docID)
      .set({
        lv: this.character.lv,
        hp: this.character.hp,
        attack: this.character.attack,
        defense: this.character.defense,
        avoidance: this.character.avoidance,
        speed: this.character.speed,
        exp: this.character.exp
      })
      .then(
        console.log('キャラクター作成完了しました')
      )
      .catch((error) => {
        console.log(error);
      })
      await this.get()
      this.beforeSutefuri = false
      this.oldSutefuri = true
    },
    async get(){
      let self = this
      let docID = String(this.loginUser.providerData[0].uid)
      let docRef = this.db.collection("sutefuri").doc(docID)
      await docRef.get()
      .then((doc) => {
        if (doc.exists) {
          console.log('doc.data()')
          self.output = doc.data();
        } else {
          console.log("No such document!");
        }
      })
      .catch(function(error) {
          console.log("Error getting document:", error);
      })
    }
  }
}
</script>

<style lang="sass" scoped>
  #mypage
    width: 100%
    height: 100%
    padding: 10px
  h2
    text-align: center
    margin: 0
    font-size: 40px
    margin-top: 88px
  .explanation
    width: 100%
    border: 3px solid #FFF
    border-radius: 10px
    padding: 10px
    margin-top: 80px
    span
      color: #FFE600
      font-size: 18px
  .user__image
    width: 80px
    height: auto
    margin: auto
    padding-top: 24px
  img
    width: 100%
  .userstatus
    padding-top: 40px
    text-align: center
  .statusButton
    text-align: center
    margin-top: 40px
    .userStatus
      &:nth-child(1)
        margin-right: 40px
  .before__status
    margin-top: 20px
    display: flex
    justify-content: center
</style>