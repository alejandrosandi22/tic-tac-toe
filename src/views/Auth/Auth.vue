<template>
  <div>
    <SignIn @login="spinner"></SignIn>
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
