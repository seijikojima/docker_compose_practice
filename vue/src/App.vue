
<template>

  <div id="app">
    <!-- <Header /> -->
    <Todos />
    
  </div>
</template>

<script>
import Todos from './components/Todos';

export default {
  name: 'app',
  components: {
    Todos,
  },
}
</script>

<style>
* {
  box-sizing : border-box;
  margin : 0;
  padding : 0;
}
body {
    font-family: Arial,Helvetica,sans-serif;
    line-height: 1.4;
}
.btn{
    display: inline-block;
    border:none;
    background:#D54E21;
    color:#fff;
    padding: 7px 20px;
    cursor:pointer;
}
.btn:hover {
  background : rgb(213, 111, 33);
}


</style>
