<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <router-view></router-view>
    <mainTabbar></mainTabbar>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import mainTabbar from "./components/content/mainTabbar/MainTabBar";



export default {
  name: 'app',
  components: {
    // HelloWorld
    mainTabbar,
  }
}
</script>

<style>

@import "./assets/css/base.css";





#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
