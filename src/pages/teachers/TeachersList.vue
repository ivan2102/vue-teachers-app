<template>
<base-dialog :show="!!error" title="An error occurred" @close="handleError">
<p>{{ error }}</p>
</base-dialog>
<section>
    
    <filter-teacher @filter-data="setFilters"></filter-teacher>
    
</section>

<section>
    <base-card>
    <div class="controls">
        <base-button mode="outline" @click="fetchTeachers(true)">Refresh</base-button>
        <base-button link to="/auth?redirect=register" v-if="!isLoggedIn">Login to Register as Teacher</base-button>
        <base-button v-if="!isTeacher && !isLoading && isLoggedIn" link to="register">Register as Teacher</base-button>
    </div>
    <div v-if="isLoading">
    <base-spinner></base-spinner>
    </div>
    <ul v-else-if="hasTeachers">
        <teacher-item
         v-for="teacher in filteredTeachers" 
         :key="teacher.id"
         :id="teacher.id"
         :first-name="teacher.firstName"
         :last-name="teacher.lastName"
         :country="teacher.country"
         :address="teacher.address"
         :phone="teacher.phone"
         :languages="teacher.languages"
         >
            
        </teacher-item>
    </ul>
    <h3 v-else>No teachers found.</h3>
    </base-card>
    
</section>
</template>

<script>

import TeacherItem from '../../components/teachers/TeacherItem.vue';
import FilterTeacher from '../../components/teachers/FilterTeacher.vue';

export default {

    data() {
        return {

            isLoading: false,
            error: null,

            newFilters: {

                england: true,
                german: true,
                france: true
            }
        }
    },

    components: {

        TeacherItem,
        FilterTeacher
    },
    
    computed: {

        filteredTeachers() {

           const teachers = this.$store.getters['teachers/teachers'];
           return teachers.filter(teacher => {

               if(this.newFilters.england && teacher.languages.includes('england')) {

                 return true;
               }

               if(this.newFilters.german && teacher.languages.includes('german')) {

                   return true;
               }

               if(this.newFilters.france && teacher.languages.includes('france')) {

                   return true;
               }

               return false;
           })
        },

        hasTeachers() {

          return !this.isLoading && this.$store.getters['teachers/hasTeachers'];
        },

        isTeacher() {

            return this.$store.getters['teachers/isTeacher'];
        },


            isLoggedIn() {

            return this.$store.getters.isAuth;
        }

        
    },

    methods: {

        setFilters(updatedFilters) {

            this.newFilters = updatedFilters;
        },

       async fetchTeachers(refresh = false) {
            this.isLoading = true;
            try {

            await this.$store.dispatch('teachers/fetchTeachers', { forceRefresh: refresh });

            }catch(error) {

              this.error = error.message || 'Something went wrong!';
            }
            this.isLoading = false;
        },

        handleError() {

            this.error = null;
        },

    

    },


     created() {

            this.fetchTeachers();
        }
}
</script>

<style scoped>
ul {

    margin: 0;
    padding: 0;
    list-style: none;
}

.controls {

    display: flex;
    justify-content: space-between;
}
</style>

