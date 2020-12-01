export default {
    namespaced: true,
    state() {
        return {
            requests: []
        }
    },
    mutations: {
        addRequest(state, payload) {
            state.requests.push(payload);
        }
    },
    actions: {
        contactTutor(context, payload) {
            payload.id = new Date().toISOString();
            context.commit('addRequest', payload);
        }
    },
    getters: {
        requestsList(state, getters, rootState, rootGetters) {
            return state.requests.filter(request => request.tutorId === rootGetters['auth/getUserId']);
        },
        hasRequests(state, getters) {
            return getters.requestsList && getters.requestsList.length > 0
        }
    }
}
