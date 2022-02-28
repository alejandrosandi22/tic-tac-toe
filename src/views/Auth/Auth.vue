<template>
  <div class="Auth">
    <SignIn></SignIn>
  </div>
</template>

<script>
import SignIn from '../../components/SignIn/SignIn.vue';

  export default {
    name: 'Auth',
    components: {
      SignIn
    }
  }
</script>

<style lang="scss" src="./Auth.scss"></style>
