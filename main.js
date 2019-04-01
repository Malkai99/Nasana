import "@babel/polyfill";
import Vue from "vue";
import "./plugins/vuetify";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import FormAlert from "./components/shared/FormAlert";

import ApolloClient from "apollo-boost";
import VueApollo from "vue-apollo";

//Registrar para usar en cualqueir parte
Vue.component('form-alert', FormAlert);

Vue.use(VueApollo);

//ApolloClient
export const defaultClient = new ApolloClient({
	uri: "http://localhost:4000/graphql",
	// include auth token with request at the backend
	fetchOptions: {
		credentials: 'include'
	},
	request: operation => {
		//si no hay token con la clave 'token' en el localStorage lo agrega
		if(!localStorage.token){
			localStorage.setItem("token", "");
		}

		//opreacion agrega un token a un encabezado de autenticacion, 
		//que es enviado al backend
		operation.setContext({
			headers: {
				authorization: localStorage.getItem("token")
			}
		});
	},
	onError: ({graphQLErrors, networkError}) => {
		if(networkError){
			console.log('[networkError]', networkError);
		}

		if(graphQLErrors){
			for(let err of graphQLErrors){
				console.dir(err);
				if(err.name === "AuthenticationError"){
					//Poner el error de auth en el state para el snackbar
					store.commit('setAuthError', err);
					//Finalizar sesion del usuario y limpar el token
					store.dispatch('signoutUser');
				}
			}
		}
	}

});

const apolloProvider = new VueApollo({ defaultClient });


Vue.config.productionTip = false;

new Vue({
  provide: apolloProvider.provide(),
  router,
  store,
  render: h => h(App),
  created(){
  	// Ejecutar el query de currentUser para saber si hay o no usuario
  	this.$store.dispatch('getCurrentUser');
  }
}).$mount('#app')
