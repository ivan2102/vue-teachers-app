<template>
<base-dialog :show="!!error" title="An error occurred" @close="handleError">
<p>{{ error }}</p>
</base-dialog>
<section>
<base-card>
<header>
<h2>Your Teaching Message</h2>
</header>
<div v-if="isLoading">
    <base-spinner></base-spinner>
</div>
<ul v-else-if="hasRequests">
    <request-item 
    v-for="request in receivedRequests"
    :key="request.id"
    :email="request.email"
    :subject="request.subject"
    :message="request.message"
    >
    </request-item>
</ul>
<h3 v-else>You haven't send any message to teacher yet.</h3>
</base-card>
</section>
</template>

<script>

import RequestItem from '../../components/requests/RequestItem.vue';

export default {

    data() {
        return {

            isLoading: false,
            error: null
        }
    },

    components: {

        RequestItem
    },
    
    computed: {

    receivedRequests() {

       return this.$store.getters['requests/requests'];
    },

    hasRequests() {

       
        return !this.isLoading && this.$store.getters['requests/hasRequests'];
    }


    },

    created() {

       this.fetchRequests();
    },

    methods: {

       async fetchRequests() {

            this.isLoading = true;

            try {

           await this.$store.dispatch('requests/fetchRequests');

            }catch(error) {

                this.error = error.message || 'Something went wrong';
            }

            this.isLoading = false;
        },

        handleError() {

            this.error = null;
        }
    }
}
</script>


<style scoped>

header {

    text-align: center;
}

ul {

    list-style: none;
    margin: 2rem auto;
    padding: 0;
    max-width: 30rem;
    max-height: 30rem;
}

h3 {

    text-align: center;
}

</style>