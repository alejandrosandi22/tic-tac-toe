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
            <span>¡DRAWS!</span>
          </div>
        </div>
        <button @click="handlePlayAgain" class="fal fa-undo restart"></button>
      </div>
      <table>
          <div class="winner-line" :style="winnerLine"></div>
        <tbody>
          <tr>
            <td ref="box0" id="0" @click="selectBox($event)"><i id="0" class='fal fa-times'></i></td>
            <td ref="box1" id="1" @click="selectBox($event)"><i id="1" class='fal fa-circle'></i></td>
            <td ref="box2" id="2" @click="selectBox($event)"><i id="2" class='fal fa-circle'></i></td>
          </tr>
          <tr>
            <td ref="box3" id="3" @click="selectBox($event)"><i id="3" class='fal fa-circle'></i></td>
            <td ref="box4" id="4" @click="selectBox($event)"><i id="4" class='fal fa-times'></i></td>
            <td ref="box5" id="5" @click="selectBox($event)"><i id="5" class='fal fa-times'></i></td>
          </tr>
          <tr>
            <td ref="box6" id="6" @click="selectBox($event)"><i id="6" class='fal fa-times'></i></td>
            <td ref="box7" id="7" @click="selectBox($event)"><i id="7" class='fal fa-circle'></i></td>
            <td ref="box8" id="8" @click="selectBox($event)"><i id="8" class='fal fa-circle'></i></td>
          </tr>
        </tbody>
      </table>
    </div>
</template>

<script>
import { getAuth, onAuthStateChanged } from '@firebase/auth';
import { arrayUnion, collection, deleteDoc, doc, getDoc, getDocs, getFirestore, onSnapshot, query, updateDoc } from '@firebase/firestore';
export default {
  name: 'Board',
  props: ['start', 'accepted'],
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
      player1: false,
      player2: false,
      shape1: 'fa-times',
      shape2: 'fa-circle',
      online: false,
      gameState: null,
      ties: false,
      winner: 'player1',
      winnerLine: {},
      user: null,
      currentMatch: [],
      matchId: null
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
    },
    accepted: function() {
      this.startGame();
      this.newMatch();
      this.player = false;
      this.online = true;
    }
  },
  methods: {
    async handlePlayAgain() {
      if (this.online) {
        const db = getFirestore();
        const docRef = doc(db, 'matches', this.matchId)
        
        const DATA = {
        boxes: [],
        box0: '',
        box1: '',
        box2: '',
        box3: '',
        box4: '',
        box5: '',
        box6: '',
        box7: '',
        box8: '',
      }
      await updateDoc(docRef, DATA);
      }
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
      this.online = false;
      this.player1 = false;
      this.player2 = false;
    },
    async selectBox(e) {
      const box = e.target;
      const db = getFirestore();
      
      var currentShape = undefined;
      var selectedBox = null;
      var currentPlayer = '';

      selectedBox = this.selectedBoxes.filter((current_box) => {
        return current_box.id === box.id;
      })

      if (!this.gameState) return;
      if (selectedBox.length !== 0) return;

      if (this.online) {

        const matchRef = doc(db, 'matches', this.matchId);

        if (this.player1) {
          currentPlayer = 'player1';
          await updateDoc(matchRef, {boxes: arrayUnion({id: box.id, player: 'player1'})});
        }
        else {
          currentPlayer = 'player2';
          await updateDoc(matchRef, {boxes: arrayUnion({id: box.id, player: 'player2'})});
        }

        if (box.id === '0') await updateDoc(matchRef, {box0: currentPlayer});
        if (box.id === '1') await updateDoc(matchRef, {box1: currentPlayer});
        if (box.id === '2') await updateDoc(matchRef, {box2: currentPlayer});
        if (box.id === '3') await updateDoc(matchRef, {box3: currentPlayer});
        if (box.id === '4') await updateDoc(matchRef, {box4: currentPlayer});
        if (box.id === '5') await updateDoc(matchRef, {box5: currentPlayer});
        if (box.id === '6') await updateDoc(matchRef, {box6: currentPlayer});
        if (box.id === '7') await updateDoc(matchRef, {box7: currentPlayer});
        if (box.id === '8') await updateDoc(matchRef, {box8: currentPlayer});

         this.watchMatches();

      } else if (this.online === false) {
        if (!this.player) return;
        this.selectedBoxes.push({id: box.id, player: 'player1'})
        currentShape = this.shape1;
        box.children[0].classList.add(currentShape);
        this.player = false;
        this.watchMatches();
        this.selectedBoxCPU();
      }
    },
    async watchMatches() {
      var matches = [];
      var pushMatches = {};
      var current_player = '';
      var index = 0;


      if (this.online) {
        const db = getFirestore();
  
        this.selectedBoxes = [];

        const querySnapchot = await getDocs(collection(db, 'matches'));
        querySnapchot.forEach((doc) => {
            this.selectedBoxes = doc.data().boxes
        })
      }

      while (matches.length < 3 && index < 8) {
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
            if (!this.gameState) return;
            this.gameState = false;
            this.winner = 'player1';
            this.$emit('player1');
          }
          else if (current_player === 'player2') {
            if (!this.gameState) return;
            this.gameState = false;
            this.winner = 'player2';  
            this.$emit('player2');
          }
          this.player = null;
          this.gameState = false;
          this.selectedBoxes = [];
          return console.log('win-player1: ', current_player);
        }
        if (matches.length < 3 && this.selectedBoxes.length === 9 && index === 7) {
          if (!this.gameState) return;
          this.gameState = false;
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
    },
    newMatch() {
      const db = getFirestore();
      const queryCollection = query(collection(db, 'matches'));
      const q = query(queryCollection);

        onSnapshot(q, (snapchot) => {
          snapchot.docs.forEach( async (current_doc) => {
            let data = current_doc.data();
            if (data.player1 === this.user.uid || data.player2 === this.user.uid) {
              this.matchId = current_doc.id;
              this.player = false;
              if (!this.online) this.startGame(); 
              this.online = true;
              this.watchMatches();

              if (data.player1 === this.user.uid) {
                this.$emit('new-player1');
                this.player2 = false;
                this.player1 = true;
              }
              else {
                this.$emit('new-player2');
                this.player1 = false;
                this.player2 = true;
              }

              if (data.box0 === 'player1' && this.$refs.box0) this.$refs['box0'].children[0].classList.add('fa-times');
              else if (data.box0 === 'player2')this.$refs.box0.children[0].classList.add('fa-circle');

              if (data.box1 === 'player1' && this.$refs.box1) this.$refs['box1'].children[0].classList.add('fa-times');
              else if (data.box1 === 'player2')this.$refs['box1'].children[0].classList.add('fa-circle');

              if (data.box2 === 'player1' && this.$refs.box2) this.$refs['box2'].children[0].classList.add('fa-times');
              else if (data.box2 === 'player2')this.$refs['box2'].children[0].classList.add('fa-circle');

              if (data.box3 === 'player1' && this.$refs.box3) this.$refs['box3'].children[0].classList.add('fa-times');
              else if (data.box3 === 'player2')this.$refs['box3'].children[0].classList.add('fa-circle');

              if (data.box4 === 'player1' && this.$refs.box4) this.$refs['box4'].children[0].classList.add('fa-times');
              else if (data.box4 === 'player2')this.$refs['box4'].children[0].classList.add('fa-circle');

              if (data.box5 === 'player1' && this.$refs.box5) this.$refs['box5'].children[0].classList.add('fa-times');
              else if (data.box5 === 'player2')this.$refs['box5'].children[0].classList.add('fa-circle');

              if (data.box6 === 'player1' && this.$refs.box6) this.$refs['box6'].children[0].classList.add('fa-times');
              else if (data.box6 === 'player2')this.$refs['box6'].children[0].classList.add('fa-circle');

              if (data.box7 === 'player1' && this.$refs.box7) this.$refs['box7'].children[0].classList.add('fa-times');
              else if (data.box7 === 'player2')this.$refs['box7'].children[0].classList.add('fa-circle');

              if (data.box8 === 'player1' && this.$refs.box8) this.$refs['box8'].children[0].classList.add('fa-times');
              else if (data.box8 === 'player2')this.$refs['box8'].children[0].classList.add('fa-circle');
            }
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
    this.newMatch();
  }
}
</script>

<style lang="scss" src="./Board.scss"></style>
