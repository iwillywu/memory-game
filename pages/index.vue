<template>
  <div class="container">
      <Header :score="score" @click="handleClickReset" />
      <ul class="box-list">
          <li class="box-list__item" v-for="item in items" :key="item.id" :style="widthHeightCss">
            <Box :item="item" @click="handleClickBox" />
          </li>
      </ul>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'

export default {
  name: 'IndexPage',
  created() {
    this.startNewGame()
  },
  computed: {
    ...mapState('game', ['gameGridSize', 'items', 'score', 'openedItems']),
    numOfItems() {
      return parseInt(this.gameGridSize) * parseInt(this.gameGridSize)
    },
    widthHeightCss() {
      return `width: calc(98vw/${this.gameGridSize} - 22px); height: calc(90vh/${this.gameGridSize} - 22px)`
    }
  },
  methods: {
    ...mapMutations('game', ['setGameGridSize','setItemValues', 'setItems', 'resetOpenedItems', 'setScore']),
    ...mapActions('game', ['randomizeItemValue', 'openItem']),
    createItemValues() {
      const maxRange = this.gameGridSize * 2
      const range = []
      for(let i = 1; i <= maxRange; i++ ) {
        range.push(i, i)
      }
      this.setItemValues(range)
    },
    createItems() {
      const items = []
      for(let i = 0; i < this.numOfItems; i++) {
        items.push({
          id: i,
          value: null,
          matched: false
        })
      }
      this.setItems(items)
    },
    startNewGame() {
      this.setGameGridSize(4)
      this.createItemValues()
      this.createItems()
      this.setScore(100)
      this.resetOpenedItems()
    },
    handleClickBox(id){
      if (this.openedItems.length == 1) {
        window.setTimeout(this.resetOpenedItems, 1000)
      }
      if (!this.items[id].value) {
        this.randomizeItemValue(id)
      }
      this.openItem(id)
    },
    handleClickReset() {
      this.startNewGame()
    }
  }
}
</script>
<style>
  body {
    margin: 0;
    padding: 0;
    font-family: Arial, Helvetica, sans-serif;
  }
  .box-list {
    margin: 0 auto;
    padding: 0;
    width: 98vw;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    list-style: none;
  }
   .box-list__item {
    margin: 10px;
    padding: 0;
    min-width: 50px;
    min-height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;  
   } 

</style>