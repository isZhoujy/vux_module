<template>
  <div>
    <h1 @click="changeAction">3333333333</h1>
    <div>
      <transition name="bounce">
        <p v-show="isshow">动画效果在这里</p>
      </transition>
    </div>
    <numlist nunm="789564"></numlist>
    <div class="borderimg">
      <p @click="change">jump page</p>
    </div>
    <transition name="slidelist">
       <router-view class="childhello3"></router-view>
    </transition>
  </div>
</template>
<style lang="less">
  .borderimg{
    width: 200px;
    height:200px;
    border:1px solid;
    margin:20px;
    border-image: -webkit-linear-gradient( blue 10%, #ccc 50%) 30 31;
  }
  .childhello3{
    position: absolute;
    background:white;
    width:100%;
    top:0;
    bottom:0;
    transition: all .5s;
  }
  .slidelist-enter  {
    opacity: 0;
    -webkit-transform: translate(100%, 0);
    transform: translate(100%, 0);
  }
  .slidelist-leave-active {
    opacity: 0;
    -webkit-transform: translate(100%, 0);
    transform: translate(100%, 0);
  }
</style>
<script>
  import numlist from './moveNum.vue';
  import {mapState} from 'vuex'
    export default {
      components:{
        numlist
      },
        data(){
            return {
              isshow:true,
              numb:5432167
            }
        },
      computed:{
        ...mapState(['direction']),
        umlength(){
            return this.numb.length
        }
      },
      activated(){

      },
      beforeRouteEnter (to, from, next) {
        /* if(this.$store.state.scrolltop!=0){
         document.body.scrollTop = this.$store.state.scrolltop
         }*/
        next(vm=>{
          if(vm.$store.state.scrolltop!=0){
            document.body.scrollTop = vm.$store.state.scrolltop
          }
        })
      },
      methods:{
        change(){
            this.$router.push('/hello3child')
        },
        changeAction(){
            this.isshow = !this.isshow;
            var promise1 = new Promise(function(resolve){
                setTimeout(()=>{
                  resolve('first')
                },1000)
            });
            var promise2 = new Promise(function(resolve){
              setTimeout(()=>{
                resolve('second')
              },3000)
            });
          var promise3 = new Promise(function(resolve){
            setTimeout(()=>{
              resolve('three')
            },2000)
          });
          Promise.all([promise1,promise2,promise3]).then(function(resovearr){
            console.log(resovearr);
//            var map1 = resovearr.map()
          })
        }
      }
    }
</script>
