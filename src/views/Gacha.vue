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
      <Gachapanchi :gachaGet=gachaGet :message=message></Gachapanchi>
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
      gachaGet: null,
      message: ''
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
          .then(async (querySnapshot2) => {
            self.gachaGet = await querySnapshot2.docs[0].data()
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
      let self = this
      const docID = this.loginUid
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
          //countがあれば+1をしていく
          else if(docRef.data().count){
            const count = docRef.data().count + 1
            const resultHp = docRef.data().hp + docRef.data().property.hp / 2
            const resultAttack = docRef.data().attack + docRef.data().property.attack / 2
            const resultDefense = docRef.data().defense + docRef.data().property.defense / 2
            const resultAvoidance = docRef.data().avoidance + docRef.data().property.avoidance / 2
            const resultSpeed = docRef.data().speed + docRef.data().property.speed / 2
            console.log('カウント+1しました')
            transaction.update(washingtonRef,{
                count: count
              })
            //ステータスがあれば基礎ステータスの半分をプラスする（1.5倍）
            if(docRef.data().property.hp){
              console.log('hp1.5倍の処理')
              transaction.update(washingtonRef,{
                hp: resultHp
              })
            }
            if(docRef.data().property.attack){
              console.log('attack1.5倍の処理')
              transaction.update(washingtonRef,{
                attack: resultAttack
              })
            }
            if(docRef.data().property.defense){
              console.log('defense1.5倍の処理')
              transaction.update(washingtonRef,{
                defense: resultDefense
              })
            }
            if(docRef.data().property.avoidance){
              console.log('avoidance1.5倍の処理')
              transaction.update(washingtonRef,{
                avoidance: resultAvoidance
              })
            }
            if(docRef.data().property.speed){
              console.log('speed1.5倍の処理')
              transaction.update(washingtonRef,{
                speed: resultSpeed
              })
            }
            self.message = `既に持っている。${docRef.data().id}+${count}になりステータスが更に1.5倍になった`
          }
          //カウントなければカウントに1を持たす。各ステータスを追加して基礎ステータスの半分を入れる。
          else{
            const hp = docRef.data().property.hp / 2
            const attack = docRef.data().property.attack / 2
            const defense = docRef.data().property.defense / 2
            const avoidance = docRef.data().property.avoidance / 2
            const speed = docRef.data().property.speed / 2
            console.log('カウントがない時の処理')
            transaction.update(washingtonRef,{
              count: 1
            })
            if(docRef.data().property.hp){
              console.log('hpプロパティに基礎ステータスの半分')
              transaction.update(washingtonRef,{
                hp: hp
              })
            }
            if(docRef.data().property.attack){
              console.log('attackプロパティに基礎ステータスの半分')
              transaction.update(washingtonRef,{
                attack: attack
              })
            }
            if(docRef.data().property.defense){
              console.log('defenseプロパティに基礎ステータスの半分')
              transaction.update(washingtonRef,{
                defense: defense
              })
            }
            if(docRef.data().property.avoidance){
              console.log('avoidanceプロパティに基礎ステータスの半分')
              transaction.update(washingtonRef,{
                avoidance: avoidance
              })
            }
            if(docRef.data().property.speed){
              console.log('speedプロパティに基礎ステータスの半分')
              transaction.update(washingtonRef,{
                speed: speed
              })
            }
            self.message = `既に持っている。${docRef.data().id}+1になりステータスが更に1.5倍になった`
          }
        })
      })
      .then(() => {
        //self.message = '既に持っている。ステータスが1.5倍になった'
        console.log('成功')
      })
      .catch(error => {
      console.log(error)
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

