export default {
    namespaced: true,
    state() {
        return {
            tutors: [
                // {
                //     id: 't1',
                //     firstName: 'Maximilian',
                //     lastName: 'Schwarzmüller',
                //     areas: ['frontend', 'backend'],
                //     description: "I'm Maximilian and I've worked as a freelance web developer for years. Let me help you become a developer as well!",
                //     hourlyRate: 30
                // }
            ],
            lastFetched: null
        }
    },
    mutations: {
        registerTutor(state, payload) { state.tutors.push(payload); },
        setTutors(state, payload) { state.tutors = payload; },
        setFetchTime(state) { state.lastFetched = new Date().getTime(); }
    },
    actions: {
        async registerTutor(context, payload) {
            const userId = context.rootGetters['auth/getUserId'];
            const res = await fetch(`https://tut0r-finder.firebaseio.com/tutors/${userId}.json`, {
                method: 'PUT', body: JSON.stringify(payload)
            });
            const resBody = await res.json();
            if (!res.ok) {
                throw new Error(resBody.message || 'Failed to register');
            } else {
                payload.id = userId;
                context.commit('registerTutor', payload);
            }
        },
        async loadTutors(context, payload) {
            if (!payload.forceUpdate && !context.getters.shouldUpdate) { return; }
            const res = await fetch('https://tut0r-finder.firebaseio.com/tutors.json');
            const resBody = await res.json();
            if (!res.ok) {
                throw new Error(resBody.message || 'Failed to fetch');
            } else {
                let tutors = [];
                for (const tutor in resBody) { tutors.push({...resBody[tutor], id: tutor}); }
                context.commit('setTutors', tutors);
                context.commit('setFetchTime');
            }
        }
    },
    getters: {
        tutorsList(state) { return state.tutors; },
        hasTutors(state) { return state.tutors && state.tutors.length > 0; },
        isTutor(state, getters, rootState, rootGetters) {
            const userId = rootGetters['auth/getUserId'];
            return state.tutors.some(tutor => tutor.id === userId);
        },
        shouldUpdate(state) {
            if (!state.lastFetched) { return true; }
            else { return (new Date().getTime() - state.lastFetched) / 1000 > 60; }
        }
    }
}
