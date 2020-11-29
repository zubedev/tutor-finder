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
                    description:
                        "I'm Maximilian and I've worked as a freelance web developer for years. Let me help you become a developer as well!",
                    hourlyRate: 30
                },
                {
                    id: 't2',
                    firstName: 'Julie',
                    lastName: 'Jones',
                    areas: ['frontend', 'career'],
                    description:
                        'I am Julie and as a senior developer in a big tech company, I can help you get your first job or progress in your current role.',
                    hourlyRate: 25
                }
            ]
        }
    },
    mutations: {},
    actions: {},
    getters: {
        tutorsList(state) {
            return state.tutors;
        },
        hasTutors(state) {
            return state.tutors && state.tutors.length > 0;
        }
    }
}
