<template>
<base-card>
<h2>Register as a new teacher</h2>
<teacher-form @change-data="controlData"></teacher-form>
</base-card>
</template>

<script>

import TeacherForm from '../../components/teachers/TeacherForm.vue';

export default {
  
  components: {

      TeacherForm
  },

  methods: {

      controlData(data) {

          this.$store.dispatch('teachers/addTeacher', data);
          this.$router.replace('/teachers');
          
         
      }
  }
}
</script>

<style scoped>
h2 {

    margin-left: 1rem;
}
</style>



