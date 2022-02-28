<template>
    <div className="stats-container">
      <div className="games you-win">
        <h3><i className="fal fa-times"></i> {{ playerX }}</h3>
        <h4>{{ player1Wins }}</h4>
      </div>
      <div className="games ties">
        <h3>draws</h3>
        <h4>{{ ties }}</h4>
      </div>
      <div className="games adversary-win">
        <h3><i className="far fa-circle"></i> {{ playerO }}</h3>
        <h4>{{ player2Wins }}</h4>
      </div>
    </div>
</template>

<script>
export default {
  name: 'Panel',
  props:['player1Wins', 'player2Wins', 'ties', 'namePlayer'],
  data(){
    return{
      playerX: '',
      playerO: '',
    }
  },
  watch: {
    namePlayer: function() {
      this.handleActualPlayer();
    }
  },
  methods: {
    handleActualPlayer(){
      if (this.namePlayer === 0){
        this.playerX = '(You)';
        this.playerO = '(CPU)';
      } else if (this.namePlayer === 1) {
        this.playerX = '(You)';
        this.playerO = '(Friend)'
      } else {
        this.playerX = '(Friend)'
        this.playerO = '(You)';
      }
    }
  },
  mounted(){
    this.handleActualPlayer();
  }
}
</script>

<style lang="scss" src="./Panel.scss"></style>