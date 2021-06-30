<template>
<div class="card">
<slot></slot>
</div>
</template>

<style scoped>
.card {

    margin: 2rem auto;
    box-shadow: 0px 2px 8px rgba(0,0,0,0.26);
    border-radius: 12px;
    padding: 1rem;
    max-width: 40rem;
}
</style>