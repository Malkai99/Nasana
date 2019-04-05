<template>
    <v-container text-xs-center mt-5 pt-5>

    	<!-- Titulo de la pagina -->
		<v-layout row wrap>
		  <v-flex xs12 sm6 offset-sm3>
			<h1>¡Registrate!</h1>
		  </v-flex>
		</v-layout>

		<!-- Alerta de Error -->
		<v-layout v-if="error" row wrap>
		  <v-flex xs12 sm6 offset-sm3>
		     <form-alert :message="error.message"></form-alert>
		  </v-flex>
		</v-layout>

		<!-- Sign Up Form -->
		<v-layout row wrap>
		  <v-flex xs12 sm6 offset-sm3>
		  	<v-card class="margen-forma" color="secondary" dark>
		  		<v-container>
		  		  <v-form v-model="isFormValid" lazy-validation ref="form" @submit.prevent="handleSignupUser">

		  		     <v-layout row>
		  		        <v-flex xs12>
		  		           <v-text-field :rules="usernameRules" v-model="username" prepend-icon="face" label="Usuario" type="text" required></v-text-field>
		  		        </v-flex>
		  		     </v-layout>

		  		     <v-layout row>
		  		        <v-flex xs12>
		  		           <v-text-field :rules="emailRules" v-model="email" prepend-icon="email" label="Email" type="email" required></v-text-field>
		  		        </v-flex>
		  		     </v-layout>

		  		     <v-layout row>
		  		        <v-flex xs12>
		  		           <v-text-field :rules="passwordRules" v-model="password" prepend-icon="extension" label="Contraseña" type="password" required></v-text-field>
		  		        </v-flex>
		  		     </v-layout>

		  		     <v-layout row>
		  		        <v-flex xs12>
		  		           <v-text-field :rules="passwordRules" v-model="passwordConfirmation" prepend-icon="gavel" label="Confirma Contraseña" type="password" required></v-text-field>
		  		        </v-flex>
		  		     </v-layout>

		  		     <v-layout row>
		  		        <v-flex xs12>
		  		          <v-btn :loading="loading" :disabled="!isFormValid || loading" color="accent" type="submit">
							<span slot="loader" class="custom-loader">
        					 <v-icon light>cached</v-icon>
        					</span>
		  		          	Registrar</v-btn>
		  		            <h3>¿Ya tienes cuenta?
		  		            	<router-link to="/signIn">Ingresar</router-link>
		  		            </h3>
		  		        </v-flex>
		  		     </v-layout>

		  		  </v-form>
		  		</v-container>
		  	</v-card>
		  </v-flex>
		</v-layout>

    </v-container>
</template>

<style>
  
</style>

<script>
import { mapGetters } from 'vuex'

    export default {
        name: 'SignUp',
        data() {
        	return {
        		isFormValid: true,
        		username:'',
        		email: '',
        		password: '',
        		passwordConfirmation: '',
        		usernameRules: [
        			username => !!username || 'Usuario es requerido',
        			username => username.length < 12 || 'Usuario no puede ser mayor de 12 caracteres',

        		],
        		emailRules: [
        			email => !!email || 'Email es requerido',
        			email => /.@+./.test(email) || 'Ingresa un email valido'
        		],
        		passwordRules: [
        			password => !!password || 'Contraseña es requerida',
        			password => password.length >= 4 || 'Contraseña debe ser al menos 4 caracteres',
        			confirmation => confirmation === this.password || 'Contraseña debe coincidir'
        		]
        	}
        },
        computed: {
        	...mapGetters(['loading','error', 'user'])
        },
        watch: {
        	user(value) {
        		//cuando cambie el valor de user, se manda a home
        		if(value){
        			this.$router.push('/');
        		}
        	}
        },
        methods: {
        	handleSignupUser() {
        		if(this.$refs.form.validate()){
        			this.$store.dispatch('signupUser', {
        				username: this.username,
        				email: this.email,
        				password: this.password
        			});
        		}
        		//Registrar
        	}
        }
    }
</script>