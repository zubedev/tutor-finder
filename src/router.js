import { defineAsyncComponent } from 'vue';
import { createRouter, createWebHistory } from "vue-router";

// import UserAuth from "@/pages/auth/UserAuth";
import TutorList from "@/pages/tutors/TutorList";
// import TutorDetail from "@/pages/tutors/TutorDetail";
// import TutorRegister from "@/pages/tutors/TutorRegister";
// import ContactTutor from "@/pages/requests/ContactTutor";
// import RequestList from "@/pages/requests/RequestList";
import NotFound from "@/pages/NotFound";

import store from "./store";

const UserAuth = defineAsyncComponent(() => import('@/pages/auth/UserAuth'));
const TutorDetail = defineAsyncComponent(() => import('@/pages/tutors/TutorDetail'));
const TutorRegister = defineAsyncComponent(() => import('@/pages/tutors/TutorRegister'));
const ContactTutor = defineAsyncComponent(() => import('@/pages/requests/ContactTutor'));
const RequestList = defineAsyncComponent(() => import('@/pages/requests/RequestList'));

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', redirect: '/tutors' },
        { path: '/auth', component: UserAuth, meta: {requiresUnauth: true} },
        { path: '/tutors', component: TutorList },
        { path: '/tutors/:id', component: TutorDetail, props: true, children: [
                { path: 'contact', component: ContactTutor } // /tutors/t1/contact
            ]},
        { path: '/register', component: TutorRegister, meta: {requiresAuth: true} },
        { path: '/requests', component: RequestList, meta: {requiresAuth: true} },
        { path: '/:notfound(.*)', component: NotFound }
    ]
});

router.beforeEach((to, from, next) => {
    if (to.meta.requiresAuth && !store.getters['auth/isAuthenticated']) { next('/auth'); }
    else if (to.meta.requiresUnauth && store.getters['auth/isAuthenticated']) { next('/tutors'); }
    else { next(); }
});

export default router;
