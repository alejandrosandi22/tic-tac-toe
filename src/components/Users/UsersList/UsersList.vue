<template>
  <div v-for="user in usersList" :key='user.id' class="user">
    <img class="photo-user" @error="errorImg" :src='user.photo' alt="user" />
    <div class="user-data">
      <p class="user-name">{{ user.name }}</p>
      <div>
        <button @click="inviteUser(user)" class="invite"></button>
      </div>
    </div>
    <div class="online-wrapper">
      <div :class="[user.state ? 'online' : 'offline' ]"></div>
    </div>
  </div>
</template>

<script>
import { collection, getFirestore, onSnapshot, orderBy, query, setDoc, doc } from '@firebase/firestore'
import { getAuth, onAuthStateChanged } from '@firebase/auth';
import avatar from '../../../assets/avatardefault.png';
import toastr from 'toastr';

export default {
  name: 'UsersList',
  data() {
    return {
      usersList: [],
      user: null,
    }
  },
  methods: {
    errorImg(e) {
      e.target.src = avatar;
    },
    usersToggle() {
      this.$store.dispatch('showAndHideUsers');
    },
    getUser() {
      const auth = getAuth();
      onAuthStateChanged(auth, (currentUser) => {
        this.user = currentUser
      })
    },
    getListUsers() {
      const db = getFirestore();

      const queryCollection = query(collection(db, 'users'));
      const q = query(queryCollection, orderBy('state', 'desc'))

       onSnapshot(q, (snapchot) => {
         this.usersList = [];
        snapchot.docs.forEach((doc) => {
          if (!this.user) this.usersList.push(doc.data());
          else if (doc.id !== this.user.uid) this.usersList.push(doc.data());
        })
      })
    },
    async inviteUser(user) {
      if (!this.user) return toastr.warning('You must register')
      const db = getFirestore();
      const inviteRef = doc(collection(db, 'invitations'))
      await setDoc(inviteRef,{
        invites: this.user.uid,
        invited: user.id,
        invitedName: this.user.displayName,
        answer: false
      }).then(() => {
        this.usersToggle();
      })
    }
  },
  mounted() {
    this.getUser();
    this.getListUsers();
  }
}
</script>

<style lang='scss' src='./UsersList.scss'></style>