<template>
  <div id="status">
    <div class="user__status">
      <dl>
        <dt>最大HP :</dt>
        <dd key="hp">{{output.hp}}</dd>
      </dl>
      <dl>
        <dt>攻撃力 :</dt>
        <dd>{{output.attack}}</dd>
      </dl>
      <dl>
        <dt>防御力 :</dt>
        <dd>{{output.defense}}</dd>
      </dl>
      <dl>
        <dt>回避力 :</dt>
        <dd>{{output.avoidance}}</dd>
      </dl>
      <dl>
        <dt>素早さ :</dt>
        <dd>{{output.speed}}</dd>
      </dl>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    output: {
      required: true
    }
  }
}
</script>

<style lang="sass" scoped>
#status
  margin-top: 8px
.user__status
  width: 100%
  height: auto
  background: #000
  border: 3px solid #FFF
  border-radius: 10px
  dl
    display: flex
    margin: 5px 0
    padding: 0 40px
  dt
    width: 70px
    text-align: right
  dd
    //width: 100px
    margin-inline-start: 10px

.fade-enter,
.fade-leave-to
  opacity: 0
.fade-enter-active
  transition: opacity .5s
.fade-leave-active
  transition: opacity .5s
  position: absolute
</style>