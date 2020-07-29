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
      <transition-group name="fade">
        <CharaInformation
          v-if="!equipment"
          :output="output"
          :loginuser="loginUser"
          key="CharaInformation"
        ></CharaInformation>
        <EquipmentList
          v-if="equipment"
          :equipmentTitles="equipmentTitles"
          @addTitleToStatus="emitEvent"
          key="equipment"
        >
      </EquipmentList>
      </transition-group>
      <div class="components__flex">
        <!-- ここのv-ifはaddTitleをキャラ作成時配列(空)をdatabaseに登録してるからv-ifはtureになり
        Equipment内のv-if="addTitle.equip[0]"などのerrorを回避する目的 -->
        <Equipment v-if="addTitle.equip" :addTitle="addTitle"></Equipment>
        <CharaStatus :output="output"></CharaStatus>
      </div>
    </template>

    <!-- 固定画像 -->
    <transition
      enter-active-class="animate__animated animate__tada"
      appear
    >
      <div class="user__image" v-if="!equipment">
        <img v-if="loginUser.photoURL" :src='twitterImg'>
      </div>
    </transition>

    <Footer v-if="oldSutefuri" :equipment="equipment" @emitEquipment="footerEmit"></Footer>
  </div>
</template>

<script>
import firebase from 'firebase'
import _ from 'lodash'
import Button from '../components/Button'
import NewStatus from '../components/NewStatus'
import CharaStatus from '../components/CharaStatus'
import CharaInformation from '../components/CharaInformation'
import EquipmentList from '../components/EquipmentList'
import Equipment from '../components/Equipment'
import Footer from '../components/Footer'



export default {
  components: {
    Button,
    NewStatus,
    CharaStatus,
    CharaInformation,
    EquipmentList,
    Equipment,
    Footer
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
      equipment: false,
      // ユーザーの持ってる称号の入れ物
      equipmentTitles: [],
      //ユーザーの持ってる称号をクリックして装備
      addTitle: []
    }
  },
  //mount時にローカルストレージから状態を取得して現在のdataにする
  mounted(){
    if (localStorage.welcomHome) {
      this.welcomHome = this.$localStorage.get('welcomHome')
    }
    if (localStorage.beforeSutefuri) {
      this.beforeSutefuri = this.$localStorage.get('beforeSutefuri')
    }
    if (localStorage.oldSutefuri) {
      this.oldSutefuri = this.$localStorage.get('oldSutefuri')
    }
    //mount時にユーザー情報を取得して表示
    firebase.auth().onAuthStateChanged(async user => {
      if (user){
        this.loginUser = user//ユーザー情報
        this.get()//databaseからキャラクター情報取得
        await this.getTitles()//ユーザーの持ってる称号リストを取得
        await this.userEquipTitle()//ユーザーが装備してる称号を取得
      }
    })
  },
  //描画の状態をローカルストレージに保持
  watch: {
    welcomHome() {
      this.welcomHome = this.$localStorage.set('welcomHome',this.welcomHome)
    },
    beforeSutefuri() {
      this.beforeSutefuri = this.$localStorage.set('beforeSutefuri',this.beforeSutefuri)
    },
    oldSutefuri() {
      this.oldSutefuri = this.$localStorage.set('oldSutefuri',this.oldSutefuri)
    },
    outputUpdate(){
      this.output
    }
  },
  created() {
    this.db = firebase.firestore() // dbインスタンスを初期化
  },
  computed:{
    twitterImg(){
      return this.loginUser.photoURL.split('_normal').join('')
    }
  },
  methods: {
    //送られてきた称号名をMax５件まで保存できる処理と
    //称号装備画面から送られてきた称号を基礎ステータスに足す処理
    emitEvent(addTitleToStatus){
      //称号装備画面から送られてきた称号を再度クリックすると称号分のステータスを引く処理
      //配列に称号があればtrueなければfalse
      if(this.addTitle.equip.some( target => target.id === addTitleToStatus.id)){
        const index = this.addTitle.equip.findIndex(({id}) => id === addTitleToStatus.id)
        this.addTitle.equip.splice(index,1)
        this.DeleteEquipTitles(addTitleToStatus)
        if (addTitleToStatus.property.hp) {
          this.output.hp = this.output.hp - addTitleToStatus.property.hp
        }
        if (addTitleToStatus.property.attack) {
          this.output.attack = this.output.attack - addTitleToStatus.property.attack
        }
        if (addTitleToStatus.property.defence) {
          this.output.defence = this.output.defence - addTitleToStatus.property.defence
        }
        if (addTitleToStatus.property.avoidance) {
          this.output.avoidance = this.output.avoidance - addTitleToStatus.property.avoidance
        }
        if (addTitleToStatus.property.speed) {
          this.output.speed = this.output.speed - addTitleToStatus.property.speed
        }
        this.userSutefuri()
      }
      else {
        //称号装備画面から送られてきた称号を5件まで追加して基礎ステータスに足す処理
        if(this.addTitle.equip.length < 5){
          this.addTitle.equip.push(addTitleToStatus)
          this.addEquipTitles(addTitleToStatus)
          if (addTitleToStatus.property.hp) {
            this.output.hp = this.output.hp + addTitleToStatus.property.hp
          }
          if (addTitleToStatus.property.attack) {
            this.output.attack = this.output.attack + addTitleToStatus.property.attack
          }
          if (addTitleToStatus.property.defence) {
            this.output.defence = this.output.defence + addTitleToStatus.property.defence
          }
          if (addTitleToStatus.property.avoidance) {
            this.output.avoidance = this.output.avoidance + addTitleToStatus.property.avoidance
          }
          if (addTitleToStatus.property.speed) {
            this.output.speed = this.output.speed + addTitleToStatus.property.speed
          }
          this.userSutefuri()
        }
      }
    },
    footerEmit(emitEquipment){
      this.equipment = emitEquipment
    },
    //基礎キャラクターステータス作成時
    createCharacter() {
      this.character.hp = _.random(500)
      this.character.attack = _.random(100)
      this.character.defense = _.random(100)
      this.character.avoidance = _.random(100)
      this.character.speed = _.random(100)
      this.welcomHome = false
      this.beforeSutefuri = true
    },
    //基礎ステータス確定してdatabaseに登録
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
      await this.addEmptyTitle()
      await this.get()
      this.beforeSutefuri = false
      this.oldSutefuri = true
    },
    //初期装備データ空を登録する
    async addEmptyTitle(){
      const self = this
      const docID = String(this.loginUser.providerData[0].uid)
      const washingtonRef = this.db.collection('sutefuri').doc(docID).collection('equip').doc('装備枠')
      await washingtonRef.set({equip: this.addTitle})
      washingtonRef.get()
      .then((doc) => {
        self.addTitle = doc.data()
        console.log('空称号を追加しデータを取得しました')
      })
      .catch((error) => {
        console.log(error);
      })
    },
    //databaseからキャラクター情報取得
    async get(){
      let self = this
      let docID = String(this.loginUser.providerData[0].uid)
      let docRef = this.db.collection("sutefuri").doc(docID)
      await docRef.get()
      .then((doc) => {
        if (doc.exists) {
          console.log('doc.data()')
          self.output = doc.data()
        } else {
          console.log("No such document!")
        }
      })
      .catch(function(error) {
        console.log("Error getting document:", error);
      })
    },
    //ユーザーの持ってる称号リストを取得
    async getTitles() {
      let docID = String(this.loginUser.providerData[0].uid)
      let docRef = this.db.collection("users").doc(docID).collection("titles").orderBy('rea', 'asc')
      const querySnapshot = await docRef.get()
      const data = querySnapshot.docs.map(doc => {
        return doc.data()
      })
      console.log('称号取得完了しました')
      this.equipmentTitles = data
    },
    //ユーザーが装備してる称号を取得
    async userEquipTitle(){
      let self = this
      const docID = String(this.loginUser.providerData[0].uid)
      await this.db.collection('sutefuri').doc(docID).collection('equip')
      .get()
      .then((doc) => {
        doc.forEach((doc) => {
          self.addTitle = doc.data()
          console.log('装備してる称号を取得しました')
        })
      })
      .catch(function(error) {
          console.log("Error getting document:", error)
      })
    },
    //ユーザーが装備した称号のステータスを反映
    userSutefuri(){
      const docID = String(this.loginUser.providerData[0].uid)
      this.db.collection('sutefuri').doc(docID)
      .update({
        hp: this.output.hp,
        attack: this.output.attack,
        defense: this.output.defense,
        avoidance: this.output.avoidance,
        speed: this.output.speed,
      })
      .then(
        console.log('ステータス更新')
      )
      .catch((error) => {
        console.log(error);
      })
    },
    //ユーザーが装備した称号をdatabaseに登録
    addEquipTitles(addTitleToStatus){
      const docID = String(this.loginUser.providerData[0].uid)
      const washingtonRef = this.db.collection('sutefuri').doc(docID).collection('equip').doc('装備枠')
      washingtonRef.update({equip: firebase.firestore.FieldValue.arrayUnion(addTitleToStatus)})
      .then(
        console.log('称号を追加しました')
      )
      .catch((error) => {
        console.log(error);
      })
    },
    //ユーザーが装備した称号を削除して外す
    DeleteEquipTitles(addTitleToStatus){
      const docID = String(this.loginUser.providerData[0].uid)
      const washingtonRef = this.db.collection('sutefuri').doc(docID).collection('equip').doc('装備枠')
      washingtonRef.update({equip: firebase.firestore.FieldValue.arrayRemove(addTitleToStatus)})
      .then(
        console.log('称号を削除しました')
      )
      .catch((error) => {
        console.log(error);
      })
    }
  }
}
</script>

<style lang="sass" scoped>
  #mypage
    max-width: 400px
    height: 100%
    padding: 10px
    margin: auto
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
    width: 120px
    height: auto
    margin: auto
    margin-top: 30px
    margin-bottom: 24px
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

  .components__flex
    display: flex
    justify-content: space-between

  .fade-move
    transition: transform 1s
  .fade-enter,
  .fade-leave-to
    opacity: 0
  .fade-enter-active
    transition: opacity .5s
  .fade-leave-active
    transition: opacity .5s
    position: absolute
</style>