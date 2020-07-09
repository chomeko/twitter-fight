<template>
  <div id="equipment">
    <div class="equipmentTitle">
      <h2>称号リスト</h2>
      <hr>
      <ul>
        <li v-for="(equipmentTitle, index) in equipmentTitles" :key="index">
          <span>{{equipmentTitle}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>

export default {
  data(){
    return {
      equipmentTitles: [
        'うんこ',
        'うんこ',
        'うんこ',
        '口が臭い奴',
        'フロントエンジニア',
        'フロントエンジニア',
        'フロントエンジニア',
        '神殺し',
        '最強の勇者',
        '最強の勇者',
        '最強の勇者',
        '最強の勇者',
        '最強の勇者'
      ]
    }
  }
}
</script>

<style lang="sass" scoped>
  #equipment
    width: 100%
    height: 320px
    padding: 5px 10px
    background: #000
    border: solid 3px #FFF
    border-radius: 10px

  h2
    font-size: 24px
    margin: 0

  ul
    display: flex
    -webkit-justify-content: space-between
    justify-content: space-between
    flex-wrap: wrap

  li
    width: 50%
    padding-left: 15px
    line-height: 2.2
    span
      &:hover
        cursor: pointer
        opacity: .7
</style>