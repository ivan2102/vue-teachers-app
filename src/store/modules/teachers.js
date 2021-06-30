export default {

    namespaced: true,

    state() {
        return {

            lastFetch: null,

            teachers: [

                {
                    id: 'c1',
                    firstName: 'Ivan',
                    lastName: 'Nesic',
                    country: 'Serbia',
                    address: 'Repiska 25 Zarkovo',
                    phone: +38164456789,
                    languages: ['england', 'german', 'france'],
                    description: "Learn new language"
                    



                },

                {
                    id: 'c2',
                    firstName: 'Milan',
                    lastName: 'Nesic',
                    country: 'Australia',
                    address: '55 Gawler Place',
                    phone: +6154376799,
                    languages: ['german', 'france'],
                    description: "Learn new language from your teacher"
                }
            ]


            
        }
    },

    mutations: {

        registerTeacher(state, payload) {

            state.teachers.push(payload);
        },

        setTeacher(state, payload) {

            state.teachers = payload;
        },

        setFetchTimestamp(state) {

            state.lastFetch = new Date().getTime();
        }
    },

    actions: {

      async  addTeacher(context, data) {

            const userId = context.rootGetters.userId;
            const teacherData = {
          
            firstName: data.firstName,
            lastName: data.lastName,
            country: data.country,
            address: data.address,
            phone: data.phone,
            description: data.description,
            languages: data.languages,
           
        }

        //firebase put request
        const token = context.rootGetters.token;
        const response = await fetch(`https://vue-user-app-8fe7d-default-rtdb.europe-west1.firebasedatabase.app/teachers/${userId}.json?auth=` + token, {

        method: 'PUT',
        body: JSON.stringify(teacherData)
        });

        const responseData = await response.json();

        if(!response.ok) {

         const error = new Error(responseData.messsage || 'Failed to fetch!');
         throw error;
        }

        context.commit('registerTeacher', {

            ...teacherData,
            id: userId
        });

    },


   async fetchTeachers(context, payload) {

    if(!payload.forceRefresh &&!context.getters.shouldUpdate) {
        return;
    }

      const response = await fetch(`https://vue-user-app-8fe7d-default-rtdb.europe-west1.firebasedatabase.app/teachers.json`);

      //here don't need nothing when you need to fetch GET request

      const responseData = await response.json();

      if(!response.ok) {

        const error = new Error(responseData.message || 'Failed to fetch!');
        throw error;
      }

      const teachers = [];

      for(const key in responseData) {

        const teacher = {
            id: key,
            firstName: responseData[key].firstName,
            lastName: responseData[key].lastName,
            country: responseData[key].country,
            address: responseData[key].address,
            phone: responseData[key].phone,
            description: responseData[key].description,
            languages: responseData[key].languages
        }

        teachers.push(teacher);
      }

        context.commit('setTeacher', teachers);
        context.commit('setFetchTimestamp');
      
    }
    },

    getters: {

        teachers(state) {

            return state.teachers;
        },

        hasTeachers(state) {

            return state.teachers && state.teachers.length > 0;
        },

        isTeacher(_, getters, _2 ,rootGetters) {

            const teachers = getters.teachers;
            const userId = rootGetters.userId;
            return teachers.some(teacher => teacher.id === userId);
        },

        shouldUpdate(state) {

            const lastFetch = state.lastFetch;

            if(!lastFetch) {

                return true;
            }

            const currentTimeStamp = new Date().getTime();
            return (currentTimeStamp - lastFetch) / 1000 > 60;
        }
    }
}