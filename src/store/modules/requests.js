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
      },

      setRequest(state, payload) {

        state.requests = payload;
      }
    },

    actions: {

     async contactTeacher(context, payload) {

          const newRequest = {
              
              email: payload.email,
              subject: payload.subject,
              message: payload.message
          }

          //fetch requests through firebase
          const response = await fetch(`https://vue-user-app-8fe7d-default-rtdb.europe-west1.firebasedatabase.app/requests/${payload.teacherId}.json`, {

             method: 'POST',
             body: JSON.stringify(newRequest)
          });

          const responseData = await response.json();
          newRequest.id = responseData.name;
          newRequest.teacherId = payload.teacherId;

          if(!response.ok) {

            const error = new Error(responseData.message || 'Failed to fetch!');
            throw error;
          }

          context.commit('addRequest', newRequest);
      },


     async fetchRequests(context) {

        const teacherId = context.rootGetters.userId;
        const token = context.rootGetters.token;

       const response = await fetch(`https://vue-user-app-8fe7d-default-rtdb.europe-west1.firebasedatabase.app/requests/${teacherId}.json?auth=` + token);

       const responseData = await response.json();

       if(!response.ok) {

        const error = new Error(responseData.message || 'Failed to fetch!');
        throw error;
       }

       const requests = [];

       for(const key in responseData) {

        const request = {

            id: key,
            teacherId: teacherId,
            email: responseData[key].email,
            subject: responseData[key].subject,
            message: responseData[key].message
        }

        requests.push(request);
       }

        context.commit('setRequest', requests);
      }
    },

    getters: {

        requests(state, _, _2, rootGetters) {

            const teacherId = rootGetters.userId;

            return state.requests.filter(request => request.teacherId === teacherId);

        },

        hasRequests(_,getters) {

            return getters.requests && getters.requests.length > 0;
        }
        
    }
}