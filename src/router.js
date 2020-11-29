import { createRouter, createWebHistory } from "vue-router";

import TutorList from "@/pages/tutors/TutorList";
import TutorDetail from "@/pages/tutors/TutorDetail";
import TutorRegister from "@/pages/tutors/TutorRegister";
import ContactTutor from "@/pages/requests/ContactTutor";
import RequestList from "@/pages/requests/RequestList";
import NotFound from "@/pages/NotFound";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', redirect: '/tutors' },
        { path: '/tutors', component: TutorList },
        { path: '/tutors/:id', component: TutorDetail, props: true, children: [
                { path: 'contact', component: ContactTutor } // /tutors/t1/contact
            ]},
        { path: '/register', component: TutorRegister },
        { path: '/requests', component: RequestList },
        { path: '/:notfound(.*)', component: NotFound }
    ]
});

export default router;
