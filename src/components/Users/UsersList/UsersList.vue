<template>
  <div v-for="user in usersList" :key='user.uid' class="user">
    <img class="photo-user" @error="errorImg" :src='user.photo' alt="user" />
    <div class="user-data">
      <p class="user-name">{{ user.name }}</p>
      <div>
        <button class="invite"></button>
      </div>
    </div>
    <div class="online-wrapper">
      <div :class="[user.state ? 'online' : 'offline' ]"></div>
    </div>
  </div>
</template>

<script>
import { collection, getFirestore, onSnapshot, orderBy, query } from '@firebase/firestore'
import { getAuth, onAuthStateChanged } from '@firebase/auth';
import avatar from '../../../assets/avatardefault.png';

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
          if (doc.id !== this.user.uid) this.usersList.push(doc.data())
        })
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