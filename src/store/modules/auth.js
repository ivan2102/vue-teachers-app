let timer;

export default {

    state() {
        return {

           userId: null,
           token: null,
           didAutoLogout: false
        }
    },

    mutations: {

        setUser(state, payload) {

            state.token = payload.token;
            state.userId = payload.userId;
            state.didAutoLogout = false;
            
        },

        setAutoLogout(state) {

           state.didAutoLogout = true;
        }

    },

    actions: {

        async login(context, payload) {

            return context.dispatch('auth', {
    
                ...payload,
                mode: 'login'
             });
            },
    
       async  signup(context, payload) {

       return context.dispatch('auth', {

            ...payload,
            mode: 'signup'
        });
       },

       async auth(context,payload) {

        const mode = payload.mode;

        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC6-ZI52LqTRMpOxCB7BVQ59VcQ_sSrjpc';

        if(mode === 'signup') {

           url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC6-ZI52LqTRMpOxCB7BVQ59VcQ_sSrjpc';
        }

        const response = await fetch(url, {

            method: 'POST',
            body: JSON.stringify({
  
              email: payload.email,
              password: payload.password,
              returnSecureToken: true
            })
            });
  
            const responseData = await response.json();
  
            if(!response.ok) {
  
              const error = new Error(responseData.message || 'Failed to fetch');
              throw error;
            }

            //expiration Date
            const expiresIn = +responseData.expiresIn * 1000;
            const expirationDate = new Date().getTime() + expiresIn;

            //local Storage
            localStorage.setItem('token', responseData.idToken);
            localStorage.setItem('userId', responseData.localId);
            localStorage.setItem('tokenExpiration', expirationDate);

           timer = setTimeout(function() {

                context.dispatch('autoLogout');
            }, expiresIn);
  
            context.commit('setUser', {
  
              token: responseData.idToken,
              userId: responseData.localId,
              
            });   
        
                 
        },

        autoLogin(context) {

           const token = localStorage.getItem('token');
           const userId = localStorage.getItem('userId');
           const tokenExpiration = localStorage.getItem('tokenExpiration');

           const expiresIn = +tokenExpiration - new Date().getTime();

           if(expiresIn < 0) {
               return;
           }

           timer = setTimeout(function() {

            context.dispatch('autoLogout');
           }, expiresIn);

           if(token && userId) {

            context.commit('setUser', {

                token: token,
                userId: userId,
               
            });
           }
        },

        autoLogout(context) {

            context.dispatch('logout');
            context.commit('setAutoLogout');
        },


        logout(context) {

          localStorage.removeItem('token');
          localStorage.removeItem('userId');
          localStorage.removeItem('tokenExpiration');

          clearTimeout(timer);

            context.commit('setUser', {

                token: null,
                userId: null,
                
            });
        }

    },

    getters: {

       userId(state) {

       return state.userId;
       },

       token(state) {

        return state.token;
       },

       isAuth(state) {

        return !!state.token;
       },

       didAutoLogout(state) {

        return state.didAutoLogout;
       }
    }
}


