<template>
  <div class="nav-container">
    <div v-if="user" class="signed">
      <img @error="errorImg" class="photo-user" :src="photo_user" alt="user" :title="name_user">
      <button class="sign-out" @click="handleSignOut"><i class="fal fa-sign-out"></i></button>
    </div>
    <div v-else class="no-signed">
      <router-link class="to-sign-in" to="/signin">Sign In</router-link>
    </div>
  </div>
</template>

<script>
import { getAuth, onAuthStateChanged, signOut } from '@firebase/auth'
import { doc, getFirestore, updateDoc } from '@firebase/firestore';
import avatar from '../../assets/avatardefault.png';

export default {
  name: 'Nav',
  data(){
    return {
      user: null,
      photo_user: '',
      name_user: '',
    }
  },
  methods: {
    errorImg(e) {
      e.target.src = avatar;
    },
    handleSignOut() {
      const db = getFirestore();
      const docRef = doc(db, 'users', this.user.uid)
      const auth = getAuth();
      signOut(auth).then(async() => {
        await updateDoc(docRef,{state: false}).then(() => {
          this.$router.replace('/signin');
        })
      })
    },
    getUser() {
      const auth = getAuth();
      onAuthStateChanged(auth, (currentUser) => {
        if (currentUser) {
          this.user = currentUser;
          this.photo_user = currentUser.photoURL;
          this.name_user = currentUser.displayName;
        }
      })
    },
  },
  mounted() {
    this.getUser();
  }
}
</script>

<style lang="scss" src="./Nav.scss"></style>
