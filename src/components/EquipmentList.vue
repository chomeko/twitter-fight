<template>
  <div id="equipment">
    <div class="equipmentTitle">
      <h2>称号リスト</h2>
      <hr>
      <ul>
        <li v-for="(equipmentTitle, index) in equipmentTitles" :key="index" @click="addTilteToStatus(index)">
          <span>{{equipmentTitle.id}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    equipmentTitles: {
      type: Array,
      required: true
    }
  },
  methods: {
    addTilteToStatus(index){
      const status = this.equipmentTitles[index].property
      const id = this.equipmentTitles[index].id
      this.$emit('addTitleToStatus',{status,id})
    }
  }
}
</script>

<style lang="sass" scoped>
  #equipment
    width: 100%
    height: auto
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