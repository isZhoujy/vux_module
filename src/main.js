// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import FastClick from 'fastclick'
import { Loadmore  } from 'mint-ui'
import VueRouter from 'vue-router'
import vueScroller from 'vue-scroller'
import http from './axios'
import App from './App'
import Home from './components/HelloFromVux'
import  { LoadingPlugin,AjaxPlugin,Scroller,Range } from 'vux'
Vue.use(LoadingPlugin)
Vue.use(http)
Vue.use(VueRouter)
Vue.use(Vuex);
Vue.use(vueScroller);
Vue.component(Loadmore.name,Loadmore);
Vue.component('Range',Range);
const routes = [
  {
    path: '/',
    component: Home,
    children:[
      {
        path:'/hello1',
        component:require('./components/hello1.vue'),
        meta:{
          title:'首页',
          showback:false,
        }
      },{
        path:'/hello2',
        component:require('./components/hello2.vue'),
        meta:{
          title:'hello2',
          showback:false,
        }
      },{
        path:'/hello3',
        component:require('./components/hello3.vue'),
        meta:{
          title:'hello3',
          showback:false,
        },
        children:[
          {
            path:"/hello3child",
            component:require('./components/hello3child.vue'),
            meta:{
              title:'hello3child',
              showback:true,
            },
          }
        ]
      },{
        path:'/hello4',
        component:require('./components/hello4.vue'),
        meta:{
          title:'hello4',
          showback:false,
        },
      },{
        path:'/hellochild',
        component:require('./components/hello.vue'),
        meta:{
          title:'hellochild',
          showback:false,
        },
      },
    ],redirect:'/hello1'

  },{
    path:'*',redirect:'/hello1'
  }

]
const router = new VueRouter({
  routes,
});
const history = window.sessionStorage
history.clear()
let historyCount = history.getItem('count') * 1 || 0
history.setItem('/', 0)
function setRouter(rouList){
  rouList.forEach(function(v,i){
    history.setItem(v,i+1);
    history.setItem('count',i+1);
    historyCount = i+1;
  })
};
setRouter(['/hello1','/hello2','/hello3','/hello4','/hellochild'])

router.beforeEach(function (to, from, next) {
  const toIndex = history.getItem(to.path)
  const fromIndex = history.getItem(from.path)
  store.commit('updateLoadingStatus', {isLoading: true})
  if (toIndex) {
    if (!fromIndex || parseInt(toIndex, 10) > parseInt(fromIndex, 10) || (toIndex === '0' && fromIndex === '0')) {
      store.commit('updateDirection', {direction: 'forward'})
    } else {
      store.commit('updateDirection', {direction: 'reverse'})
    }
  } else {
    ++historyCount
    history.setItem('count', historyCount)
    to.path !== '/' && history.setItem(to.path, historyCount)
    store.commit('updateDirection', {direction: 'forward'})
  }

  if (/\/http/.test(to.path)) {
    let url = to.path.split('http')[1]
    window.location.href = `http${url}`
  } else {
    next()
  }
});
router.afterEach(function (to) {
  setTimeout(()=>{
    store.commit('updateLoadingStatus', {isLoading: false})
  },500)
})

const store = new Vuex.Store({
  modules:{
    'vux':{
      state: {

      },
      mutations: {

      }
    }
  },
  state:{
    direction:'forward',
    isLoading: false
  },
  mutations:{
    updateLoadingStatus (state, payload) {
      state.isLoading = payload.isLoading
    },
    updateDirection (state, payload) {
      state.direction = payload.direction
    },
  }
})
FastClick.attach(document.body)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app-box')
