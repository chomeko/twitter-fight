<template>
  <div id="mypage">
    <!-- 初期ログイン後に表示 -->
    <div v-if="!status">
      <transition
        enter-active-class="animate__animated animate__zoomInDown"
        appear
      >
        <h2 v-if="newStatus">ついふぁいへ<br>ようこそ！</h2>
      </transition>
      <p class="explanation" v-if="loginUser">{{loginUser.displayName}}の<br>キャラステータスを作って<span>TwitterNO.1</span>を目指そう</p>
      <div class="userstatus" v-if="newStatus">
        <Button type="userStatus" @myclick="createCharacter">キャラステータス作成</Button>
      </div>
    </div>

    <!-- キャラクターステータス作成画面 -->
    <template v-if="BeforeStauts">
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
    <CharaInformation v-if="status" :output="output" :loginuser="loginUser"></CharaInformation>
    <CharaStatus v-if="status" :inputDocRef="inputDocRef" :output="output"></CharaStatus>
    <transition
      name="fade"
      enter-active-class="animate__animated animate__tada"
      appear
    >
      <div class="user__image" v-if="loginUser">
        <img :src='loginUser.photoURL'>
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

export default {
  components: {
    Button,
    NewStatus,
    CharaStatus,
    CharaInformation
  },
  data(){
    return {
      db : null,
      //twitter情報
      loginUser: {},
      //ついふぁいにようこそ表示
      newStatus: true,
      //ステータス確定前表示
      BeforeStauts: false,
      //ステータス表示非表示
      status: false,
      //キャラステータス
      character: {
        lv: 1,
        id: '',
        hp: 0,
        attack: 0,
        defense: 0,
        avoidance: 0,
        speed: 0,
        exp: 100
      },
      //db関連
      inputDocRef: '', // 保存したデータのIDを入れる（1件だけ取得する時に使う）
      output: '', // 保存したデータをgetで取得したもの
    }
  },
  mounted(){
    firebase.auth().onAuthStateChanged(user => {
      this.loginUser = user
    })
  },
  created() {
    this.db = firebase.firestore(); // dbインスタンスを初期化
  },
  methods: {
    createCharacter() {
      this.character.hp = _.random(500)
      this.character.attack = _.random(100)
      this.character.defense = _.random(100)
      this.character.avoidance = _.random(100)
      this.character.speed = _.random(100)
      this.newStatus = false
      this.BeforeStauts = true
    },
    async okCharacter(){
      let self = this
      await this.db.collection('status')
      .add({
        id: this.character.id + 1,
        lv: this.character.lv,
        hp: this.character.hp,
        attack: this.character.attack,
        defense: this.character.defense,
        avoidance: this.character.avoidance,
        speed: this.character.speed,
      })
      .then((docRef) => {
        console.log('キャラクター作成完了しました', docRef.id);
        self.inputDocRef = docRef.id
        console.log(self.inputDocRef);
      })
      .catch((error) => {
        console.log(error);
      })
      await this.get()
      this.BeforeStauts = false
      this.status = true
    },
    async get(){
      let self = this
      let docRef = this.db.collection("status").doc(this.inputDocRef)
      await docRef.get().then((doc) => {
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
    padding: 0 24px 10px
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