<template>
  <div class="user__information">
    <p v-if="loginuser">{{loginuser.displayName}}</p>
    <p>Lv： {{output.lv}}</p>
    <p>EXP</p>
    <p>次のレベルまであと{{output.exp}}exp</p>
  </div>
</template>

<script>
export default {
  props: ["output", "loginuser"]
}
</script>

<style lang="sass" scoped>
  .user__information
    height: auto
    background: #000
    border: 3px solid #FFF
    border-radius: 10px
    padding-left: 20px
    margin-top: 8px
    p
      margin: 5px 0
</style>