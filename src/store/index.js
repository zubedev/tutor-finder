import { createStore } from "vuex";

import authModule from "@/store/modules/auth";
import tutorsModule from "@/store/modules/tutors";
import requestsModule from "@/store/modules/requests";

const store = createStore({
    modules: {
        auth: authModule,
        tutors: tutorsModule,
        requests: requestsModule
    }
});

export default store;
