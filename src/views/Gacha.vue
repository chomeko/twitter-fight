<template>
  <div id="gacha">
    <template v-if="!this.gachaStart">
      <h2 class="neon">称号<span>ガチャ</span></h2>
      <Button type="menu" @myclick="Strat">１回500コイン</Button>
      <router-link
        class="back"
        to=router.go(-1)
      >戻る
      </router-link>
    </template>
    <template v-if="this.gachaStart">
      <Gachapanchi :gachaGet=gachaGet></Gachapanchi>
    </template>
  </div>
</template>

<script>
import Button from '../components/Button'
import Gachapanchi from  '../components/Gachapanchi'
import firebase from 'firebase'
import { v4 as uuidv4 } from 'uuid'

export default {
  props:{
    loginUid:{
      type: String,
      required: false
    }
  },
  components: {
    Button,
    Gachapanchi
  },
  data(){
    return {
      gachaStart: false,
      titleRea: '',
      gachaGet: null
    }
  },
  created(){
    this.db = firebase.firestore() // dbインスタンスを初期化
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
      //配列
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
        if(querySnapshot.empty){
          await ifDocRef.get()
          .then((querySnapshot2) => {
            self.gachaGet = querySnapshot2.docs[0].data()
            self.gachaStart = true
            this.addEquipmentList(this.gachaGet)
            //console.log(self.gachaGet)
            //console.log('>')
          })
        }else{
          self.gachaGet = await querySnapshot.docs[0].data()
          self.gachaStart = true
          this.addEquipmentList(this.gachaGet)
          //console.log(self.gachaGet)
          //console.log('<=')
        }
      })
    },
    //引いたガチャを自分の称号リスト(database)に追加
    addEquipmentList(gachaGet){
      const docID = this.loginUid
      const washingtonRef = this.db.collection('users').doc(docID).collection('titles').doc(gachaGet.id)
      this.db.runTransaction(function(transaction){
        return transaction.get(washingtonRef).then(function(docRef){
          const gachaData = docRef.data()
          //持っていなかったら追加
          if(!docRef.exists){
            washingtonRef.set(gachaGet)
            console.log('追加しました')
          }
          //countが0より大きかったら１プラスする。
          else if(gachaData.count){
            console.log('カウント０より大きい時の処理')
            transaction.update(washingtonRef,{
                count: gachaData.count + 1
              })
            //ステータスがあれば基礎ステータスの半分をプラスする（1.5倍）
            if(gachaData.property.speed){
              console.log('speed1.5倍の処理')
              transaction.update(washingtonRef,{
                speed: gachaData.speed + gachaData.property.speed / 2
              })
            }
            if(gachaData.property.avoidance){
              console.log('avoidance1.5倍の処理')
              transaction.update(washingtonRef,{
                avoidance: gachaData.avoidance + gachaData.property.avoidance / 2
              })
            }
          }
          //カウントが０だった場合１プラス。各ステータスに基礎ステータス1.5倍プラス。
          else{
            console.log('カウントが0の時の処理')
            transaction.update(washingtonRef,{
              count: 1
            })
            if(gachaData.property.speed){
              console.log('speedプロパティに基礎ステータスの半分')
              transaction.update(washingtonRef,{
                speed: gachaData.property.speed / 2
              })
            }
            if(gachaData.property.avoidance){
              console.log('avoidance1.5倍の処理')
              transaction.update(washingtonRef,{
                avoidance: gachaData.property.avoidance / 2
              })
            }
          }
        })
        //.then(console.log('できた'))
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
  height: 90vh
  overflow: hidden
  position: relative
  h2
    position: absolute
    top: 40%
    left: 50%
    transform: translate(-50%, -40%)

  .neon
    color: #FB4264
    font-size: 40px
    line-height: 7vw
    text-shadow: 0 0 3vw #F40A35
    span
      font-size: 35px

  .menu
    position: absolute
    top: 80%
    left: 50%
    transform: translate(-50%, -80%)
    &:active
      transform: translate(-50%, -70%)

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

