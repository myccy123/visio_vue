<template>
  <div id="app">
      <router-view></router-view>
  </div>
</template>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

*{
    padding: 0;
    margin: 0;
}

li{
    list-style: none;
    margin: 0px;
    padding: 0px;
}

ul{
    margin: 0px;
    padding: 0px;
}

::-webkit-scrollbar{
    width: 4px;
    height: 8px;
    position: fixed;
}
::-webkit-scrollbar-button{
    display: none;
}
::-webkit-scrollbar-thumb{
    background-color: hsla(220,4%,58%,.5);
    border-radius: 4px;
}
.anchorBL {
    display: none!important;
}
</style>