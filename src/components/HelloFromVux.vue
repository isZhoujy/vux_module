<template>
  <div style="height: 100%">
    <!--<view-box ref="viewBox" body-padding-top="46px" body-padding-bottom="55px">-->
    <div style="height: 100%;">
      <x-header :left-options="{showBack: ifShowbar}" :title="headTit" :transition="directionhead"></x-header>
      <transition :name="direction">
        <keep-alive>
          <router-view class="child-view" :style="{'padding-bottom':bottomstyle}"></router-view>
        </keep-alive>
      </transition>
    </div>
    <tabbar v-show="!tabberShow">
      <tabbar-item :selected="state=='hello1'" link="/hello1">
        <!--<img slot="icon" src="../assets/demo/icon_nav_button.png">-->
        <i slot="icon" class="icon-bookmark"></i>
        <span slot="label">Wechat</span>
      </tabbar-item>
      <tabbar-item :selected="state=='hello2'" show-dot link="/hello2">
        <img slot="icon" src="../assets/vux_logo.png">
        <span slot="label">Message</span>
      </tabbar-item>
      <tabbar-item :selected="state=='hello3'" link="/hello3">
        <!--<img slot="icon" src="../assets/demo/icon_nav_article.png">-->
        <span slot="label">Explore</span>
      </tabbar-item>
      <tabbar-item :selected="state=='hello4'" badge="2" link="/hello4">
        <img slot="icon" src="../assets/logo.png">
        <span slot="label">News</span>
      </tabbar-item>
    </tabbar>
    <loading v-model="isLoading"></loading>
    <!--</view-box>-->
  </div>

</template>

<script>
  import { Tabbar, TabbarItem, Group, Cell ,XHeader,Icon,Loading  } from 'vux'
  import { mapState } from 'vuex'
  export default {
    components: {
      Group,
      XHeader,
      Cell,
      Tabbar,
      TabbarItem,
      Icon,
      Loading
    },
    data () {
      return {
        // note: changing this line won't causes changes
        // with hot-reload because the reloaded component
        // preserves its current state and we are modifying
        // its initial state.
        msg: 'Hello World!',
        state:'hello1',
        bottomstyle:'55px'
      }
    },
    mounted(){
      document.title = this.$route.meta.title;
      this.state = window.location.hash.substr(2);
//      if(this.$route.meta.showback){
//        var childview = document.querySelector('.child-view');
//        childview.style.bottom = 0;
//      }
    },
    computed:{
      ...mapState(['direction']),
      ...mapState({
        isLoading: state => state.isLoading
      }),
      directionhead(){
        return this.direction === 'forward' ? 'vux-header-fade-in-right' : 'vux-header-fade-in-left'
      },
      headTit(){
          return this.$route.meta.title;
      },
      ifShowbar(){
          return this.$route.meta.showback;
      },
      tabberShow(){
          return this.$route.meta.showback;
      }
    },
    watch:{
      '$route':function(n){
          document.title = n.meta.title;
          this.headTit = n.meta.title;
          this.ifShowbar = n.meta.showback;
          this.state = window.location.hash.substr(2);
          if(this.tabberShow){
              this.bottomstyle = 0;
              this.tabberShow = n.meta.showback;
          }else{
              this.bottomstyle = '55px';
          }
      }
    },
  }
</script>

<style>
  .vux-demo {
    text-align: center;
    margin-bottom: 500px;
  }
  .weui-tabbar{
    position: fixed!important;
    transition: all 0.5s;
  }
  .logo {
    width: 100px;
    height: 100px
  }
  .child-view {
    position: absolute;
    width:100%;
    overflow: auto;
    padding-bottom:55px;
    padding-top:44px;
    top: 0px;
    bottom: 0px;
    transition: all .4s cubic-bezier(.55,0,.1,1);
  }
  .forward-enter, .reverse-leave-active {
    opacity: 0;
    -webkit-transform: translate(50%, 0);
    transform: translate(50%, 0);
  }
  .forward-leave-active, .reverse-enter {
    opacity: 0;
    -webkit-transform: translate(-50%, 0);
    transform: translate(-50%, 0);
  }
  .vux-header{
    width:100%;
    z-index:100;
  }
  body,html{
    height:100%;
    width:100%;
  }
</style>
