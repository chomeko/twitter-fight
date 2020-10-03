<template>
  <div id="equipment">
    <h2>称号リスト</h2>
    <hr>
    <ul>
      <li v-for="(equipmentTitle, index) in equipmentTitles" :key="index">
        <span :class="fontColor(equipmentTitle)" @click="addTilteToStatus(index)">{{equipmentTitle.id}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import firebase from 'firebase'

export default {
  props: {
    loginUser: {
      type: String,
      required: false
    }
  },
  data(){
    return {
      // ユーザーの持ってる称号の入れ物
      equipmentTitles: [],
      classNormal: 'white',
      classRea: 'blue',
      classEpic: 'orange',
      classLegend: 'pink'
    }
  },
  created() {
    this.db = firebase.firestore() // dbインスタンスを初期化
  },
  mounted(){
    this.getTitles()
  },
  methods: {
    //ユーザーの持ってる称号リストを取得
    async getTitles() {
      let docID = String(this.loginUser)
      let docRef = this.db.collection("users").doc(docID).collection("titles").orderBy('rea', 'asc')
      const querySnapshot = await docRef.get()
      const data = querySnapshot.docs.map(doc => {
        return doc.data()
      })
      //console.log('称号取得完了しました')
      this.equipmentTitles = data
    },
    // ノーマル: 1
    // レア: 2
    // エピック: 3
    // レジェンド: 4
    addTilteToStatus(index){
      const status = this.equipmentTitles[index]
      this.$emit('addTitleToStatus',status)
    },
    fontColor(equipmentTitle){
      if (equipmentTitle.rea === 2){
        return this.classRea
      }
      else if (equipmentTitle.rea === 3){
        return this.classEpic
      }
      else if (equipmentTitle.rea === 4){
        return this.classLegend
      }
      else{
        return this.classNormal
      }
    }
  }
}
</script>

<style lang="sass" scoped>

  #equipment
    width: 100%
    padding: 5px 10px
    background: #000
    border: solid 3px #FFF
    border-radius: 10px

  h2
    font-size: 24px
    margin: 0

  ul
    display: flex
    flex-direction: column
    flex-wrap: wrap
    line-height: 1.5
    height: 16px * 1.5 * 11

  li
    width: 50%
    margin: 8px 0
  span
    letter-spacing: -2px
    &:hover
      cursor: pointer
      opacity: .5
      padding: 1px
      margin: 0
      border-radius: 3px
      border: 1px solid #FFF

  .white
    color: white
  .blue
    color: #538fff
  .orange
    color: #ff8300
  .pink
    color: #ff11e0
</style>