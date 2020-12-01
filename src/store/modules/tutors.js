export default {
    namespaced: true,
    state() {
        return {
            tutors: [
                {
                    id: 't1',
                    firstName: 'Maximilian',
                    lastName: 'Schwarzmüller',
                    areas: ['frontend', 'backend'],
                    description: "I'm Maximilian and I've worked as a freelance web developer for years. Let me help you become a developer as well!",
                    hourlyRate: 30
                },
                {
                    id: 't2',
                    firstName: 'Julie',
                    lastName: 'Jones',
                    areas: ['frontend', 'career'],
                    description: 'I am Julie and as a senior developer in a big tech company, I can help you get your first job or progress in your current role.',
                    hourlyRate: 25
                }
            ]
        }
    },
    mutations: {
        registerTutor(state, payload) { state.tutors.push(payload); },
        setTutors(state, payload) { state.tutors = payload; }
    },
    actions: {
        async registerTutor(context, payload) {
            const userId = context.rootGetters['auth/getUserId'];
            const res = await fetch(`https://tut0r-finder.firebaseio.com/tutors/${userId}.json`, {
                method: 'PUT', body: JSON.stringify(payload)
            });
            // const resBody = await res.json();
            if (!res.ok) {
                // error handling
            } else {
                payload.id = userId;
                context.commit('registerTutor', payload);
            }
        },
        async loadTutors(context) {
            const res = await fetch('https://tut0r-finder.firebaseio.com/tutors.json');
            const resBody = await res.json();
            if (!res.ok) {
                throw new Error(resBody.message || 'Failed to fetch');
            } else {
                let tutors = [];
                for (const tutor in resBody) { tutors.push({...resBody[tutor], id: tutor}); }
                context.commit('setTutors', tutors);
            }
        }
    },
    getters: {
        tutorsList(state) {
            return state.tutors;
        },
        hasTutors(state) {
            return state.tutors && state.tutors.length > 0;
        },
        isTutor(state, getters, rootState, rootGetters) {
            const userId = rootGetters['auth/getUserId'];
            return state.tutors.some(tutor => tutor.id === userId);
        }
    }
}
