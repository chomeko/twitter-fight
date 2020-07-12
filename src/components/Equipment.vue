<template>
  <div id="equipment">
    <dl>
      <dt>E</dt>
      <dd v-if="addTitle[1]">{{addTitle[1]}}</dd>
      <dd v-else>{{addTitle[0]}}</dd>
    </dl>
    <dl>
      <dt>E</dt>
      <dd v-if="addTitle[2]">{{addTitle[2]}}</dd>
      <dd v-else>{{addTitle[0]}}</dd>

    </dl>
    <dl>
      <dt>E</dt>
      <dd v-if="addTitle[3]">{{addTitle[3]}}</dd>
      <dd v-else>{{addTitle[0]}}</dd>
    </dl>
    <dl>
      <dt>E</dt>
      <dd v-if="addTitle[4]">{{addTitle[4]}}</dd>
      <dd v-else>{{addTitle[0]}}</dd>
    </dl>
  </div>
</template>

<script>
export default {
  props: {
    addTitle: {
      required: false
    }
  }
}
</script>

<style lang="sass" scoped>
#equipment
  margin-top: 8px
  width: 100%
  height: 156px
  background: #000
  border: 3px solid #FFF
  border-radius: 10px
  margin-right: 5px
  dl
    margin: 11px 0
    display: flex
    font-size: 14px
    padding: 0 3px
  dd
    width: 126px
    margin: 0
    margin: auto
</style>