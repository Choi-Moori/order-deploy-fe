<!--template에는 html코드가 들어가고, 
    script에는 js코드가 들어감. 
    디자인은 style태그 안에 들어감 -->
    <!-- vue 파일 안에는 head 태그가 없고, head의 공통 import 사항은 main.js 에 구성하면 됨. -->
<template>
  <!-- router-view를 통해 app.vue에서 화면 라우팅. -->
  <!-- 약속 되어 있는 view 이다. -->
  <!-- <HeaderComponent /> -->
  <v-app>
    <v-main>
      <router-view />
      <VuetifyComponent />
      <ModelingComponent />
    </v-main>
  </v-app>
  <!-- <FooterComponent /> -->
</template>

<script>
// import VuetifyComponent from './components/practice/VuetifyComponent.vue';

// App.vue 는 Vue애플리케이션의 루트 컴포턴트(재활용이 가능한 화면)
//  import HelloWorld from './components/HelloWorld.vue'
// import HeaderComponent from './components/HeaderComponent.vue'
// import FooterComponent from './components/FooterComponent.vue'

export default {
  name: 'App',
  components: {
    // HelloWorld
    // HeaderComponent, FooterComponent
    // VuetifyComponent,
  }
}
</script>

<style>

</style>