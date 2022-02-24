<template>
      <div class="start-wrapper">
      <button @click="usersToggle" class="start-game"></button>
      <button @click="startGame" class="start-game"></button>
    </div>
</template>

<script>
export default {
  name: 'Buttons',
  methods: {
    usersToggle() {
      this.$store.dispatch('showAndHideUsers');
    },
    startGame() {
      this.$emit('start-game');
    }
  }
}
</script>

<style lang="scss" src="./Buttons.scss"></style>