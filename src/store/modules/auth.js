export default {
    namespaced: true,
    state() {
        return {
            localId: null,
            idToken: null,
            email: null,
            refreshToken: null,
            expiresIn: null
        };
    },
    mutations: {
        setUser(state, payload) {
            for (const key in payload) { state[key] = payload[key]; }
        }
    },
    actions: {
        async signup(context, payload) {
            payload.returnSecureToken = true;
            const res = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD600ZjQnK71aqWYunG44BtAeOEgAv7JP8', {
                method: "POST", body: JSON.stringify(payload)
            });
            const resBody = await res.json();
            if (!res.ok) {
                throw new Error(resBody.error.message || 'Failed to signup');
            } else {
                context.commit('setUser', resBody);
            }
        },
        async login(context, payload) {
            payload.returnSecureToken = true;
            const res = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD600ZjQnK71aqWYunG44BtAeOEgAv7JP8', {
                method: "POST", body: JSON.stringify(payload)
            });
            const resBody = await res.json();
            if (!res.ok) {
                throw new Error(resBody.error.message || 'Failed to login');
            } else {
                context.commit('setUser', resBody);
            }
        },
        logout(context) {
            let payload = {};
            for (const key in context.state) { payload[key] = null; }
            context.commit('setUser', payload);
        }
    },
    getters: {
        getUserId(state) { return state.localId; },
        getToken(state) { return state.idToken; },
        isAuthenticated(state) { return !!state.idToken; }
    }
}
