<template>
  <div id="app">
    <h1 id="logo">we-mosaic</h1>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

#logo {
  width: 100%;
  height: 150px;
  text-align: center;
  vertical-align: middle;

  line-height:150px;
  font-size:100px;
  font-family: 'Montserrat', sans-serif;
  color: #BDEDFF;
}
</style>
