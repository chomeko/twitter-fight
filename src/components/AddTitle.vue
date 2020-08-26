<template>
  <dd :class="color">{{id}}</dd>
</template>
<script>
  export default {
    props: {
      id: {
        type: String,
        required: false
      },
      rea: {
        type: Number,
        required: false
      }
    },
    computed: {
      color() {
        return this.rea === 2
          ? 'blue'
          : this.rea === 3
          ? 'orange'
          : this.rea === 4
          ? 'pink'
          : 'white'
      },
    },
  }
</script>