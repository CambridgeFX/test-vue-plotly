<template>
  <div id="app" class="main-container">
    <md-app md-mode="fixed">
      <md-app-toolbar>
        <a href="/"><img id="logo" src="@/assets/web_logo_light.png"></a>
        <div class="md-toolbar-section-end">
          <span class="flex-container-right" v-if="showMenus">
            <md-button to="home" class="md-primary">Home</md-button>
            <md-button to="pairs" class="md-primary">Currency</md-button>
            <md-button to="globals" class="md-primary">Macroeconomic</md-button>
            <md-button to="disclosures" class="md-primary">Disclosures</md-button>
          </span>
          <md-button class="md-icon-button md-primary" @click="showMenus = !showMenus">
            <md-icon>menu</md-icon>
          </md-button>
        </div>
      </md-app-toolbar>
      <md-app-content>
        <!-- <Header/> -->
        <br /><br /><br />
        <transition name="fade-slide-up" mode="out-in">
          <router-view></router-view>
        </transition>
        <Footer/>
      </md-app-content>
    </md-app>
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
  data() {
    return {
      showMenus: false,
    }
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
  /* margin-top: 60px; */
}
.md-app {
  max-height: 100vh;
  width: 100vw;
  height: 100vh;
  overflow-x: hidden;
}
.md-app-toolbar {
  background: rgb(62,17,81) !important;
  z-index: 1000;
  left: 0;
  right: 0;
  display: flex;
  flex-wrap: wrap;
}
.flex-container-right {
  display: flex;
  flex-wrap: wrap;
  justify-content: right;
}
.md-button {
  color: white !important;
}
#logo {
  width: 200px !important;
  /* height: 75px !important; */
  padding: 10px !important;
}
Footer {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
}
.fade-slide-up-enter-active {
  transition: all 0.5s ease;
}
.fade-slide-up-leave-active {
  transition: all 0.5s ease;
}
.fade-slide-up-enter, .fade-slide-up-leave-to {
  transform: translateY(40px);
  opacity: 0;
}
</style>
