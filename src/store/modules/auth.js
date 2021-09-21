import PATH_TO_SERVER from '@/js/path.js'

export default {
    state: {
        auth: localStorage.getItem('auth') ? 
            JSON.parse(localStorage.getItem('auth')) : null
    },
    getters: { 
        getAuth(state) {
            return state.auth
        }
    }, 
    actions: {
        async loginAuth(ctx, data) { 
            const res = await fetch(`${PATH_TO_SERVER}api/auth/login`, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "post",
                body: JSON.stringify({...data})
            })
            const result = await res.json()

            if (result && !result.id)
                return { type: 'e', message: result.message}
            if(result.id) {
                ctx.commit('updateAuth', result)
                return { type: 's', message: 'Пользователь авторизован'}
            }
            return { type: 'e', message: 'Произошла ошибка при авторизации'}
            
        }
    },
    mutations: {
        updateAuth(state, auth) { 
            state.auth = auth
            localStorage.setItem('auth', JSON.stringify(auth))
        },
        unAuth(state) {
            state.auth = null
            localStorage.removeItem('auth')

        }
    }
}