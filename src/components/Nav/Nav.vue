<template>
  <div>
    <button @click="handleSignOut">Sign Out</button>
  </div>
</template>

<script>
import { getAuth, signOut } from '@firebase/auth'
export default {
  name: 'Nav',
  methods: {
    handleSignOut() {
      const auth = getAuth();
      signOut(auth).then(() => {
        this.$router.replace('/signin');
      })
    }
  }
}
</script>