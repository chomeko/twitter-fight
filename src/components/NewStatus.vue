<template>
  <div id="status">
    <div class="user__status">
      <dl>
        <dt>最大HP :</dt>
        <dd>{{character.hp}}</dd>
      </dl>
      <dl>
        <dt>攻撃力 :</dt>
        <dd>{{character.attack}}</dd>
      </dl>
      <dl>
        <dt>防御力 :</dt>
        <dd>{{character.defense}}</dd>
      </dl>
      <dl>
        <dt>回避力 :</dt>
        <dd>{{character.avoidance}}</dd>
      </dl>
      <dl>
        <dt>素早さ :</dt>
        <dd>{{character.speed}}</dd>
      </dl>
    </div>
  </div>
</template>

<script>

export default {
  props: ['character']
}
</script>

<style lang="sass" scoped>
#status
  margin-top: 8px
.user__status
  width: 200px
  height: auto
  background: #000
  border: 3px solid #FFF
  border-radius: 10px
  margin: 0 0 0 auto
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
</style>