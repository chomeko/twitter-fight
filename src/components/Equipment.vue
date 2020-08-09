<template>
  <div id="equipment">
    <dl>
      <dt>E</dt>
      <transition name="fade" mode="out-in">
        <AddTitle v-if="addTitle.equip[0]" v-bind="addTitle.equip[0]"></AddTitle>
        <dd v-else>なし</dd>
      </transition>
    </dl>
    <dl>
      <dt>E</dt>
      <transition name="fade" mode="out-in">
        <AddTitle v-if="addTitle.equip[1]" key="title1" v-bind="addTitle.equip[1]"></AddTitle>
        <dd v-else>なし</dd>
      </transition>
    </dl>
    <dl>
      <dt>E</dt>
      <transition name="fade" mode="out-in">
        <AddTitle v-if="addTitle.equip[2]" key="title1" v-bind="addTitle.equip[2]"></AddTitle>
        <dd v-else>なし</dd>
      </transition>
    </dl>
    <dl>
      <dt>E</dt>
      <transition name="fade" mode="out-in">
        <AddTitle v-if="addTitle.equip[3]" key="title1" v-bind="addTitle.equip[3]"></AddTitle>
        <dd v-else>なし</dd>
      </transition>
    </dl>
  </div>
</template>

<script>
import AddTitle from '../components/AddTitle'

export default {
  components: {
    AddTitle
  },
  props: {
    addTitle: {
      required: true
    }
  }
}
</script>

<style lang="sass" scoped>
#equipment
  margin-top: 8px
  width: 160px
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

  .white
    color: white
  .blue
    color: #538fff
  .purple
    color: #9D00FF
  .pink
    color: #FF00E2

  .fade-enter,
  .fade-leave-to
    opacity: 0
  .fade-enter-active
    transition: opacity .1s
  .fade-leave-active
    transition: opacity .1s
</style>