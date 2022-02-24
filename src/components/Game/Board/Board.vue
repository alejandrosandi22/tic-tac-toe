<template>
    <div class="tic-tac-toe-container">
      <div :class="classWinBox">
        <div class="player-win">
          <div v-if="!ties">
            <i :class="[winner === 'player1' ? 'fal fa-times' : 'fal fa-circle']"></i> <span>¡WIN!</span>
          </div>
          <div v-else>
            <div class="ties">
              <i class="fal fa-times"></i> <i class="fal fa-circle"></i>
            </div>
            <span>¡TIES!</span>
          </div>
        </div>
        <button @click="handlePlayAgain" class="fal fa-undo restart"></button>
      </div>
      <table>
          <div class="winner-line" :style="winnerLine"></div>
        <tbody>
          <tr>
            <td ref="box0" id="0" @click="selectBox($event)"><i class='fal fa-times'></i></td>
            <td ref="box1" id="1" @click="selectBox($event)"><i class='fal fa-circle'></i></td>
            <td ref="box2" id="2" @click="selectBox($event)"><i class='fal fa-circle'></i></td>
          </tr>
          <tr>
            <td ref="box3" id="3" @click="selectBox($event)"><i class='fal fa-circle'></i></td>
            <td ref="box4" id="4" @click="selectBox($event)"><i class='fal fa-times'></i></td>
            <td ref="box5" id="5" @click="selectBox($event)"><i class='fal fa-times'></i></td>
          </tr>
          <tr>
            <td ref="box6" id="6" @click="selectBox($event)"><i class='fal fa-times'></i></td>
            <td ref="box7" id="7" @click="selectBox($event)"><i class='fal fa-circle'></i></td>
            <td ref="box8" id="8" @click="selectBox($event)"><i class='fal fa-circle'></i></td>
          </tr>
        </tbody>
      </table>
    </div>
</template>

<script>
export default {
  name: 'Board',
  props: ['start'],
  data(){
    return{
      selectedBoxes: [],
      waysToWin: [
        [0,1,2],
        [3,4,5],
        [6,7,8],

        [0,3,6],
        [1,4,7],
        [2,5,8],

        [0,4,8],
        [2,4,6]
      ],
      player: null,
      shape1: 'fa-times',
      shape2: 'fa-circle',
      online: false,
      gameState: null,
      ties: false,
      winner: 'player1',
      winnerLine: {}
    }
  },
  computed:{
    classWinBox: function() {
      return {
        win: this.gameState === false,
        process: this.gameState === true,
        'default-win': this.gameState === null 
      }
    }
  },
  watch: {
    start: function() {
      this.startGame();
    }
  },
  methods: {
    handlePlayAgain() {
      this.winnerLine = {};
      this.selectedBoxes = [];
      this.player = true;
      this.gameState = true;
      this.ties = false;
      for (let i = 0; i < 9; i++) {
        this.$refs[`box${i}`].children[0].classList.remove('fa-times');
        this.$refs[`box${i}`].children[0].classList.remove('fa-circle');
      }
    },
    startGame() {
      this.selectedBoxes = [];

      for (let i = 0; i < 9; i++) {
        this.$refs[`box${i}`].children[0].classList.remove('fa-times');
        this.$refs[`box${i}`].children[0].classList.remove('fa-circle');
      }
      this.winnerLine = {};
      this.ties = false;
      this.gameState = true;
      this.player = true;
    },
    selectBox(e) {
      const box = e.target;
      
      var currentShape = undefined;
      var selectedBox = null;

      selectedBox = this.selectedBoxes.filter((current_box) => {
        return current_box.id === parseInt(box.id);
      })
      if (!this.gameState) return;

      if (this.online) {
        
      } else if (this.online === false) {
        if (selectedBox.length === 0) {
          if (!this.player) return;
          if (this.player) {
          this.selectedBoxes.push({id: box.id, player: 'player1'})
            currentShape = this.shape1;
            box.children[0].classList.add(currentShape);
            this.player = false;
            this.watchMatches();
            this.selectedBoxCPU();
          }
        }
      }
    },
    watchMatches() {
      var matches = [];
      var pushMatches = {};
      var current_player = '';
      var index = 0;

      while (matches.length !== 3 && index < 8) {

        this.selectedBoxes.map((selectedBox) => {
          this.waysToWin[index].map((wayToWin) => {
            pushMatches = {id: selectedBox.id, player: selectedBox.player};

            if (selectedBox.id !== wayToWin.toString()) return;

            if (current_player === '') {
              current_player = selectedBox.player;
              matches.push(pushMatches);
            } else if (current_player === selectedBox.player) matches.push(pushMatches);
          })
        })
        if (matches.length < 3) {
          current_player = '';
          matches = [];
        }
        if (matches.length === 3) {

        let winMatch = [];
        let matchIndex = 0;
        let matchId = NaN;

        while (matchIndex < 8 && winMatch.length < 3) {
          console.log('index',matchIndex)
         this.waysToWin[matchIndex].map((wayToWin) => {
           matches.map((match) => {
            matchId = parseInt(match.id)
            if (matchId === wayToWin) winMatch.push(matchId);
           })
         })
          if (winMatch.length === 3) break;
          winMatch = [];
          matchIndex++;
        }

        let matchCompare = JSON.stringify(winMatch);

        if (JSON.stringify(this.waysToWin[0]) === matchCompare) {
          this.winnerLine = {
            top: '4.16rem',
            left: '1.5rem',
            height: '.5rem',
            animation: 'show-line-h .5s forwards',
            animationDelay: '.1s'
          }
        }
        if (JSON.stringify(this.waysToWin[1]) === matchCompare) {
          this.winnerLine = {
            top: '12.5rem',
            left: '1.5rem',
            height: '.5rem',
            animation: 'show-line-h .5s forwards',
            animationDelay: '.1s'
          }
        }
        if (JSON.stringify(this.waysToWin[2]) === matchCompare) {
          this.winnerLine = {
            bottom: '3.8rem',
            left: '1.5rem',
            height: '.5rem',
            animation: 'show-line-h .5s forwards',
            animationDelay: '.1s'
          }
        }
        if (JSON.stringify(this.waysToWin[3]) === matchCompare) {
          this.winnerLine = {
            top: '1.5rem',
            left: '3.8rem',
            width: '.5rem',
            animation: 'show-line-v .5s forwards',
            animationDelay: '.1s'
          }
        }
        if (JSON.stringify(this.waysToWin[4]) === matchCompare) {
          this.winnerLine = {
            top: '1.5rem',
            left: '12.5rem',
            width: '.5rem',
            animation: 'show-line-v .5s forwards',
            animationDelay: '.1s'
          }
        }
        if (JSON.stringify(this.waysToWin[5]) === matchCompare) {
          this.winnerLine = {
            top: '1.5rem',
            right: '3.8rem',
            width: '.5rem',
            animation: 'show-line-v .5s forwards',
            animationDelay: '.1s'
          }
        }
        if (JSON.stringify(this.waysToWin[6]) === matchCompare) {
          this.winnerLine = {
            top: '12.5rem',
            left: '0rem',
            height: '.5rem',
            transform: 'rotate(45deg)',
            animation: 'show-line-i .5s forwards',
            animationDelay: '.1s'
          }
        }
        if (JSON.stringify(this.waysToWin[7]) === matchCompare) {
          this.winnerLine = {
            top: '12.5rem',
            left: '0rem',
            height: '.5rem',
            transform: 'rotate(-45deg)',
            animation: 'show-line-i .5s forwards',
            animationDelay: '.1s'
          }
        }

          if (current_player === 'player1') {
            this.winner = 'player1';
            this.$emit('player1');
          }
          else if (current_player === 'player2') {
            this.winner = 'player2';  
            this.$emit('player2');
          }
          this.player = null;
          this.gameState = false;
          return console.log('win-player1: ', current_player);
        }
        if (matches.length < 3 && this.selectedBoxes.length === 9 && index === 7) {
         this.winnerLine = NaN;
          this.gameState = false;
          this.ties = true;
          return this.$emit('ties');
        }
        index++;
      }
    },
    selectedBoxCPU() {
      var selectRandomBox = NaN;
      var selectedBox = null;

      if (this.player !== false) return;

      selectRandomBox = Math.floor(Math.random() * 9);

      selectedBox = this.selectedBoxes.filter((current_box) => {
        return current_box.id === selectRandomBox.toString();
      })

      while (selectedBox.length !== 0 && this.selectedBoxes.length < 9) {
        selectRandomBox = Math.floor(Math.random() * 9);
          selectedBox = this.selectedBoxes.filter((current_box) => {
          return current_box.id === selectRandomBox.toString();
        })
      }

      let currentBox = `box${selectRandomBox}`

      if (selectedBox.length === 0) {
        const box = this.$refs[currentBox];
        this.selectedBoxes.push({id: box.id, player: 'player2'})
        setTimeout(() => {
          box.children[0].classList.add(this.shape2)
          this.watchMatches();
          this.player = true;
        },500)
      }
    }

  }
}
</script>

<style lang="scss" src="./Board.scss"></style>