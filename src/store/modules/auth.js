let timer;

export default {
    namespaced: true,
    state() {
        return {
            displayName: null,
            email: null,
            localId: null,
            idToken: null,
            refreshToken: null,
            expiresIn: null
        };
    },
    mutations: {
        setUser(state, payload) { for (const key in payload) { state[key] = payload[key]; } }
    },
    actions: {
        async authenticate(context, payload) {
            let apiUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD600ZjQnK71aqWYunG44BtAeOEgAv7JP8';
            if (!payload.loginMode) { apiUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD600ZjQnK71aqWYunG44BtAeOEgAv7JP8'; }

            payload.returnSecureToken = true;
            const res = await fetch(apiUrl, { method: "POST", body: JSON.stringify(payload) });
            const resBody = await res.json();
            if (!res.ok) { throw new Error(resBody.error.message || 'Failed to authenticate'); }
            else {
                const tokenExpireDate = new Date().getTime() + +resBody.expiresIn * 1000;
                localStorage.setItem('tokenExpireDate', tokenExpireDate.toString());
                timer = setTimeout(() => context.dispatch('logout'), +resBody.expiresIn * 1000);

                for (const key in resBody) { localStorage.setItem(key, resBody[key]); }
                context.commit('setUser', resBody);
            }
        },
        autoLogin(context) {
            const tokenExpireDate = localStorage.getItem('tokenExpireDate');
            if (+tokenExpireDate - new Date().getTime() < 5*60*1000) { return; }
            else { timer = setTimeout(() => context.dispatch('logout'), +tokenExpireDate - new Date().getTime()); }

            let payload = {};
            for (const key in context.state) { payload[key] = localStorage.getItem(key); }
            context.commit('setUser', payload);
        },
        logout(context) {
            clearTimeout(timer);
            localStorage.removeItem('tokenExpireDate');

            let payload = {};
            for (const key in context.state) { payload[key] = null; localStorage.removeItem(key); }
            context.commit('setUser', payload);
        }
    },
    getters: {
        getUserId(state) { return state.localId; },
        getToken(state) { return state.idToken; },
        isAuthenticated(state) { return !!state.idToken; }
    }
}
