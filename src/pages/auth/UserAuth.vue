<template>
<div>

<base-dialog :show="!!error" title="An error occurred" @close="handleError">
<p>{{ error }}</p>
</base-dialog>

<base-dialog :show="isLoading" title="Authenticating..." fixed>
<base-spinner></base-spinner>
</base-dialog>

<base-card>
<form @submit.prevent="submitForm">
    <h1>Login</h1>
    <div class="form-control">
        <label for="email">Your E-Mail</label>
        <input type="email" v-model.trim="email" id="email">
    </div>

    <div class="form-control">
        <label for="password">Password</label>
        <input type="password" v-model.trim="password" id="password">
    </div>
    <p class="error" v-if="!formIsValid">Email and password must not be empty.Password must be at least 6 characters long.</p>
    <base-button>{{ loginButtonSwitch }}</base-button>
    <base-button type="button" @click="switchAuthMode" mode="flat">{{ signupButtonSwitch }}</base-button>
</form>
</base-card>
</div>
</template>

<script>
export default {

    data() {
        return {
    
    email: '',
    password: '',
    formIsValid: true,
    mode: 'login',
    isLoading: false,
    error: null

        }
        
    },

    computed: {

       loginButtonSwitch() {

           if(this.mode === 'login') {

               return 'Login';

           }else {

               return 'Signup';
           }
       },

       signupButtonSwitch() {

           if(this.mode === 'login') {

               return 'Signup instead';

           }else {

               return 'Login instead';
           }
       }
    },

    methods: {

       async submitForm() {

            this.formIsValid = true;

          if(this.email === '' || !this.email.includes('@') || this.password < 6) {
              
              this.formIsValid = false;
              return;
          }

           this.isLoading = true;

           const actionPayload = {

               email: this.email,
               password: this.password
           }

             try {

           if(this.mode === 'login') {

              await this.$store.dispatch('login', actionPayload);

            }else {

              await this.$store.dispatch('signup', actionPayload);
          }

           const redirectUrl = '/' + (this.$route.query.redirect || 'teachers');
           this.$router.replace(redirectUrl);

           }catch(error) {

               this.error = error.message || 'Something went wrong';
           }

           this.isLoading = false;
        },

        switchAuthMode() {

            if(this.mode === 'login') {

                this.mode = 'signup';

            }else {

                this.mode = 'login';
            }
        },


        handleError() {

            this.error = null;
        }
    }
}
</script>


<style scoped>
form {

    margin: 1rem;
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

input {

    display: block;
    width: 100%;
    font: inherit;
    border: 1px solid #ccc;
    margin-bottom: 0.5rem;
}

input:focus {

    border-color: #3d008d;
    outline: none;
    background-color: #faf6ff;
}

.error input,
.error label {

    color: red;
}

h1 {

    text-align: center;
    font-weight: 400;
    
}
</style>