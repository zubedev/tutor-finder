import { createStore } from "vuex";

import tutorsModule from "@/store/modules/tutors";
import requestsModule from "@/store/modules/requests";

const store = createStore({
    modules: {
        tutors: tutorsModule,
        requests: requestsModule
    }
});

export default store;
