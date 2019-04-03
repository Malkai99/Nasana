<template>
    <v-container text-xs-center mt-5 pt-5>
			<!-- Titulo -->
		  <v-layout row wrap>
		    <v-flex xs12 sm6 offset-sm3>
			   <h1>Añadir Tablero</h1>
		    </v-flex>
		  </v-layout>

		<!-- Add Board Form -->
		<v-layout row wrap>
		  <v-flex xs12 sm6 offset-sm3>
		  		<v-form v-model="isFormValid" lazy-validation ref="form" @submit.prevent="handleAddBoard">
					
					<!-- Titulo Input -->
		  		     <v-layout row>
		  		        <v-flex xs12>
		  		           <v-text-field :rules="titleRules" v-model="title" label="Titulo" type="text" required></v-text-field>
		  		        </v-flex>
		  		     </v-layout>

		  		     <!-- ImageUrl Input -->
		  		     <v-layout row>
		  		        <v-flex xs12>
		  		           <v-text-field :rules="imageRules" v-model="imageUrl" label="Url Imagen" type="text" required></v-text-field>
		  		        </v-flex>
		  		     </v-layout>

		  		     <!-- Image preview -->
		  		     <v-layout row>
		  		       <v-flex xs12>
		  		         <img :src="imageUrl" height="300px">
		  		       </v-flex>
		  		     </v-layout>

		  		     <!-- Text area -->
		  		     <!-- <v-layout row>
		  		       <v-flex xs12>
		  		         <v-textarea :rules="descRules" v-model="description" label="Descripcion" type="text" required>
		  		         </v-textarea>
		  		       </v-flex>
		  		     </v-layout> -->

		  		     <!-- <v-layout row>
		  		        <v-flex xs12>
		  		           <v-text-field :rules="passwordRules" v-model="password" label="Contraseña" type="password" required></v-text-field>
		  		        </v-flex>
		  		     </v-layout> -->

		  		     <v-layout row>
		  		        <v-flex xs12>
		  		          <v-btn :loading="loading" :disabled="!isFormValid || loading" color="info" type="submit">
							<span slot="loader" class="custom-loader">
        					 <v-icon light>cached</v-icon>
        					</span>
		  		          	Crear</v-btn>
		  		        </v-flex>
		  		     </v-layout>

		  		</v-form>
		  </v-flex>
		</v-layout>

    </v-container>
</template>

<style>
  
</style>

<script>
import { mapGetters } from 'vuex';
    export default {
        name: 'AddBoard',
        data() {
        	return {
        		isFormValid: true,
        		title: '',
        		imageUrl: '',
        		titleRules: [
        			title => !!title || 'Titulo es requerido'
        		],
        	};
        },
        computed: {
        	...mapGetters(['loading', 'user'])
        },
        methods: {
        	handleAddBoard() {
        		if(this.$refs.form.validate()) {
        			//Agregar la accion
        			this.$store.dispatch('addBoard', {
        				title : this.title,
        				imageUrl: this.imageUrl,
        				createdBy: this.user._id
        			});
        			this.$router.push('/');
        		}
        	}
        }
    };
</script>
