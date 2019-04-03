<template>
	<v-container class="mt-5">
	    
    <v-container fluid grid-list-lg text-xs-center>
    	<h1>Tableros</h1>
		
		<!-- LOADING SPINNER -->
		<v-layout row>
		  <v-dialog v-model="loading" persistent fullscreen>
		    <v-container fill-height>
		      <v-layout row justify-center align-center>
		         <v-progress-circular indeterminate :size="70" :width="7" color="info"></v-progress-circular>
		      </v-layout>
		    </v-container>
		  </v-dialog>
		</v-layout>

	  	<!-- Cards -->
	  	<br>
	  		<v-flex xs12 >
	  			<v-layout align-center justify-center column>
	  				<v-carousel  v-if="!loading && boards.length > 0">
	  				  <v-carousel-item v-for="board in boards" :src="board.imageUrl">
	  				  	<h1 id="carosuel__title">{{ board.title }}</h1>	
	  				  	<v-card id="card" height="76.6%" :key="board._id">
	  				  		<div>
						  	  <v-card-title primary-title>
						  	    {{board.title}}
						  	  </v-card-title>
	  				  		</div>
					  	  <v-card-actions>
					  	    <v-btn id="verMas" @click.native="goToBoard(board._id )" flat color="info">Ver mas...</v-btn>
					  	  </v-card-actions>
				  	</v-card>
	  				  </v-carousel-item>
	  				</v-carousel>
	  			</v-layout>
	  		</v-flex>

	</v-container>
	  </v-container>
</template>

<script>
  import { mapGetters } from 'vuex';

  export default {
    name: "home",
    created(){
    	this.handleGetCarouselBoards();
    },
    computed: {
    	//TOMA LOS STATES DE LOS GETTERS
    	...mapGetters(["loading", "boards"])
    },
    methods: {
    	handleGetCarouselBoards(){
    		this.$store.dispatch("getBoards");
    	},
    	goToBoard(boardId) {
    		this.$router.push(`/boards/${boardId}`);
    	}
    }
};
</script>

<style>
	#title{
		position: absolute;
		list-style-type: none;
		background-color: black;
		color: white;
		border-radius: 15px;
		width: 20%;
		height: 80px;
		padding: 1em;
		/*margin: 0 auto;*/
	}
	#carosuel__title{
		position: absolute;
		background-color: rgba(0,0,0,0.5);
		color: white;
		border-radius: 5px 5px 0 0;
		padding: 0.5em;
		margin: 0 auto;
		bottom: 50px;
		left: 0;
		right: 0;
	}
	#card{
		padding-left: 5em;
		background-color: #CFCFD9;
		color: black;
	}
	#verMas{
		position: absolute;
		bottom: 8px;
		right: 16px;
	}
</style>