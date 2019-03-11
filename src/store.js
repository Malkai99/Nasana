import Vue from 'vue'
import Vuex from 'vuex'
import { defaultClient as apolloClient } from './main';
import { gql } from 'apollo-boost';
import router from './router';

// QUERIES IMPORT
import { GET_CURRENT_USER, GET_BOARDS, SIGNIN_USER } from './queries';


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  	boards: [],
    user: null,
  	loading: false
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
    clearUser: state => (state.user = null)
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
    signinUser: ({ commit }, payload) => {
      //Para limpiar el token antes de enviar uno nuevo
      localStorage.setItem('token', '');
      apolloClient
        .mutate({
          mutation: SIGNIN_USER,
          variables: payload
        })
        .then( ({ data }) => {
          localStorage.setItem("token", data.signinUser.token);
          //asegurar que el metodo created de main.js esta corriendo
          // se corre getCurrentUser al recargar la pagina
          router.go();
        })
        .catch(err => {
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
    }
  },
  getters: {
  	boards: state => state.boards,
    user: state => state.user,
  	loading: state => state.loading
  }
})
