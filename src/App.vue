<template>
<the-header></the-header>

  <router-view></router-view>
</template>

<script>

import TheHeader from './components/layouts/TheHeader.vue';

export default {

  components: {

    TheHeader
     
  },

  computed: {

    didAutoLogout() {

      return this.$store.getters.didAutoLogout;
    }
  },

  created() {

    this.$store.dispatch('autoLogin');
  },

  watch: {

    didAutoLogout(curValue, oldValue) {

      if(curValue && curValue !== oldValue) {

        this.$router.replace('/teachers');
      }
    }
  }

}   
      
    
  
</script>


<style>
* {

  box-sizing: border-box;
}

html {

  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

body {

  margin: 0;
}


</style>
