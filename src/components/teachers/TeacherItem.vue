<template>
<section>
    <h3>{{ fullName }}</h3>
    <h4>{{ country }}</h4>
    <h4>{{ address }}</h4>
    <h4>{{ phone }}</h4>
    <div>
      <base-badge
       v-for="language in languages"
        :key="language" 
        :type="language"
        :title="language"
        >
        </base-badge>
    </div>

    <div class="actions">
        <base-button link mode="outline" :to="contactTeacherLink">Contact</base-button>
        <base-button link :to="viewTeacherDetailsLink">View Details</base-button>
    </div>
</section>
</template>

<script>
export default {
    
    props: ['id', 'firstName', 'lastName', 'country', 'address', 'phone', 'languages'],

    computed: {

        fullName() {

            return this.firstName + ' ' + this.lastName;
        },

        Country() {

            return this.country;
        },

        Address() {

            return this.address;
        },

        Phone() {

            return this.phone;
        },

        contactTeacherLink() {

            return this.$route.path + '/' + this.id + '/contact'; // /teachers/c1/contact
        },

        viewTeacherDetailsLink() {

            return this.$route.path + '/' + this.id; // /teachers/c1/details
        }
    }
}
</script>


<style scoped>
section {

    margin: 1rem auto;
    border: 1px solid #424242;
    border-radius: 12px;
    padding: 1rem;
    
}

h3 {

    font-size: 1.5rem;
}

h3,
h4 {

    margin: 0.5rem 0;
}

div {

    margin: 0.5rem 0;
}

.actions {

    display: flex;
    justify-content: flex-end;
}


</style>
