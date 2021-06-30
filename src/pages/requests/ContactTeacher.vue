<template>
    
    <form @submit.prevent="submitForm">
        <div class="form-control">
            <label for="email">Your Email</label>
            <input type="email" v-model.trim="email" id="email">
        </div>

        <div class="form-control">
        <label for="subject">Subject</label>
        <input type="text" v-model.trim="subject" id="subject">
        </div>

        <div class="form-control">
            <label for="message">Your Message</label>
            <textarea id="message" v-model.trim="message" rows="5"></textarea>
        </div>
        <p class="error" v-if="!formIsValid">Your email and message can not be empty.</p>
    
    <div class="actions">
    <base-button>Send  Message</base-button>
    </div>
    </form>
    
</template>

<script>
export default {
    
    data() {
        return {

            email: '',
            message: '',
            subject: '',
            formIsValid: true
        }
    },

    methods: {
      
      submitForm() {

          this.formIsValid = true;

          if(this.email === '' || !this.email.includes('@') || this.subject === '' ||   this.message === '') {

              this.formIsValid = false;
              return;
          }

          //request a message from vuex requests
          this.$store.dispatch('requests/contactTeacher', {

              email: this.email,
              message: this.message,
              subject: this.subject,
             teacherId: this.$route.params.id
          });

          this.$router.replace('/requests');
      }
    }
}
</script>


<style scoped>

form {

    margin: 1rem;
    border: 1px solid #ccc;
    border-radius: 12px;
    padding: 1rem;
}
.form-control {

    margin: 0.5rem 0;
}

label {

    display: block;
    font-weight: bold;
    padding: 0.15rem;
}

input,
textarea {

    display: block;
    width: 100%;
    font: inherit;
    border: 1px solid #ccc;
    margin-bottom: 0.5rem;
}

input:focus,
textarea:focus {

    border-color: #3d008d;
    background-color: #faf6ff;
    outline: none;
}

.error {

    color: red;
    font-weight: bold;
}

.actions {

    text-align: center;
}
</style>

