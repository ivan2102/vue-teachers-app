<template>
<base-card>
<h2>Choose Your Language of choice</h2>
<span class="filter-option">
    <input type="checkbox" @change="filtersData" checked id="england">
     <img  src="https://img.icons8.com/color/48/000000/great-britain-circular.png"/>  
</span>

<span class="filter-option">
    <input type="checkbox" @change="filtersData" checked id="german">
    <img  src="https://img.icons8.com/color/48/000000/germany.png"/> 
</span>

<span class="filter-option">
    <input type="checkbox" @change="filtersData" checked id="france">
    <img  src="https://img.icons8.com/color/48/000000/france-circular.png"/>
</span>
</base-card>
</template>

<script>
export default {

    emits: ['filter-data'],
    
    data() {
        return {

            filters: {

                england: true,
                german: true,
                france: true
            }
        }
    },

    methods: {

        filtersData(event) {

           const filterId = event.target.id;
           const isActive = event.target.checked;

           const updatedFilters = {
               ...this.filters,
               [filterId]: isActive
           }

           this.filters = updatedFilters;
           this.$emit('filter-data', updatedFilters);
        }
    }


}
</script>




<style scoped>
h2 {
    margin: 0.5rem 0;
}
.filter-option input,
.filter-option img {

    vertical-align: middle;
}

.filter-option {

    margin-right: 1rem;
}
</style>
