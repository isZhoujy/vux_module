<template>
  <div>

    <scroller style="top:44px; "
              :on-refresh="refresh"
              :on-infinite="infinite"
              refresh-layer-color="#4b8bf4"
              loading-layer-color="#ec4949"
              ref="my_scroller"
    >
      <div v-for="(item, index) in items"
           class="row"
           :class="{'grey-bg': index % 2 == 0}">
        {{ item }}
      </div>

      <!-- custom infinite spinner -->
      <svg class="spinner" style="fill: #ec4949;" slot="infinite-spinner" viewBox="0 0 64 64">
        <g><circle cx="16" cy="32" stroke-width="0" r="3"><animate attributeName="fill-opacity" dur="750ms" values=".5;.6;.8;1;.8;.6;.5;.5" repeatCount="indefinite"></animate><animate attributeName="r" dur="750ms" values="3;3;4;5;6;5;4;3" repeatCount="indefinite"></animate></circle><circle cx="32" cy="32" stroke-width="0" r="3.09351"><animate attributeName="fill-opacity" dur="750ms" values=".5;.5;.6;.8;1;.8;.6;.5" repeatCount="indefinite"></animate><animate attributeName="r" dur="750ms" values="4;3;3;4;5;6;5;4" repeatCount="indefinite"></animate></circle><circle cx="48" cy="32" stroke-width="0" r="4.09351"><animate attributeName="fill-opacity" dur="750ms" values=".6;.5;.5;.6;.8;1;.8;.6" repeatCount="indefinite"></animate><animate attributeName="r" dur="750ms" values="5;4;3;3;4;5;6;5" repeatCount="indefinite"></animate></circle></g></svg>
    </scroller>
  </div>
</template>
<style lang="less">
  .row{
    background: #eeeeee;
    line-height:50px;
    &:nth-of-type(2n-1){
      background: #fff;
    }
  }
  ._v-container>._v-content>.pull-to-refresh-layer{
    /*float: left;*/
    /*position: absolute;*/
  }
</style>
<script>
  export default {
    beforeRouteEnter (to, from, next) {
      next(vm=>{
        vm.$store.commit('changeTaber',true);
        console.log(vm.$refs.my_scroller.getPosition());
        setTimeout(function(){
          vm.$refs.my_scroller.scrollTo(0,300);
        },)
      })
    },
    data () {
      return {
        items: []
      }
    },
    mounted() {
      for (let i = 1; i <= 20; i++) {
        this.items.push(i + ' - keep walking, be 2 with you.')
      }
      this.top = 1
      this.bottom = 20;
      setTimeout(function(){
//          console.log(this.$refs.my_scroller.getPosition())
//        this.$refs.my_scroller.scrollBy(0,300);
      }.bind(this),10)
    },
    methods: {
      refresh(done) {
        setTimeout(() => {
          let start = this.top - 1
          for (let i = start; i > start - 10; i--) {
            this.items.splice(0, 0, i + ' - keep walking, be 2 with you.')
          }
          this.top = this.top - 10;
          done()
        }, 1500)
      },
      infinite(done) {
        if (this.bottom >= 30) {
          setTimeout(() => {
            done(true)
          }, 1500)
          return;
        }
        setTimeout(() => {
          let start = this.bottom + 1
          for (let i = start; i < start + 10; i++) {
            this.items.push(i + ' - keep walking, be 2 with you.')
          }
          this.bottom = this.bottom + 10;
          setTimeout(() => {
            done()
          })
        }, 1500)
      }
    }
  }
</script>
