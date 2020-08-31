<template>
  <img :src='twitterImg'>
</template>

<script>
export default {
  props: {
    loginUser: {
      required: false
    }
  },
  computed:{
    twitterImg(){
      return this.loginUser.photoURL.split('_normal').join('')
    }
  },
}
</script>