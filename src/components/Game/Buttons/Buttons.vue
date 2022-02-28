<template>
      <div class="start-wrapper">
      <button @click="usersToggle" class="start-game"></button>
      <button @click="startGame" class="start-game"></button>
    </div>
</template>

<script>
import { collection, deleteDoc, doc, getFirestore, onSnapshot, query } from '@firebase/firestore';
import { getAuth, onAuthStateChanged } from '@firebase/auth';
export default {
  name: 'Buttons',
  data() {
    return{
      matchId: null,
      user: null,
    }
  },
  methods: {
    usersToggle() {
      this.$store.dispatch('showAndHideUsers');
    },
    startGame() {
      console.log('get match id')
      const db = getFirestore();
      const queryCollection = query(collection(db, 'matches'));
      const q = query(queryCollection);

      const auth = getAuth();
      onAuthStateChanged(auth, (currentUser) => {
        this.user = currentUser;
      })

      if (this.user) {
        onSnapshot(q, (snapchot) => {
          snapchot.docs.forEach(async (current_doc) => {
            console.log('snapshot.docs')
            let data = current_doc.data();
            if (data.player1 === this.user.uid || data.player2 === this.user.uid) {
              this.matchId = current_doc.id;
              console.log(current_doc.id)
              console.log(this.matchId)
              await deleteDoc(doc(db, 'matches', this.matchId));
              this.$emit('start-game');
            } else {
              this.$emit('start-game');
            }
          })
        })
      } else {
        this.$emit('start-game');
      }
    }
  }
}
</script>

<style lang="scss" src="./Buttons.scss"></style>
