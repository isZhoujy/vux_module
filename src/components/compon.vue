<template>
  <div :class="actionclass" v-show="show">
    <slot><b>default</b> defaul123t</slot>
    <slot name="test1"><em>我是slot</em></slot>
    <span @click="show=false">x</span>
  </div>
</template>
<style>
.alert_default{
  color: black;
}
  .alert_success{
    color: red;
  }
  alert_green{
    color: green;
  }
</style>
<script>
    export default {
        props:['type'],
      data(){
          return {
              show:true
          }
      },
      computed:{
        actionclass(){
            return {
              'alert_default':this.type=='default',
              'alert_success':this.type=='success',
              'alert_green':this.type=='green',
            }
        }
      }
    }
</script>
