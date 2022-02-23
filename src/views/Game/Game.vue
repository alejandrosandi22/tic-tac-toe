<template>
    <div class="game-container">
      <Nav />
      <Users />
      <div class="game-wrapper">
        <Panel />
        <Board :start="start"/>
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
      start: false
    }
  },
    methods: {
      startGame(){
        this.start ? this.start = false : this.start = true;
      }
    }
  }
</script>

<style lang='scss' src='./Game.scss'></style>
