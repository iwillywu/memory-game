<template>
  <div class="box" :class="boxClass" @click="handleClick">
    <div class="box__value">{{ boxValue }}</div>
  </div>
</template>
<script>

import { mapState } from 'vuex'

export default {
  props: {
    item: {
      type: Object,
      default: () => {
        return {
          id: null,
          value: null
        }
      }
    }
  },
  computed: {
    ...mapState('game', ['openedItems']),
    boxValue() {
      return (this.item.matched || this.openedItems.includes(this.item.id)) ? this.item.value: ''
    },
    boxClass() {
      if (this.item.matched) {
        return 'matched'
      }
      if (this.openedItems.includes(this.item.id)) {
        return (this.openedItems.length === 2 && !this.item.matched) ? 'not-matched' : 'open'
      } 
      return ''
    }
  },
  methods: {
    handleClick(){
      if (!this.item.matched && !this.openedItems.includes(this.item.id)) {
        this.$emit('click', this.item.id)
      }
    }
  }
}
</script>

<style scoped>
   .box {
    border: 2px solid rgb(246, 144, 0);
    box-sizing: border-box;
    cursor: pointer;
    width: 100%;
    height: 100%;    
   }
   .box .box__value {
    font-weight: bold;  
    font-size: 1.5rem;
    color: #fff;
    opacity: 0;    
    transition: .2s opacity;;
    width: 100%;
    height: 100%;    
    display: flex;
    justify-content: center;
    align-items: center;    
   } 
   .box.open .box__value {
     opacity: 1;
     background-color: rgb(79, 205, 224);
   }
   .box.matched .box__value {
     opacity: 1;
     border: 0;
     background-color: rgb(88, 172, 52);
   }
   .box.not-matched .box__value {
     opacity: 1;
     border: 0;
     background-color: rgb(198, 50, 50);
   }
</style>