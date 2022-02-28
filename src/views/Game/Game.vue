<template>
    <div class="game-container">
      <InvitationAlert
      @accept="accept"
      @cancel="receiveInvitations"
      :invitationId="invitationId"
      :invitations="invitations"
      :inviteData="inviteData"
      v-if="invitations" />
      <Nav />
      <Users />
      <div class="game-wrapper">
        <Panel
        :namePlayer="namePlayer"
        :player1Wins="player1Wins"
        :player2Wins="player2Wins"
        :ties="ties" />
        <Board
        :accepted="accepted"
        :start="start"
        @new-player1="handlePlayer1"
        @new-player2="handlePlayer2"
        @player1="updatePlayer1Win"
        @player2="updatePlayer2Win"
        @ties="updateTies" />
        <Buttons @start-game="startGame" />
      </div>
    </div>
</template>

<script>
import Users from '../../components/Users/Users.vue';
import Board from '../../components/Game/Board/Board.vue';
import Panel from '../../components/Game/Panel/Panel.vue';
import Buttons from '../../components/Game/Buttons/Buttons.vue';
import Nav from '../../components/Nav/Nav.vue';
import InvitationAlert from '../../components/InvitationAlert/InvitationAlert.vue';
import { collection, getFirestore, onSnapshot, query } from '@firebase/firestore';
import { getAuth, onAuthStateChanged } from '@firebase/auth';

  export default {
    name: 'Game',
    components: {
      Users,
      Board,
      Panel,
      Buttons,
      Nav,
      InvitationAlert
    },
    data(){
      return {
        start: false,
        player1Wins: 0,
        player2Wins: 0,
        ties: 0,
        invitations: false,
        inviteData: null,
        invitationId: null,
        user: null,
        accepted: false,
        namePlayer: 0,
      }
    },
    methods: {
      accept() {
        this.accepted = true;
        this.invitations = false
      },
      handlePlayer1(){
        this.namePlayer = 1;
      },
      handlePlayer2(){
        this.namePlayer = 2
      },
      receiveInvitations() {
        const db = getFirestore();
        const queryCollection = query(collection(db, 'invitations'));
        const q = query(queryCollection);

        this.accepted = false;
        this.invitations = false;

        onSnapshot(q, (snapchot) => {
          snapchot.docs.forEach((doc) => {
            if (!this.user) return;
            if (doc.data().invited === this.user.uid && !doc.data().answer) {
              this.invitations = true;
              this.inviteData = doc.data();
              return this.invitationId = doc.id;
            }
          })
        })
      },
      startGame() {
        this.player1Wins = 0;
        this.player2Wins = 0;
        this.ties = 0;
        this.start ? this.start = false : this.start = true;
      },
      updatePlayer1Win() {
        this.player1Wins++;
      },
      updatePlayer2Win() {
        this.player2Wins++;
      },
      updateTies() {
        this.ties++;
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
      this.receiveInvitations();
    }
  }
</script>

<style lang='scss' src='./Game.scss'></style>
