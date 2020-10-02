<template>
  <div id="gacha">
    <template v-if="!this.gachaStart">
      <Coin :output="output" class="coin"></Coin>
    </template>
    <template v-if="!this.gachaStart">
      <h2 class="neon">称号<span>ガチャ</span></h2>
      <div class="containerMenu">
        <p class="message">{{message}}</p>
        <Button type="menu" @myclick.once="Strat">１回100コイン</Button>
      </div>
      <router-link
        class="back"
        to=router.go(-1)
      >戻る
      </router-link>
    </template>
    <template v-if="this.gachaStart">
      <Gachapanchi :gachaGet=gachaGet :message=message></Gachapanchi>
    </template>
  </div>
</template>

<script>
import Button from '../components/Button'
import Gachapanchi from  '../components/Gachapanchi'
import Coin from '../components/Coin'
import firebase from 'firebase'
import { v4 as uuidv4 } from 'uuid'

export default {
  props:{
    loginUser:{
      required: false
    },
    output: {
      type: Number,
      required: false
    }
  },
  components: {
    Button,
    Gachapanchi,
    Coin
  },
  data(){
    return {
      gachaStart: false,
      titleRea: '',
      gachaGet: null,
      message: ''
    }
  },
  created(){
    this.db = firebase.firestore() // dbインスタンスを初期化
    if(this.output === undefined){
      this.$router.replace('/mypage')
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
    async Strat(){
      if(this.output >= 100){
        await this.updateCoin()
        const normal = 60
        const rare = 90
        const epic = 98
        const legend = 100
        //1~100
        const result = this.getRandom()
        //console.log(result)
        if(result <= normal){
          this.titleRea = 1
          await this.getGacha()
          //1~60
          console.log('ノーマル')
        }
        else if( result <= rare){
          this.titleRea = 2
          await this.getGacha()
          //61~90
          console.log('レア')
        }
        else if( result <= epic){
          this.titleRea = 3
          await this.getGacha()
          //91~98
          console.log('エピック')
        }
        else if( result <= legend){
          this.titleRea = 4
          await this.getGacha()
          //99~100
          console.log('legend')
        }
      }else{
        this.message = "コインが足りません"
        console.log(this.message)
      }
    },
    //ガチャを引く
    async getGacha(){
      let self = this
      const rea = this.titleRea
      const randomKey = uuidv4()
      let docRef = this.db.collection("titles").where('rea', '==', rea).where('random', '>', randomKey).limit(1)
      let ifDocRef = this.db.collection("titles").where('rea', '==', rea).where('random', '<=', randomKey).limit(1)
      await docRef.get()
      .then(async (querySnapshot) => {
        //取得できなかった違う条件で引く
        if(querySnapshot.empty){
          await ifDocRef.get()
          //違う条件で取得できたらの処理
          .then(async (querySnapshot2) => {
            self.gachaGet = await querySnapshot2.docs[0].data()
            self.gachaStart = true
            this.addEquipmentList(this.gachaGet)
          })
        //最初の条件で取得できたら
        }else{
          self.gachaGet = await querySnapshot.docs[0].data()
          self.gachaStart = true
          this.addEquipmentList(this.gachaGet)
        }
      })
    },
    //引いたガチャを自分の称号リスト(database)に追加
    addEquipmentList(gachaGet){
      let self = this
      const docID = String(this.loginUser.uid)
      const washingtonRef = this.db.collection('users').doc(docID).collection('titles').doc(gachaGet.id)
      this.db.runTransaction(function(transaction){
        return transaction.get(washingtonRef).then(function(docRef){
          //持っていなかったら追加
          if(!docRef.exists){
            transaction.set(washingtonRef,{
              id: gachaGet.id,
              rea: gachaGet.rea,
              random: gachaGet.random,
              property: gachaGet.property
            })
            self.message = `きみにぴったりな称号だ！`
            console.log('追加しました')
          }
          //持っていたら無駄になる
          else{
            console.log('持っている時の処理')
            // transaction.update(washingtonRef,{
            //   count: 1
            // })
            self.message = "残念既に持っているようだ。"
          }
        })
      })
      .then(() => {
        console.log('成功')
      })
      .catch(error => {
      console.log(error)
    })
    },
    //所持コインから引いてupdate
    updateCoin(){
      const resultCoin = this.output - 100
      const docID = String(this.loginUser.uid)
      this.db.collection('sutefuri').doc(docID)
      .update({
        coin: resultCoin
      })
    }
  }
}
</script>

<style lang="sass" scoped>
#gacha
  max-width: 400px
  padding: 10px
  margin: auto
  height: 85vh
  overflow: hidden
  position: relative
  h2
    position: absolute
    top: 40%
    left: 50%
    transform: translate(-50%, -40%)
  .coin
    left: 50%
    margin-top: 40px
    transform: translateX(-50%)

  .neon
    color: #FB4264
    font-size: 40px
    line-height: 7vw
    text-shadow: 0 0 3vw #F40A35
    span
      font-size: 35px

  .containerMenu
    position: absolute
    top: 80%
    left: 50%
    transform: translate(-50%, -80%)
    &:active
      transform: translate(-50%, -70%)
    .message
      //letter-spacing: .1px
      font-size: 14px

  .back
    position: absolute
    bottom: 5%
    left: 50%
    transform: translate(-50%, -5%)
    color: #FFF
    cursor: pointer

  .neon
    animation: neon 1s ease infinite
    -moz-animation: neon 1s ease infinite
    -webkit-animation: neon 1s ease infinite

  @keyframes neon
    0%,
    100%
      text-shadow: 0 0 1vw #FA1C16, 0 0 3vw #FA1C16, 0 0 10vw #FA1C16, 0 0 10vw #FA1C16, 0 0 .4vw #FED128, .5vw .5vw .1vw #806914
      color: #FED128
    50%
      text-shadow: 0 0 .5vw #800E0B, 0 0 1.5vw #800E0B, 0 0 5vw #800E0B, 0 0 5vw #800E0B, 0 0 .2vw #800E0B, .5vw .5vw .1vw #40340A
      color: #806914
</style>

