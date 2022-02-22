<template>
      <div class="start-wrapper">
      <button @click="usersToggle()" class="start-game"></button>
      <button class="start-game"></button>
    </div>
</template>

<script>
export default {
  name: 'Buttons',
  methods: {
    usersToggle() {
      this.$store.dispatch('showAndHideUsers');
    }
  }
}
</script>