<template>
  <div id="app">
    <Header/>
    <router-view/>
    <Footer/>
  </div>
</template>

<script>
import Header from "@/components/Header"
import Footer from "@/components/Footer"
export default {
  name: 'App',
  components: {
    Header,
    Footer
  },
}
</script>

<style>
@font-face {
  font-family: Roboto;
  src: local(Roboto), url(assets/fonts/Roboto-Regular.ttf) format("truetype");
}
#app {
  font-family: Roboto, Verdana, sans-serif;
  /*font-family: 'Avenir', Helvetica, Arial, sans-serif;*/
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
