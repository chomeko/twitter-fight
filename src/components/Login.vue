<template>
  <div class="button-center">
    <!-- <router-link :to="{name: 'mypage', params: { loginUser }}"> -->
    <Button
      type="twitter"
      @myclick="login"
      >Twitterログイン</Button>
    <!-- </router-link> -->
  </div>

</template>

<script>
import firebase from 'firebase'
import Button from '../components/Button'
import { v4 as uuidv4 } from 'uuid'

export default {
  components: {
    Button
  },
  methods: {
    login(){
      const provider = new firebase.auth.TwitterAuthProvider()
      firebase.auth().signInWithPopup(provider)
      .then((result) =>{
        console.log('ログインに成功しました')
        const user = result.user
        if (user) {
          const db = firebase.firestore()
          const docID = String(user.providerData[0].uid)
          const randomKey = uuidv4()

          db.collection('users').doc(docID)
          .set({
            displayName: user.displayName,
            photoURL: user.photoURL,
            random: randomKey
          })
          .then(
            console.log('ユーザー作成完了しました')
          )
          .catch((error) => {
          console.log(error)
          })
        }
      })
      .catch((error => {
        console.log(error)
      }))
    }
  }
}
</script>

<style lang="sass" scoped>
  .button-center
    text-align: center
</style>