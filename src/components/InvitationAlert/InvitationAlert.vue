<template>
  <div class="alert-conatiner" :class="[invitations ? 'show' : 'hide']">
    <div class="alert">
      <h2 class="title">Invitation</h2>
      <h3 class="subtitle">{{ inviteData.invitedName }} wants to play with you!</h3>
      <div class="buttons">
        <button @click="handleCancel" class="cancel"></button>
        <button @click="handleAccept" class="accept"></button>
      </div>
    </div>
  </div>
</template>

<script>
import { collection, deleteDoc, doc, getFirestore, setDoc, updateDoc } from '@firebase/firestore';
import { getAuth, onAuthStateChanged } from '@firebase/auth';
export default {
  name: 'InvitationAlert',
  props: ['inviteData', 'invitations', 'invitationId'],
  data(){
    return{
      user: null,
    }
  },
  methods: {
    async handleCancel() {
      const db = getFirestore();
      await deleteDoc(doc(db, 'invitations', this.invitationId))
        .then(() => {
          this.$emit('cancel');
        })
    },
    async handleAccept() {
      const db = getFirestore();
      const DATA = {
        player1: this.inviteData.invites,
        player2: this.user.uid,
        state: false,
        boxes: [],
        box0: null,
        box1: null,
        box2: null,
        box3: null,
        box4: null,
        box5: null,
        box6: null,
        box7: null,
        box8: null,
      }

      const docRef = doc(db, 'invitations', this.invitationId)
      const inviteRef = doc(collection(db, 'matches'))

      await setDoc(inviteRef, DATA).then( async () => {
        await updateDoc(docRef, {
          answer: true
        }).then(() => {
          this.$emit('accept');
          this.handleCancel();
        })
      })
    },
    getUser() {
      const auth = getAuth();
      onAuthStateChanged(auth, (currentUser) => {
        this.user = currentUser;
      })
    },
  },
  mounted(){
    this.getUser();
  }
}
</script>

<style lang="scss" src="./InvitationAlert.scss"></style>
