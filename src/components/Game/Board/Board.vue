<template>
    <div class="tic-tac-toe-container">
      <table>
        <tbody>
          <tr>
            <td ref="box0" id="0" @click="selectBox($event)"><i class='fal'></i></td>
            <td ref="box1" id="1" @click="selectBox($event)"><i class='fal'></i></td>
            <td ref="box2" id="2" @click="selectBox($event)"><i class='fal'></i></td>
          </tr>
          <tr>
            <td ref="box3" id="3" @click="selectBox($event)"><i class='fal'></i></td>
            <td ref="box4" id="4" @click="selectBox($event)"><i class='fal'></i></td>
            <td ref="box5" id="5" @click="selectBox($event)"><i class='fal'></i></td>
          </tr>
          <tr>
            <td ref="box6" id="6" @click="selectBox($event)"><i class='fal'></i></td>
            <td ref="box7" id="7" @click="selectBox($event)"><i class='fal'></i></td>
            <td ref="box8" id="8" @click="selectBox($event)"><i class='fal'></i></td>
          </tr>
        </tbody>
      </table>
    </div>
</template>

<script>
export default {
  name: 'Board',
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
      player: true,
      shape1: 'fa-times',
      shape2: 'fa-circle',
      online: false
    }
  },
  methods: {
    selectBox(e) {
      const box = e.target;

      var currentShape = undefined;
      var selectedBox = null;

      selectedBox = this.selectedBoxes.filter((current_box) => {
        return current_box === box.id;
      })

      if (this.online) {
      } else if (this.online === false) {
        if (selectedBox.length === 0) {
          this.selectedBoxes.push(box.id);
          if (this.player) {
            currentShape = this.shape1;
            box.children[0].classList.add(currentShape);
            this.player = false;
            this.selectedBoxCPU();
          }
        }
      }
    },

    selectedBoxCPU() {
      var selectRandomBox = NaN;
      var selectedBox = null;

      selectRandomBox = Math.floor(Math.random() * 9);

      selectedBox = this.selectedBoxes.filter((current_box) => {
        return current_box === selectRandomBox.toString();
      })

      while (selectedBox.length !== 0 && this.selectedBoxes.length < 9) {
        console.log('while')
        selectRandomBox = Math.floor(Math.random() * 9);
        selectedBox = this.selectedBoxes.filter((current_box) => {
          return current_box === selectRandomBox.toString();
        })
      }

      let currentBox = `box${selectRandomBox}`

      if (selectedBox.length === 0) {
        const box = this.$refs[currentBox];
        this.selectedBoxes.push(box.id)
        setTimeout(() => {
          box.children[0].classList.add(this.shape2)
          this.player = true;
        },500)
      }
    }

  }
}
</script>