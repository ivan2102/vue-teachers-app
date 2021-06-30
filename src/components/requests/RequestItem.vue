<template>
<section>
    <div>
        <a :href="emailLink">Email: {{ email }}</a>
    </div>

    <p>Subject: {{ subject }}</p>
    <p>Message: {{ message }}</p>
</section>
</template>

<script>
export default {
  
  props: ['email', 'subject', 'message'],

  computed: {

  emailLink() {

      return 'mailto:' + this.email;
  }

  }
}
</script>

<style scoped>
section {

    margin: 2rem auto;
    border: 1px solid #252525;
    padding: 1rem;
}

a {

    color: #3d008d;
    text-decoration: none;
    font-weight: bold;
}

a:hover,
a:active {

    color: #ff58e9;
}

p {

    margin: 0.5rem 0;
}
</style>

