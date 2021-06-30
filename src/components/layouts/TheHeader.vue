<template>
<header>
   <nav>
    <h2><router-link to="/teachers">Learn new language</router-link></h2>
   <ul>
     <li>
       <router-link to="/teachers">All Teachers</router-link>
     </li>

     <li v-if="isLoggedIn">
     <router-link to="/requests">Requests</router-link>
     </li>

     <li v-else>
     <router-link to="/auth">Login</router-link>
     </li>

     <li v-if="isLoggedIn">
       <base-button @click="logout">Logout</base-button>
     </li>

   </ul>

    </nav>
</header>
</template>

<script>
export default {
  
  computed: {

    isLoggedIn() {

      return this.$store.getters.isAuth;
    }
  },

  methods: {

    logout() {

      this.$store.dispatch('logout');
      this.$store.replace('/auth');
    }
  }
}
</script>


<style scoped>
header {

  width: 100%;
  height: 5rem;
  background-color: #3B3B98;
  display: flex;
  justify-content: center;
  align-items: center;  
}

header a {

  display: inline-block;
  color: #d1d8e0;
  padding: 0.75rem 1.5rem;
  text-decoration: none;
  border: 1px solid transparent;
}

a:hover,
a:active,
a.router-link-active {

  border: 1px solid #d1d8e0;
}

header nav {

  width: 90%;
  margin: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

h2 {
  margin: 0;
}

h2 a {

  color: #d1d8e0;
  margin: 0;
}

h2 a:hover,
h2 a:active,
h2 a.router-link-active {

  border-color: transparent;
}

header ul {

  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

li {

  margin: 0 0.5rem;
}
</style>
