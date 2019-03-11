<template>
	
    <v-container text-xs-center >
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

	  <v-flex xs12>
	  	<!-- <v-carousel v-if="!loading && boards.length > 0" v-bind="{ 'cycle': true }" interval="3000">
	  		<v-carousel-item v-if="board in boards" :key="board._id">
	  			<h1 id="carosuel__title">{{ board.title }}</h1>  	
	  		</v-carousel-item>
	  	  
	  	</v-carousel> -->
	  	<ul v-if="!loading" v-for="board in boards"  :key="board._in ">
	  		<li id="carosuel__title">{{board.title}} 
	  		<br>
	  		creado por:  {{board.createdBy.username}}</li>
	  	</ul>
	  </v-flex>
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
    	}
    }
};
</script>

<style>
	#carosuel__title{
		/*position: absolute;*/
		list-style-type: none;
		background-color: black;
		color: white;
		border-radius: 15px;
		width: 20%;
		height: 80px;
		padding: 0.5em;
		/*margin: 0 auto;*/
	}
</style>