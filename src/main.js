import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store/index';
import firebase from 'firebase';

import BaseCard from './components/ui/BaseCard.vue';
import BaseButton from './components/ui/BaseButton.vue';
import BaseBadge from './components/ui/BaseBadge.vue';
import BaseSpinner from './components/ui/BaseSpinner.vue';
import BaseDialog from './components/ui/BaseDialog.vue';

const app = createApp(App);

app.use(router);
app.use(store);

var firebaseConfig = {
    apiKey: "AIzaSyC6-ZI52LqTRMpOxCB7BVQ59VcQ_sSrjpc",
    authDomain: "vue-user-app-8fe7d.firebaseapp.com",
    databaseURL: "https://vue-user-app-8fe7d-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "vue-user-app-8fe7d",
    storageBucket: "vue-user-app-8fe7d.appspot.com",
    messagingSenderId: "540948412491",
    appId: "1:540948412491:web:0afc8f1d1aadc58dd6b5ce"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);


app.component('base-card', BaseCard);
app.component('base-button', BaseButton);
app.component('base-badge', BaseBadge);
app.component('base-spinner', BaseSpinner);
app.component('base-dialog', BaseDialog);


app.mount('#app');
