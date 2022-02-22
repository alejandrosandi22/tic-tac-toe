<template>
      <div class="sign-in-container">
      <div class="sign-in-wrapper">
        <h1 class="sign-in-title">Sign In</h1>
          <GoogleButton></GoogleButton>
        <router-link to='/game' class="skip">Skip</router-link>
      </div>
    </div>
</template>

<script>
import GoogleButton from './GoogleButton/GoogleButton.vue';

export default {
  name: 'SignIn',
  components: {
    GoogleButton
  },
}
</script>

<style lang="scss" src='./SignIn.scss'></style>