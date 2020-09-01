<template>
  <div id="footer">
  <!-- バトル,装備、ガチャボタン -->
    <div class="menu__container">
      <!-- バトル -->
      <router-link :to="{ name: 'battle'}">
        <Button type="menu" size="menu--size">バトル</Button>
      </router-link>
      <!-- 装備 -->
      <Button v-if="!switchEquip" type="menu" size="menu--size" @myclick="Equipment">装備</Button>
      <Button v-else type="menu" size="menu--size" @myclick="Equipment">戻る</Button>
      <!-- ガチャボタン -->
      <router-link
        :to="{ name: 'gacha', params: { loginUser: loginUser, output: output.coin} }">
        <Button type="menu" size="menu--size">ガチャ</Button>
      </router-link>
    </div>
  </div>
</template>

<script>
  import Button from '../components/Button'
export default {
  props:{
    loginUser:{
      required: true
    },
    output:{
      required: true
    }
  },
  components: {
    Button
  },
  data(){
    return {
      switchEquip: false,
      // coin: 0
    }
  },
  methods: {
    //称号リスト表示
    Equipment(){
      this.switchEquip = !this.switchEquip
      this.$emit('emitEquipment',this.switchEquip)
    }
  }
}
</script>

<style lang="sass" scoped>
  .menu__container
    display: flex
    justify-content: center
    margin-top: 6px
    .menu
      &:nth-child(2)
        margin: 0px 10px
</style>