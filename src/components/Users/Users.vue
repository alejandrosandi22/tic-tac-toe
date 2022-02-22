<template>
      <div class="bg-container" :class="[$store.state.toggle ? 'show' : 'hide']">
      <div class="users-container">
        <h2 class="users-title">Users<i @click="usersToggle()" class="fas fa-times"></i></h2>
        <div class="users-wrapper">
          <UsersList></UsersList>
        </div>
      </div>
    </div>
</template>

<script>
import UsersList from './UsersList/UsersList.vue';

export default {
  name: 'Users',
  components: {
    UsersList
  },
  methods: {
    usersToggle() {
      this.$store.dispatch('showAndHideUsers');
    }
  }
}
</script>

<style lang='scss' src='./Users.scss'></style>