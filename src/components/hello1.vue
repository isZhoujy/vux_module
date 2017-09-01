<template>
  <div class="wrap">
    <mt-loadmore class="scrollload" :top-method="loadTop"  @translate-change="translateChange" @top-status-change="handleTopChange" :autoFill="true"
                 ref="loadmore">
      <ul>
        <li v-for="item in 60">{{ item }}</li>
      </ul>
      <div slot="top" class="mint-loadmore-top">
        <span v-show="topStatus !== 'loading'" :class="{ 'rotate': topStatus === 'drop' }">↓</span>
        <span v-show="topStatus === 'loading'">Loading...</span>
      </div>
    </mt-loadmore>
  </div>
</template>
<style lang="less">
  .scrollload{
    li{
      background: #fff;
      line-height:50px;
      &:nth-of-type(2n-1){
        background: #fff;
      }
    }
  }
  .mint-loadmore-top{
    span{
      transition:all .2s linear;
      display: inline-block;
      &.rotate{
        transform: rotate(180deg);
      }
    }
  }

</style>
<script>
  export default {
    beforeRouteEnter (to, from, next) {
      /* if(this.$store.state.scrolltop!=0){
       document.body.scrollTop = this.$store.state.scrolltop
       }*/
      next(vm=>{
          console.log();
          var topval = vm.$store.state.scrolltop?vm.$store.state.scrolltop:0;
        vm.$store.commit('changeTaber',true);
        var oscrol = document.querySelector('.wrap');
        setTimeout(function(){
        oscrol.scrollTop = topval;
        },0)
      })
    },
    beforeRouteLeave (to, from, next) {
      var oscrol = document.querySelector('.wrap');
      var scrollt = oscrol.scrollTop;
      this.$store.state.scrolltop = scrollt;
//      this.$store.commit('setscroll',scrollt);
      next()
    },
    data () {
      return {
        items: [],
        allLoaded:false,
        topStatus:'',
        moveTranslate:'',
      }
    },
    mounted() {
      var oscrol = document.querySelector('.wrap');
//      oscrol.addEventListener('scroll',function(){
//
//      },false)
    },
    methods: {
      loadBottom(){
        setTimeout(()=>{
          this.$refs.loadmore.onBottomLoaded();
        },1000)
      },
      loadTop(){
          setTimeout(()=>{
            this.$refs.loadmore.onTopLoaded();
          },1000)
      },
      handleTopChange(status) {
        this.moveTranslate = 1;
        this.topStatus = status;
      },
      translateChange(translate) {
        const translateNum = +translate;
        this.translate = translateNum.toFixed(2);
        this.moveTranslate = (1 + translateNum / 70).toFixed(2);
      },
    }
  }
</script>
