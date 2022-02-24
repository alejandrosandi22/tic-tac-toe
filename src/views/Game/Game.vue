<template>
    <div class="game-container">
      <Nav />
      <Users />
      <div class="game-wrapper">
        <Panel :player1Wins="player1Wins" :player2Wins="player2Wins" :ties="ties" />
        <Board :start="start" @player1="updatePlayer1Win" @player2="updatePlayer2Win" @ties="updateTies" />
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

  export default {
    name: 'Game',
    components: {
      Users,
      Board,
      Panel,
      Buttons,
      Nav
    },
    data(){
      return {
        start: false,
        player1Wins: 0,
        player2Wins: 0,
        ties: 0,
      }
    },
    methods: {
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
      }
    }
  }
</script>

<style lang='scss' src='./Game.scss'></style>
