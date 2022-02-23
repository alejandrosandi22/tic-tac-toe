<template>
    <div class="tic-tac-toe-container">
      <table>
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
      online: false
    }
  },
  watch: {
    start: function() {
      this.startGame();
    }
  },
  methods: {
    startGame() {
      this.selectedBoxes = [];

      for (let i = 0; i < 9; i++) {
        this.$refs[`box${i}`].children[0].classList.remove('fa-times');
        this.$refs[`box${i}`].children[0].classList.remove('fa-circle');
      }

      this.player = true;
    },
    selectBox(e) {
      const box = e.target;
      
      var currentShape = undefined;
      var selectedBox = null;

      selectedBox = this.selectedBoxes.filter((current_box) => {
        return current_box.id === parseInt(box.id);
      })

      if (this.online) {
        
      } else if (this.online === false) {
        if (selectedBox.length === 0) {
          this.selectedBoxes.push({id: box.id, player: 'player1'})
          if (this.player) {

            currentShape = this.shape1;
            box.children[0].classList.add(currentShape);
            this.player = false;
            this.watchMatch();
            this.selectedBoxCPU();
          }
        }
      }
    },
    watchMatch() {
      var match = [];
      
      var pushMatch = {};
      var current_player = '';
      var index = 0;

      while (match.length !== 3 && index < 7) {

        this.selectedBoxes.map((selectedBox) => {
          this.waysToWin[index].map((wayToWin) => {

            pushMatch = {id: selectedBox.id, player: selectedBox.player};

            if (selectedBox.id !== wayToWin.toString()) return;

            if (current_player === '') {
              current_player = selectedBox.player;
              match.push(pushMatch);
            } else if (current_player === selectedBox.player) match.push(pushMatch);
          })
        })
        if (match.length < 3) {
          current_player = '';
          match = []
        }
        index++;
        if (match.length === 3) {
          this.player = null;
          return console.log('win player: ', current_player);
        }
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
          this.watchMatch();
          this.player = true;
        },500)
      }
    }

  }
}
</script>