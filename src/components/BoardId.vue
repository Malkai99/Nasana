<template>
	<v-container fluid grid-list-lg text-xs-center v-if="getBoardId">
		<v-layout row>
		  <v-flex xs12>
		  	<v-card id="titulo" flat>
		  	  <v-card-title>
		  	  	<div barra>	
			  	    <h1>{{getBoardId.title}}</h1>
		  	  	</div>
			  	    <v-btn large icon v-if="!user">
			  	    	<v-icon large color="grey">stars</v-icon>
			  	    </v-btn>
			  	    <v-spacer></v-spacer>
			  	    <!--  <span>
			  	    	<v-chip class="mb-3 barra" color="accent" text-color="white">{{getBoardId.created_at}}</v-chip>
			  	    </span>-->			  
			  	        <!-- <v-spacer></v-spacer> -->	
			  	    <v-icon class="barra" @click="goToPreviousPage" color="info" large>arrow_back</v-icon>
		  	  </v-card-title>
		  	</v-card>
		  </v-flex>
		</v-layout>
	</v-container>
</template>

<script>
import { GET_BOARDID } from '../queries';
import { mapGetters } from 'vuex';

	export default {
		name: 'BoardId',
		props: ['boardId'],
		data(){
			return {
				dialog: false
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
			...mapGetters(["user"])
		},
		methods: {
			goToPreviousPage() {
				this.$router.go(-1);
			}
		}
	}
</script>

<style>
/* 	.container{
	margin: -21px;
	padding: 23px;
} */
	#titulo{
		border-radius: 10px;
		margin-top: 1.35em;
		width: 98.5vw;
		height: 70%
	}
/*	.barra{
		text-align: center; 
	}*/
</style>