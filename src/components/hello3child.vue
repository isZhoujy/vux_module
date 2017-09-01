<template>
  <div class="childhello">
    我是Hello3child
  </div>
</template>
<style>
.childhello{

}
</style>
<script>
    export default {
      beforeRouteEnter (to, from, next) {
        next(vm=>{

        })
      },
      beforeRouteLeave (to, from, next) {
        next()
      },
    }
</script>
