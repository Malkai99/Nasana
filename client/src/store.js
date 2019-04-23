import Vue from 'vue'
import Vuex from 'vuex'
import { defaultClient as apolloClient } from './main';
import { gql } from 'apollo-boost';
import router from './router';

// QUERIES IMPORT
import { GET_CURRENT_USER, GET_BOARDS, ADD_BOARD, ADD_BOARDS_USER, SIGNIN_USER, SIGNUP_USER } from './queries';


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  	boards: [],
    user: null,
  	loading: false,
    error: null,
    authError: null
  },
  mutations: {
  	setBoards: (state, payload) => {
  		state.boards = payload;
  	}, 
    setUser: (state, payload) => {
      state.user = payload;
    }, 
    setLoading: (state, payload) => {
      state.loading = payload;
    },
    setError: (state, payload) => {
      state.error = payload;
    },
    setAuthError: (state, payload) => {
      state.authError = payload;
    },
    clearUser: state => (state.user = null),
    clearError: state=> (state.error = null)
  },
  actions: {
    getCurrentUser: ({ commit }) => {
      commit('setLoading', true);
      apolloClient.query({
        query: GET_CURRENT_USER
      })
      .then(({ data }) => {
        commit('setLoading', false);
        //Agregar el data user al state
        commit('setUser', data.getCurrentUser);
        console.log(data.getCurrentUser);
      })
      .catch(err =>{
        commit('setLoading', false);
        console.error(err);
      })

    },
  	getBoards: ({ commit }) => {
  		commit('setLoading', true);
  		apolloClient 
  			.query({
  				query: GET_BOARDS

  			}).then(({ data }) => {
  				//GET DATA FROM ACTIONS 
  				//commit pasa la DATA de las ACTIONS a las MUTATION
  				commit('setBoards', data.getBoard);
  				commit('setLoading', false);
  				console.log(data.getBoard);
  			}).catch(err => {
  				commit('setLoading', false);
  				console.error(err);

  			})
  	},
    addBoard: ({commit}, payload) => {
      apolloClient
        .mutate({
          mutation: ADD_BOARD,
          variables: payload,
          update: (cache, {data: {addBoard}}) => {
            // Se lee el query que se quiere actualizar
          /*  const data = cache.readQuery({ query: GET_BOARDS});
            // Crear los datos actualizados
            data.getBoard.unshift(addBoard);
            // Escribir los datos
            cache.writeQuery({
              query: GET_BOARDS,
              data
            });
          */
          },
          optimisticResponse: {
            __type: 'Mutation',
            addBoard: {
              __typename: 'Board',
              __id: -1,
              ...payload 
            }
          }
        })
        .then( ({data}) => {
          console.log(data.addBoard);
        //  addBoardsUser(commit, {userId: payload.createdBy, boardId: data.addBoard._id});
        })
        .catch(err => {
          console.error(err);
        })
    },
    addBoardsUser: ({ commit }, payload) => {
      apolloClient.mutate({
        mutation: ADD_BOARDS_USER,
        variables: payload
      }).then( ({data}) => {
        console.log("::::::::::::: RESULT");
        console.log(data);
      }).catch(err => {
        console.error("==========");
        console.error(err);
      });
    },
    signinUser: ({ commit }, payload) => {
      commit('clearError');
      commit('setLoading', true);
      apolloClient
        .mutate({
          mutation: SIGNIN_USER,
          variables: payload
        })
        .then( ({ data }) => {
          commit('setLoading', false);
          localStorage.setItem("token", data.signinUser.token);
          //asegurar que el metodo created de main.js esta corriendo
          // se corre getCurrentUser al recargar la pagina
          router.go();
        })
        .catch(err => {
          commit('setLoading', false);
          commit('setError', err);
          console.error(err);
        });
    },
    signupUser: ({ commit }, payload) => {
      commit('clearError');
      commit('setLoading', true);
      apolloClient
        .mutate({
          mutation: SIGNUP_USER,
          variables: payload
        })
        .then( ({ data }) => {
          commit('setLoading', false);
          localStorage.setItem("token", data.signupUser.token);
          //asegurar que el metodo created de main.js esta corriendo
          // se corre getCurrentUser al recargar la pagina
          router.go();
        })
        .catch(err => {
          commit('setLoading', false);
          commit('setError', err);
          console.error(err);
        });
    },
    signoutUser: async ({ commit }) => {
        //Limpiar el state del usuario
        commit('clearUser');
        // remover el token 
        localStorage.setItem('token', '');
        //  terminar sesion
        await apolloClient.resetStore();
        //volver a home
        router.push('/');
    }, 
        
  },     

  getters: {
  	boards: state => state.boards,
    user: state => state.user,
  	loading: state => state.loading,
    error: state => state.error,
    authError: state => state.authError
  }
})
