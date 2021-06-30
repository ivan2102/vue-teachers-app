import { createRouter, createWebHistory } from 'vue-router';
import UserAuth from './pages/auth/UserAuth.vue';
import store from './store/index';

//teachers
import TeachersList from './pages/teachers/TeachersList.vue';
import SingleTeacher from './pages/teachers/SingleTeacher.vue';

//requests
import ContactTeacher from './pages/requests/ContactTeacher.vue';
import RequestsReceived from './pages/requests/RequestsReceived.vue';
//teachers
import TeacherRegistration from './pages/teachers/TeacherRegistration.vue';
//not found page
import NotFound from './pages/NotFound.vue';

const router = createRouter({

    history: createWebHistory(),

   routes: [
     {path: '/', redirect: '/teachers'},
     {path: '/teachers', component: TeachersList},
     {path: '/teachers/:id', component: SingleTeacher, props: true, children: [

      {path: 'contact', component: ContactTeacher}
     ]},
     {path: '/register', component: TeacherRegistration, meta: { requiresAuth: true }},
     {path: '/requests', component: RequestsReceived, meta: { requiresAuth: true }},
     {path: '/auth', component: UserAuth, meta: { requiresUnauth: true }},
     {path: '/:NotFound(.*)', component: NotFound}
   ]
});

router.beforeEach(function(to, from, next) {

if(to.meta.requiresAuth && !store.getters.isAuth) {

  next('/auth');

}else if(to.meta.requiresUnauth && store.getters.isAuth) {

  next('/teachers');

}else {

  next();
}


});



export default router;

