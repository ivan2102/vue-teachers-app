<template>
<form @submit.prevent="submitForm">
    <div class="form-control">
       <label for="file">Your Image</label>
        <input type="file"   @blur="checkValidity('file')" @change="uploadImage" id="file">
     </div>

     <div class="form-control" d-flex>
         <div class="p-1"  v-for="image in images" :key="image">
           <img width="80px" :src="image" alt="" />
             </div>
     </div>

    <div class="form-control" :class="{invalid: !firstName.isValid}">
        <label for="firstname">Firstname</label>
        <input type="text" v-model.trim="firstName.value" @blur="checkValidity('firstName')" id="firstname">
        <p v-if="!firstName.isValid">Firstname must not be empty.</p>
    </div>

    <div class="form-control" :class="{invalid: !lastName.isValid}">
        <label for="lastname">Lastname</label>
        <input type="text" v-model.trim="lastName.value" @blur="checkValidity('lastName')" id="lastname">
        <p v-if="!lastName.isValid">Lastname must not be empty.</p>
    </div>

    <div class="form-control" :class="{invalid: !country.isValid}">
        <label for="country">Your Country</label>
        <input type="text" v-model.trim="country.value" @blur="checkValidity('country')" id="country">
        <p v-if="!country.isValid">Country must not be empty.</p>
    </div>

    <div class="form-control" :class="{invalid: !address.isValid}">
        <label for="address">Your Address</label>
        <input type="text" v-model.trim="address.value" @blur="checkValidity('address')" id="address">
        <p v-if="!address.isValid">Address must not be empty.</p>
    </div>

      <div class="form-control" :class="{invalid: !phone.isValid}">
        <label for="phone">Your Phone</label>
        <input type="number" v-model.number="phone.value" @blur="checkValidity('phone')" id="phone">
        <p v-if="!phone.isValid">Phone must be greater than 0.</p>
    </div>

    <div class="form-control" :class="{invalid: !description.isValid}">
        <label for="description">Description</label>
       <textarea id="description" v-model.trim="description.value" @blur="checkValidity('description')" rows="3"></textarea>
       <p v-if="!description.isValid">Description must not be empty.</p>
    </div>

    <div class="form-control" :class="{invalid: !languages.isValid}">
        <h3>Your Language of choice</h3>

        <div>
            <input type="checkbox" v-model="languages.value" @blur="checkValidity('languages')" value="england" id="england">
            <img class="image" src="https://img.icons8.com/color/48/000000/great-britain-circular.png"/>
            <!--<label for="english">English</label>-->
        </div>

        <div>
            
            <input type="checkbox" v-model="languages.value" @blur="checkValidity('languages')" value="german" id="german">
            <img class="image" src="https://img.icons8.com/color/48/000000/germany.png"/> 
           <!-- <label for="german">German</label>-->
            
        </div>

        <div>
            <input type="checkbox"  v-model="languages.value" @blur="checkValidity('languages')" value="france" id="france">
            <img class="image" src="https://img.icons8.com/color/48/000000/france-circular.png"/>
            <!--<label for="france">France</label>-->
            
        </div>
        <p v-if="!languages.isValid">At least one language must be checked.</p>
    </div>
    <p v-if="!formIsValid">Fields must not be empty.</p>
    <base-button>Create</base-button>
</form>
</template>

<script>

import firebase from 'firebase'

export default {

    

    emits: ['change-data'],

    data() {
        return {

            images: [],
    
    firstName: {

        value: '',
        isValid: true
    },
    lastName: {

        value: '',
        isValid: true
    },
    country: {

        value: '',
        isValid: true
    },
    address: {

        value: '',
        isValid: true
    },
    phone: {

        value: null,
        isValid: true
    },
    description: {

        value: '',
        isValid: true
    },
    languages: {

        value: [],
        isValid: true
    },
    formIsValid: true,
    

    }

    },


    methods: {

        checkValidity(input) {

          this[input].isValid = true;
        },

        formValidation() {

            this.formIsValid = true;

            if(this.firstName.value === '') {

                this.firstName.isValid = false;
                this.formIsValid = false;
            }

            if(this.lastName.value === '') {

                this.lastName.isValid = false;
                this.formIsValid = false;
            }

            if(this.country.value === '') {

                this.country.isValid = false;
                this.formIsValid = false;
            }

            if(this.address.value === '') {

                this.address.isValid = false;
                this.formIsValid = false;
            }

            if(!this.phone.value) {

                this.phone.isValid = false;
                this.formIsValid = false;
            }

            if(this.description.value === '') {

                this.description.isValid = false;
                this.formIsValid = false;
            }

            if(this.languages.value.length === 0) {

                this.languages.isValid = false;
                this.formIsValid = false;
            }
        },

        submitForm() {

            this.formValidation();

            if(!this.formIsValid) {

                return;
            }

            const formData = {
               
                firstName: this.firstName.value,
                lastName: this.lastName.value,
                country: this.country.value,
                address: this.address.value,
                phone: this.phone.value,
                description: this.description.value,
                languages: this.languages.value
            }

            this.$emit('change-data', formData);
        },

        
        
        uploadImage(event) {

            if(event.target.files[0]) {

            let file = event.target.files[0];

            let storageRef = firebase.storage().ref('images/' + file.name);

           let uploadTask = storageRef.put(file);

            uploadTask.on('state_changed', () => {

            }, (error) => {

            console.log(error);
            }, () => {
            
            uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {

                this.images.push(downloadURL);
                console.log('File available at', downloadURL);
            })

            })

           }
        }
    }

}
</script>


<style scoped>
form {

    margin: 1rem;
    padding: 1rem;
    border: 1px solid #ccc;
    border-radius: 12px;
}

img {

width: 80px;
}

.image {

    width: 25px;
    display: inline-block;
    margin: 0 0 -0.35rem 0;
}

.form-control {

    margin: 0.5rem 0;
}



input,
textarea {

    width: 100%;
    display: block;
    font: inherit;
    border: 1px solid #ccc;
}

input:focus,
textarea:focus {

    border-color: #3d008d;
    outline: none;
    background-color: #f0e6fd;
}

input[type="checkbox"] + label {

    display: inline-block;
    font-weight: normal;
    margin: 0 0 0 0.5rem;
}

input[type="checkbox"] {

    display: inline-block;
    width: auto;
    border: none;
}

input[type="checkbox"]:focus {

    outline: 1px solid #3d008d;
}

h3 {

    margin: 0.5rem 0;
    font-size: 1rem;
}

.invalid label {

    color: red;
}

.invalid input,
.invalid textarea {

    border: 1px solid red;
}
</style>