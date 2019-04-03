<template>
	<v-container id="contenedor" fluid grid-list-lg text-xs-center v-if="getBoardId">

		<!-- TITLE BAR -->
		<v-layout row>
		  <v-flex xs12>
			<v-toolbar  id="toolbar" color="white" flat>
				<v-toolbar-title>
			  	    <h1>{{getBoardId.title}}</h1>
				</v-toolbar-title>
			  	    <v-btn large icon v-if="!user">
			  	    	<v-icon large color="grey">stars</v-icon>
			  	    </v-btn>
			  	    <v-spacer></v-spacer>
				<v-toolbar-items>
					<v-layout justify-space-around>
						<v-icon @click="dialog = !dialog" color="info" x-large>add_circle</v-icon>
			  	      <v-icon @click="goToPreviousPage" color="info" x-large>arrow_back</v-icon>  
					</v-layout>
				</v-toolbar-items>
			</v-toolbar>

			<!-- WINDOW DIALOG -->
			<v-dialog
			    v-model="dialog"
			    max-width="500px"
			    transition="dialog-transition">

			  <v-card>

			  	<v-card-title id="taskTitle" primary-title>
			  		<h1>Añadir Tarea</h1>
			  	</v-card-title>

				<v-form  v-model="isFormValid" lazy-validation ref="form" @submit.prevent="handleSigninUser">
				<v-card-text>
				  <v-text-field class="formTask" :rules="titleRules" prepend-icon="create" v-model="title" type="text"
				   label="Tarea"></v-text-field>
				  <v-text-field class="formTask" :rules="descriptionRules" prepend-icon="assignment" 
				  v-model="description" label="Descripcion"></v-text-field>
				  <v-textarea class="formTask"
				   auto-grow 
				   prepend-icon="comment" :rules="commentsRules" v-model="comments" label="Comentarios" rows="1">
				  </v-textarea>
					
					<!-- DATAPICKER -->
				    <v-flex xs12 sm6 md4>
			         <v-menu
			           ref="menu"
			           v-model="menu"
			           :close-on-content-click="false"
			           :nudge-right="40"
			           :return-value.sync="date"
			           lazy
			           transition="scale-transition"
			           offset-y
			           full-width
			           min-width="290px">
			         <template v-slot:activator="{ on }">
			             <v-text-field
			               v-model="date"
			               label="Picker in menu"
			               prepend-icon="event"
			               readonly
			               v-on="on"
			             ></v-text-field>
			          </template>
			          <v-date-picker v-model="date" no-title scrollable>
			            <v-spacer></v-spacer>
			            <v-btn flat color="primary" @click="menu = false">Cancel</v-btn>
			            <v-btn flat color="primary" @click="$refs.menu.save(date)">OK</v-btn>
			          </v-date-picker>
			        </v-menu>
			      </v-flex>

				  <small class="grey--text">*¡Se agregara a la lista de pendientes
				  automaticamente!</small>

				</v-card-text>

				<v-card-actions>
				  <v-spacer></v-spacer>
				  <v-btn :disabled="!isFormValid" color="info" @click="dialog = false" type="submit">Añadir</v-btn>
				</v-card-actions>
			   </v-form>
			  </v-card>
			</v-dialog>
		  </v-flex>
		</v-layout>
		
		<!-- Content Cards -->
		<v-layout fill-height>
		  <v-flex  v-for="item in itemsCards" :key="item.title"  xs4>
		    <v-card class="tarjetas" flat>
		    	<v-card-title primary-title>
		    		<h1>{{item.title}}</h1>
		    	</v-card-title>
		    </v-card>
		  </v-flex>
		</v-layout>

	</v-container>

	<!-- CHIP´s -->
	<!--  <span>
			  	    	<v-chip class="mb-3 barra" color="accent" text-color="white">{{getBoardId.created_at}}</v-chip>
		  	  		</div>
			  	    </span>-->
</template>

<script>
import { GET_BOARDID } from '../queries';
import { mapGetters } from 'vuex';

	export default {
		name: 'BoardId',
		props: ['boardId'],
		data(){
			return {
				dialog: false,
				menu: false,
				date: new Date().toISOString().substr(0, 10),
				isFormValid: true,
				title: "",
				description: "",
				comments: "",
				expired: "",
				titleRules: [
					title => !!title || 'El titulo es requerido',
					title => title.lenght < 26 || 'El titulo debe ser menor a 25 caracteres'
				],
				descriptionRules: [
					description => !!description || 'La descripcion es requerida',
					description => description.lenght < 80 || 'La descripcion debe ser menor a 80 caracteres'
				],
				commentsRules: [
					comments => comments.lenght < 350 || 'Debe ser menor a 350 caracteres'
				]
			}
		},
		apollo: {
			getBoardId: {
				query: GET_BOARDID,
				variables(){
					return {
						boardId: this.boardId
					}
				}
			}
		},
		computed: {
			...mapGetters(["user"]),
			itemsCards() {
				let item= [
					{title: 'Pendientes'},
					{title: 'En curso'},
					{title: 'Finalizado'}
				];
			 return item;
			}
		},
		methods: {
			goToPreviousPage() {
				this.$router.go(-1);
			},
			gotoAddTask(){

			}
		}
	}
</script>

<style>
	#contenedor{
	margin-top: 3.2em;
	margin-left: -1.8px;
	padding: 5px;
	}
	#toolbar{
		border-radius: 10px;
		margin-top: .8em!important;
		width: 98.5vw;
	}
	.tarjetas{
		border-radius: 10px;
		margin-top: -.2em;
		height: 85%;
	}
	.fill-height{
		height: 100vh;
	}
	.v-card__title--primary {
	    font-size: 12px;
		padding: 12px 180px 15px 190px;
	}
	.formTask{
		padding-right: 30px;
	}
	#taskTitle{
		padding: 12px 150px 15px 150px;
	}
	.textarea{
		background-color: white;
	}
</style>