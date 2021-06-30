<template>
<section>
    <base-card>
    <h2>{{ fullName }}</h2>
    <h3>{{ country }}</h3>
    <h3>{{ address }}</h3>
    <h3>{{ phone }}</h3>
     <header>
    <h3>Are you interested.Contact your teacher now!</h3>
    <base-button link :to="contactLink">Contact</base-button>
     </header>

     <router-view></router-view>

    </base-card>
  </section>

  <section>
      <base-card>
  <p>{{ description }}</p>
    <base-badge 
    v-for="language in languages"
    :key="language"
    :type="language"
    >
    
    </base-badge>
    </base-card>
</section>
</template>

<script>
export default {

    props: ['id'],
    
    data() {
        return {

          selectedTeacher: null
        }
    },

    created() {

        

        this.selectedTeacher = this.$store.getters['teachers/teachers'].find(teacher => teacher.id === this.id);

        
    },

    computed: {

      fullName() {

          return this.selectedTeacher.firstName + ' ' + this.selectedTeacher.lastName;
      },

      contactLink() {

          return this.$route.path + '/' + this.id + '/contact';
      },

      country() {

          return this.selectedTeacher.country;
      },

      address() {

          return this.selectedTeacher.address;
      },

      phone() {

          return this.selectedTeacher.phone;
      },

      languages() {

        return this.selectedTeacher.languages;
      },

      description() {

          return this.selectedTeacher.description;
      }
    },

    
}
</script>
