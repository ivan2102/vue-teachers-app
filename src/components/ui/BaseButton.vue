<template>

<button v-if="!link" :class="mode">
    <slot></slot>
</button>

<router-link v-else :to="to" :class="mode">
    <slot></slot>
</router-link>

</template>

<script>
export default {

    props: {

        link: {

            type: Boolean,
            required: false,
            default: false
        },

        to: {

            type: String,
            required: false,
            default: '/'
        },

        mode: {

           type: String,
           required: false,
           default: null
        }
    }
}
</script>

<style scoped>
button,
a {

    padding: 0.75rem 1.5rem;
    background-color: #3d33b0;
    border: 1px solid #3d33b0;
    color: white;
    cursor: pointer;
    font: inherit;
    display: inline-block;
    border-radius: 30px;
    text-decoration: none;
    margin-right: 0.5rem;
}

a:hover,
a:active,
button:hover,
button:active {

    background-color: #ff58e9;
    border-color: #ff58e9;
}

.flat {
    background-color: transparent;
    color: #3d33b0;
    border: none;
}

.outline {

    background-color: transparent;
    border-color: #e67dd8;
    color: #e67dd8;
}

.flat:hover,
.flat:active,
.outline:hover,
.outline:active {

    background-color: #edd2ff;
}
</style>
