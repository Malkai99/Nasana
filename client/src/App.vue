<template>
  <v-app style="background: #E3E3EE">
    <!-- Side Navbar -->
    <v-navigation-drawer app temporary fixed v-model="sideNav">

        <v-toolbar color="primary" dark flat>
            <v-toolbar-side-icon @click="toggleSideNav"> </v-toolbar-side-icon>
            <router-link to="/" tag="span" style="cursor: pointer">
              <h1 class="title pl-3"> Nasana </h1>
            </router-link>
        </v-toolbar>
        
        <v-divider></v-divider>

        <!-- Links Side Navbar -->
        <v-list>
          
        <v-list-tile ripple v-for="item in sideNavItems" :key="item.title" :to="item.link">
          <v-list-tile-action>
            <v-icon>{{item.icon}}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            {{item.title}}
          </v-list-tile-content>
        </v-list-tile>

        <!-- Cerrar sesion -->
        <v-list-tile v-if="user" @click="handleSignoutUser">
           <v-list-tile-action>
            <v-icon>exit_to_app</v-icon>
           </v-list-tile-action>
          <v-list-tile-content>
            Cerrar Sesion
          </v-list-tile-content>
        </v-list-tile>

        </v-list>
    </v-navigation-drawer>

    <!-- Navbar hotizontal  -->

   <v-toolbar fixed color="primary">
    <!-- Titulo de la App -->
      <v-toolbar-side-icon @click="toggleSideNav"></v-toolbar-side-icon> 
      <v-toolbar-title class="hidden-xs-only">
        <router-link to="/" tag="span" style="cursor: pointer">
          Nasana
        </router-link>
      </v-toolbar-title>  

      <v-spacer></v-spacer>
       
       <!-- Links -->
       <v-toolbar-items class="hidden-xs-only">
         <v-btn flat v-for="item in horizontalNavItems" :key= "item.title" :to= "item.link">
            <v-icon class="hidden-sm-only" left>{{item.icon}}</v-icon>
            {{item.title}}
         </v-btn>

          <!-- Boton Perfil -->
          <v-btn flat to="/profile" v-if="user">
            <v-icon class="hidden-sm-only" left>account_box</v-icon>
            <v-badge rigth color="blue darken-2">
              <!--slot puede ser cualquier componente o numero  -->
               <!-- <span  slot="badge">1</span> --> 
               Perfil
              <!-- <v-icon large color="primary"></v-icon> -->
            </v-badge>
          </v-btn>

          <!-- Boton Cerrar sesion -->
          <v-btn flat v-if="user" @click="handleSignoutUser">
            <v-icon class="hidden-sm-only" left>exit_to_app</v-icon>
            Cerrar Sesion
          </v-btn>

       </v-toolbar-items>

   </v-toolbar>


  <!-- Contenido de la App -->
    <main> 
      <!-- <v-container class="mt-4"> -->

        <transition name="fade">
          
          <router-view/> 
        </transition>
        
        <!-- Auth Snackbar -->
        <v-snackbar v-model="authSnackbar" color="success" :timeout='5000' bottom left>
          <v-icon class="mr-3">check_circle</v-icon>
          <h3>Sesion iniciada!</h3>
          <v-btn dark flat @click="authSnackbar = false">Close</v-btn>
        </v-snackbar>

        <!-- AuthError Snackbar -->
        <v-snackbar v-if="authError" v-model="authErrorSnackbar" color="info" :timeout='5000' bottom left>
          <v-icon class="mr-3">cancel</v-icon>
          <h3>{{authError.message}}</h3>
          <v-btn dark flat to="/signin">Iniciar sesion</v-btn>
        </v-snackbar>

      <!-- </v-container> -->

      <!-- Footer -->


    </main>

  </v-app>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: 'App',
  data(){
    return{
      sideNav: false,
      authSnackbar: false,
      authErrorSnackbar: false
    }
  },
  watch: {
    user(newValue, oldValue) {
      // Si no tiene valor del usuario de antes, muestras el snackabar
      if(oldValue === null){
        this.authSnackbar = true;
      }
    },
    authError(value){
      //Si no es nulo, mostar el authError snackbar
      if(value !== null){
        this.authErrorSnackbar = true;
      }
    }
  },
  computed: {
    ...mapGetters(['authError', 'user']),
    horizontalNavItems() {
      let items=  [
        { icon: 'chat', title: 'Board', link: '/boards'},
        { icon: 'lock_open', title: 'Ingresar', link: '/signin'},
        { icon: 'create', title: 'Registrarse', link: '/signup'}
      ];
      if(this.user){
        items = [
          { icon: 'chat', title: 'Board', link: '/boards'}
          // { icon:'account_box', title: 'Perfil', link: '/profile'}
        ]
      }
      return items;
    },
    sideNavItems() {
      let items=  [
        { icon: 'chat', title: 'Board', link: '/boards'},
        { icon: 'lock_open', title: 'Ingresar', link: '/signin'},
        { icon: 'create', title: 'Registrarse', link: '/signup'}
      ];
      if(this.user){
        items = [
          { icon: 'chat', title: 'Board', link: '/boards'},
          { icon: 'stars', title: 'Crear Tablero', link: 'board/add'},
          { icon: 'account_box', title: 'Perfil', link: '/profile'}
        ]
      }
      return items;
    }
  },
  methods: {
    handleSignoutUser(){
      this.$store.dispatch('signoutUser');
    },
    toggleSideNav() {
      this.sideNav = !this.sideNav;

    }
  }
};
</script>

<style>
  /*EFECTO FADE AL CAMBIAR PESTAÑAS*/
  .fade-enter-active,
  .fade-leave-active {
    transition-property: all;
    transition-duration: 0.25s;
  }
  
  .fade-enter-active{
    transition-delay: 0.25s;
  }

  .fade-enter,
  .fade-leave-active {
    opacity: 0;
    transform: translateY(-25px);
  }

</style>
