<template>
  <div class="numlist">
    <ul>
      <li v-for="i in length">
        <div class="ullist">
          <p>0</p>
          <p>1</p>
          <p>2</p>
          <p>3</p>
          <p>4</p>
          <p>5</p>
          <p>6</p>
          <p>7</p>
          <p>8</p>
          <p>9</p>
          <p>0</p>
        </div>
      </li>
    </ul>
  </div>
</template>
<style lang="less" scoped>
  .numlist{
    height:20px;
    ul{
      height:20px;
    }
    li{
      width:16px;
      height: 20px;
      overflow: hidden;
      position: relative;
      float: left;
      .ullist{
        width:16px;
        transition:all 1s;
        position: absolute;
        top:0;
        p{
          color: red;
          line-height:20px;
          text-align: center;
          font-size:16px;
        }
      }
    }

  }
</style>
<script>
    export default {
        methods:{
        },
      props:[
          'nunm',
      ],
      computed:{
        length(){
            return this.nunm.toString().length
        }
      },
      mounted(){
        setTimeout(()=>{
            console.log(length)
          var arrNum = this.nunm.toString().split('');
          console.log(arrNum)
          var oul = document.querySelectorAll('.ullist');
          var arrUl = [].slice.call(oul);
          [].slice.call(oul).forEach(function(v,i){
            arrUl[i].style.top = -20*parseInt(arrNum[i])+'px'
          })

        })
      }
    }
</script>
