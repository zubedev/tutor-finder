export default {
    namespaced: true,
    state() {
        return {
            userId: 't3'
        };
    },
    mutations: {},
    actions: {},
    getters: {
        getUserId(state) {
            return state.userId;
        }
    }
}
