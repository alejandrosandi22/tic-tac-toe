<template>
  <button @click="signInWithGoogle()" class="sign-in-button"><img src="https://i.ibb.co/NxYZR5b/google-icon.png" alt="google-icon" /> Sign In With Google</button>
</template>

<script>
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { setDoc, doc, getFirestore } from 'firebase/firestore';

export default {
  name: 'GoogleButton',
  methods: {
    signInWithGoogle() {

const db = getFirestore();
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    
    signInWithPopup(auth, provider)
      .then( async (data) => {
        await setDoc(doc(db, 'users', data.user.uid),{
          name: data.user.displayName,
          photo: data.user.photoURL,
          state: true
        })
        this.$router.replace('/game');
      })
      .catch((error) => {
        if (error.code === 'auth/popup-closed-by-user') return;
      })
    }
  }
}
</script>

<style lang='scss' src='./GoogleButton.scss'></style>