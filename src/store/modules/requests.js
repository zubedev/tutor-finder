export default {
    namespaced: true,
    state() {
        return {
            requests: [
                // {
                //     id: ...,
                //     email: '...@....com',
                //     message: '... ... ...'
                // }
            ]
        }
    },
    mutations: {
        addRequest(state, payload) { state.requests.push(payload); },
        setRequests(state, payload) { state.requests = payload; }
    },
    actions: {
        async contactTutor(context, payload) {
            const tutorId = payload.tutorId;
            delete payload.tutorId;
            const res = await fetch(`https://tut0r-finder.firebaseio.com/requests/${tutorId}.json`, {
                method: 'POST', body: JSON.stringify(payload)
            });
            const resBody = await res.json();
            if (!res.ok) {
                throw new Error(resBody.message || 'Failed to send request');
            } else {
                payload.id = resBody.name;
                context.commit('addRequest', payload);
            }
        },
        async loadRequests(context) {
            const userId = context.rootGetters['auth/getUserId'];
            const res = await fetch(`https://tut0r-finder.firebaseio.com/requests/${userId}.json`);
            const resBody = await res.json();
            if (!res.ok) {
                throw new Error(resBody.message || 'Failed to load requests');
            } else {
                let requests = [];
                for (const request in resBody) { requests.push({...resBody[request], id: request}); }
                context.commit('setRequests', requests);
            }
        }
    },
    getters: {
        requestsList(state) {
            return state.requests;
        },
        hasRequests(state, getters) {
            return getters.requestsList && getters.requestsList.length > 0
        }
    }
}
